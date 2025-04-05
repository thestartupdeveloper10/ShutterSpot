const express = require("express");
const createError = require("http-errors");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { PrismaClient } = require("@prisma/client");
const {sendBookingNotifications,sendStatusUpdateNotifications} = require("../services/notificationService")

const prisma = new PrismaClient();
const bookingRouter = express.Router();

// CREATE BOOKING
bookingRouter.post("/", verifyToken, async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "client") {
      return res.status(403).json({ error: "Only clients can create bookings" });
    }

    const { 
      photographerId, 
      location, 
      duration, 
      totalPrice,
      date,          
      startTime,     
      endTime        
    } = req.body;

    // Add validation for minimum notice period (e.g., 24 hours)
    const bookingDate = new Date(`${date}T${startTime}:00`);
    const minimumNotice = new Date();
    minimumNotice.setHours(minimumNotice.getHours() + 24);

    if (bookingDate < minimumNotice) {
      return res.status(400).json({ 
        error: "Bookings must be made at least 24 hours in advance" 
      });
    }

    // Check photographer availability
    const existingBooking = await prisma.booking.findFirst({
      where: {
        photographerId,
        startDate: bookingDate,
        status: {
          in: ['pending', 'confirmed']
        }
      }
    });

    if (existingBooking) {
      return res.status(409).json({ 
        error: "Photographer is not available at this time" 
      });
    }

    // Calculate deposit amount (e.g., 20% of total price)
    const depositAmount = parseFloat(totalPrice) * 0.20;

    const newBooking = await prisma.booking.create({
      data: {
        photographerId,
        clientId: id,
        startDate: new Date(`${date}T${startTime}:00`),
        endDate: new Date(`${date}T${endTime}:00`),
        location,
        duration: parseInt(duration),
        totalPrice: parseFloat(totalPrice),
        status: 'pending',
        depositAmount,
        paymentStatus: 'pending'
      },
    });

    // Create initial history record
    await prisma.bookingHistory.create({
      data: {
        bookingId: newBooking.id,
        status: 'pending',
        changedBy: id,
        reason: 'Booking created'
      }
    });

    // Send notifications
    await sendBookingNotifications(newBooking, 'created');

    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Prisma error:", err);
    next(createError(500, "Error creating booking"));
  }
});

// UPDATE BOOKING
bookingRouter.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: req.params.id },
      data: req.body,
    });

    if (!updatedBooking) {
      return next(createError(404, "Booking not found"));
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    next(createError(500, "Error updating booking"));
  }
});

// DELETE BOOKING
bookingRouter.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const deletedBooking = await prisma.booking.delete({ where: { id: req.params.id } });
    if (!deletedBooking) {
      return next(createError(404, "Booking not found"));
    }
    res.status(200).json("Booking has been deleted");
  } catch (err) {
    console.log("prisma error:", err);
    next(createError(500, "Error deleting booking"));
  }
});

// GET SINGLE BOOKING
bookingRouter.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: {
        photographer: true,
        client: true,
      },
    });

    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    res.status(200).json(booking);
  } catch (err) {
    next(createError(500, "Error retrieving booking"));
  }
});

// GET ALL BOOKINGS
bookingRouter.get("/", verifyToken, verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        photographer: true,
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(bookings);
  } catch (err) {
    next(createError(500, "Error retrieving bookings"));
  }
});

// GET CLIENT'S BOOKINGS
bookingRouter.get("/client/:clientId", verifyToken, async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { 
        clientId: req.params.clientId 
      },
      include: {
        photographer: {
          select: {
            name: true,
            profilePic: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching client bookings:", err);
    next(createError(500, "Error retrieving client bookings"));
  }
});

// GET PHOTOGRAPHER'S BOOKINGS
bookingRouter.get("/photographer/:photographerId", verifyToken, async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { 
        photographerId: req.params.photographerId 
      },
      include: {
        client: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        startDate: "desc"
      }
    });

    // Transform the data to match the frontend expectations
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      clientName: booking.client.user.username,
      clientEmail: booking.client.user.email,
      date: booking.startDate,
      startTime: booking.startDate.toLocaleTimeString(),
      endTime: booking.endDate.toLocaleTimeString(),
      location: booking.location,
      totalPrice: booking.totalPrice,
      status: booking.status,
      duration: booking.duration,
      clientPhone: booking.client.phone,
      clientLocation: booking.client.location
    }));

    res.status(200).json(formattedBookings);
  } catch (err) {
    console.error("Error fetching photographer bookings:", err);
    next(createError(500, "Error retrieving photographer bookings"));
  }
});

// UPDATE BOOKING STATUS
bookingRouter.put("/:id/status", verifyToken, async (req, res, next) => {
  try {
    const { status, reason, photographerId } = req.body;
    const { id: userId, role } = req.user;
    
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id }
    });

    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    // Validate status transition
    const isValidTransition = validateStatusTransition(booking.status, status);
    if (!isValidTransition) {
      return res.status(400).json({ 
        error: "Invalid status transition" 
      });
    }

    // Check authorization
    // if (booking.photographerId !== photographerId && role !== 'admin') {
    //   return next(createError(403, "Not authorized to update this booking"));
    // }

    // Handle specific status transitions
    if (status === 'cancelled') {
      const cancellationResult = await handleCancellation(booking, userId);
      if (!cancellationResult.success) {
        return res.status(400).json({ error: cancellationResult.message });
      }
    }

    if (status === 'rescheduled') {
      if (booking.rescheduleCount >= 2) {
        return res.status(400).json({ 
          error: "Maximum reschedule limit reached" 
        });
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { 
        status,
        ...(status === 'rescheduled' && {
          rescheduleCount: { increment: 1 },
          lastRescheduleDate: new Date()
        })
      }
    });

    // Record status change in history
    await prisma.bookingHistory.create({
      data: {
        bookingId: booking.id,
        status,
        reason,
        changedBy: userId
      }
    });

    // Send notifications
    await sendStatusUpdateNotifications(updatedBooking, status);

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.log("prisma error:", err);
    next(createError(500, "Error updating booking status"));
  }
});

// Helper functions
const validateStatusTransition = (currentStatus, newStatus) => {
  const allowedTransitions = {
    pending: ['confirmed', 'rejected', 'cancelled'],
    confirmed: ['completed', 'cancelled', 'rescheduled', 'no_show'],
    rescheduled: ['confirmed', 'cancelled'],
    rejected: ['pending'], // Allow resubmission
    cancelled: [], // Final state
    completed: [], // Final state
    no_show: ['rescheduled', 'cancelled'], // Allow rescheduling after no-show
  };

  return allowedTransitions[currentStatus]?.includes(newStatus) || false;
};

const handleCancellation = async (booking, userId) => {
  const now = new Date();
  const bookingStart = new Date(booking.startDate);
  const hoursUntilBooking = (bookingStart - now) / (1000 * 60 * 60);

  // Check cancellation policy
  if (hoursUntilBooking < 24) {
    return {
      success: false,
      message: "Cancellations must be made at least 24 hours before the booking"
    };
  }

  // Handle refund if applicable
  if (booking.depositPaid) {
    const refundAmount = hoursUntilBooking > 48 ? 
      booking.depositAmount : // Full deposit refund if cancelled >48 hours before
      booking.depositAmount * 0.5; // 50% deposit refund if cancelled 24-48 hours before

    // Process refund logic here
    await processRefund(booking.clientId, refundAmount);
  }

  return { success: true };
};

module.exports = bookingRouter;

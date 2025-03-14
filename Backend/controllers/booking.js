const express = require("express");
const createError = require("http-errors");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bookingRouter = express.Router();

// CREATE BOOKING - Only clients can create bookings
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
      date,          // Format: "2025-03-15"
      startTime,     // Format: "08:00"
      endTime        // Format: "09:00"
    } = req.body;

    // Combine date and time strings to create proper Date objects
    const startDate = new Date(`${date}T${startTime}:00`);
    const endDate = new Date(`${date}T${endTime}:00`);

    const newBooking = await prisma.booking.create({
      data: {
        photographerId,
        clientId: id,
        startDate,
        endDate,
        location,
        duration: parseInt(duration),
        totalPrice: parseFloat(totalPrice),
        status: 'pending'
      },
    });

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

module.exports = bookingRouter;

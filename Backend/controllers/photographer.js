const bcrypt = require('bcrypt');
const express = require("express");
const createError = require('http-errors');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,} = require("./verifyToken");
const { PrismaClient } = require('@prisma/client')
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const { apiLimiter } = require('../middleware/rateLimiter');

const prisma = new PrismaClient()

// Validation schemas
const photographerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('about').trim().notEmpty().withMessage('About section is required'),
  body('phone').trim().notEmpty().matches(/^\+?[\d\s-]+$/).withMessage('Valid phone number is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('cameras').isArray().withMessage('Cameras must be an array'),
  body('lenses').isArray().withMessage('Lenses must be an array'),
  body('experienceYears').isInt({ min: 0 }).withMessage('Experience years must be a positive number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('services').isArray().withMessage('Services must be an array'),
  body('priceRange').trim().notEmpty().withMessage('Price range is required'),
];

const photographerRouter = express.Router();

// Apply rate limiting to all routes
photographerRouter.use(apiLimiter);

// CREATE PHOTOGRAPHER PROFILE
photographerRouter.post("/", 
  verifyToken, 
  photographerValidation,
  validateRequest,
  async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;

    // Ensure only photographers can create a profile
    if (role !== "photographer") {
      return next(createError(403, "Only photographers can create a profile"));
    }

    // Prevent duplicate profiles
    const existingProfile = await prisma.photographer.findUnique({
      where: { userId },
    });
    console.log('userId', existingProfile);
    if (existingProfile) {
      return next(createError(400, "Photographer profile already exists"));
    }

    // Destructure body fields
    const {
      name,
      about,
      portfolio,
      phone,
      skills = [],
      cameras = [],
      lenses = [],
      experience,
      education,
      languages = [],
      availability = [],
      experienceYears,
      location,
      services = [],
      priceRange,
      photos = [],
      profilePic
    } = req.body;

    // Parse comma-separated strings into arrays if necessary
    const parseToArray = (field) =>
      typeof field === "string" ? field.split(",").map((item) => item.trim()) : field;

    // Ensure fields are arrays
    const formattedSkills = parseToArray(skills);
    const formattedCameras = parseToArray(cameras);
    const formattedLenses = parseToArray(lenses);
    const formattedLanguages = parseToArray(languages);
    const formattedAvailability = parseToArray(availability);
    const formattedServices = parseToArray(services);

    // Create the photographer profile
    const newPhotographer = await prisma.photographer.create({
      data: {
        userId,
        name,
        about,
        portfolio,
        phone,
        skills: formattedSkills,
        cameras: formattedCameras,
        lenses: formattedLenses,
        experience,
        education,
        languages: formattedLanguages,
        availability: formattedAvailability,
        experienceYears,
        location,
        services: formattedServices,
        priceRange,
        photos,
        profilePic
      },
    });

    res.status(201).json(newPhotographer);
  } catch (err) {
    console.error("Prisma error:", err);
    next(createError(500, "Error creating photographer profile"));
  }
});

// UPDATE
photographerRouter.put("/:id", 
  verifyToken,
  photographerValidation,
  validateRequest,
  async (req, res, next) => {
  try {
    if (req.body.password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const updatedPhotographer = await prisma.photographer.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    }
    );

    if (!updatedPhotographer) {
      return next(createError(404, 'photographer not found'));
    }

    res.status(200).json(updatedPhotographer);
  } catch (err) {
    console.log('print error', err);
    next(createError(500, 'Error updating photographer'));
  }
});

// DELETE
photographerRouter.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const deletedPhotographer = await prisma.photographer.delete({where:{id: req.params.id}});
    if (!deletedPhotographer) {
      return next(createError(404, 'Photographer not found'));
    }
    res.status(200).json("Photographer has been deleted");
  } catch (err) {
    next(createError(500, 'Error deleting Photographer: ' + err));
  }
});

// GET PHOTOGRAPHER
photographerRouter.get("/find/:id", async (req, res, next) => {
  try {
    const photographer = await prisma.photographer.findFirst({
      where: {
        id: req.params.id,
      },
    })
    if (!photographer) {
      return next(createError(404, 'photographer not found'));
    }
    const { password, ...others } = photographer;
    res.status(200).json(others);
  } catch (err) {
    next(createError(500, 'Error retrieving photographer'));
  }
});

// GET ALL PHOTOGRAPHERS WITH PAGINATION
photographerRouter.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [photographers, total] = await Promise.all([
      prisma.photographer.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: {
              email: true,
              role: true
            }
          }
        }
      }),
      prisma.photographer.count()
    ]);

    res.json({
      photographers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    next(createError(500, "Error fetching photographers"));
  }
});

// GET PHOTOGRAPHERS BY CATEGORY
photographerRouter.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    
    // Map URL-friendly categories to database categories
    const categoryMapping = {
      'wedding-photography': ['Wedding Photography', 'Beach Weddings', 'Weddings'],
      'studio-photoshoots': ['Studio Photoshoots', 'Portrait Sessions'],
      'fashion-photography': ['Fashion Photography', 'Lifestyle Shoots'],
      'portrait-photography': ['Portrait Photography', 'Family Portraits', 'Corporate Headshots'],
      'food-photography': ['Food Photography', 'Product Photography'],
      'travel-photography': ['Travel Photography', 'Tourism Photography'],
      'event-photography': ['Event Photography', 'Corporate Events', 'Concert Photography']
    };

    const searchCategories = categoryMapping[category] || [category.split('-').join(' ')];

    const photographers = await prisma.photographer.findMany({
      where: {
        services: {
          hasSome: searchCategories
        }
      }
    });

    if (!photographers) {
      return res.status(200).json([]);
    }

    // Remove sensitive information
    const sanitizedPhotographers = photographers.map(photographer => {
      const { password, ...photographerData } = photographer;
      return photographerData;
    });

    res.status(200).json(sanitizedPhotographers);
  } catch (error) {
    console.error('Error fetching photographers by category:', error);
    next(createError(500, 'Error fetching photographers'));
  }
});

// Update the search endpoint
photographerRouter.get("/search", async (req, res, next) => {
  try {
    const { date, location } = req.query;
    
    console.log('Search params:', { date, location });

    // Base query with correct relation name
    const query = {
      where: {},
      include: {
        receivedBookings: {  // Changed from 'bookings' to 'receivedBookings'
          where: {
            status: {
              in: ['pending', 'confirmed']
            }
          }
        },
        user: {
          select: {
            email: true
          }
        }
      }
    };

    // Add location filter if provided
    if (location && location.trim() !== '') {
      query.where.location = {
        contains: location.trim(),
        mode: 'insensitive'
      };
    }

    // Execute query
    let photographers = await prisma.photographer.findMany(query);
    
    // Filter by date availability if date is provided
    if (date) {
      const searchDate = new Date(date);
      photographers = photographers.filter(photographer => {
        // Check if photographer has any conflicting bookings on this date
        return !photographer.receivedBookings.some(booking => {  // Changed from 'bookings' to 'receivedBookings'
          const bookingDate = new Date(booking.startDate);
          return bookingDate.toDateString() === searchDate.toDateString();
        });
      });
    }

    // Clean up the response data
    const cleanedPhotographers = photographers.map(({ receivedBookings, ...photographer }) => ({  // Changed from 'bookings' to 'receivedBookings'
      ...photographer,
      isAvailable: true
    }));

    console.log(`Found ${cleanedPhotographers.length} photographers`);
    res.status(200).json(cleanedPhotographers);

  } catch (err) {
    console.error('Search error:', err);
    next(createError(500, "Error searching photographers: " + err.message));
  }
});

module.exports = photographerRouter;
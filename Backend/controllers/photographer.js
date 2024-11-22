const bcrypt = require('bcrypt');
const express = require("express");
const createError = require('http-errors');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,} = require("./verifyToken");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const photographerRouter = express.Router();


// CREATE PHOTOGRAPHER PROFILE
photographerRouter.post("/", verifyToken, async (req, res, next) => {
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
photographerRouter.put("/:id", verifyToken, async (req, res, next) => {
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

// GET ALL PHOTOGRAPHERS
photographerRouter.get("/", async (req, res, next) => {
  const query = req.query.new;
  try {
    const photographers = query
      ? await prisma.photographer.findMany()
      : await prisma.photographer.findMany()
    res.status(200).json(photographers);
  } catch (err) {
    next(createError(500, 'Error retrieving photographers'));
  }
});

// GET USER STATS


module.exports = photographerRouter;
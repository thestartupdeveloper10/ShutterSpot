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
  
      // Check if the user has a photographer role
      if (role !== 'photographer') {
        return next(createError(403, "Only photographers can create a profile"));
      }
  
      // Check if the photographer profile already exists
      const existingProfile = await prisma.photographer.findUnique({
        where: { userId },
      });
      if (existingProfile) {
        return next(createError(400, "Photographer profile already exists"));
      }
  
      // Create the photographer profile
      const {
        name,
        about,
        portfolio,
        skills,
        cameras,
        lenses,
        experience,
        education,
        languages,
        availability,
        experienceYears,
        location,
        services,
        priceRange,
        photos,
      } = req.body;
  
      const newPhotographer = await prisma.photographer.create({
        data: {
          userId,
          name,
          about,
          portfolio,
          skills,
          cameras,
          lenses,
          experience,
          education,
          languages,
          availability,
          experienceYears,
          location,
          services,
          priceRange,
          photos,
        },
      });
  
      res.status(201).json(newPhotographer);
    } catch (err) {
      next(createError(500, "Error creating photographer profile"));
    }
  });

// UPDATE
photographerRouter.put("/:id", verifyToken, verifyTokenAndAuthorization, async (req, res, next) => {
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
      return next(createError(404, 'User not found'));
    }

    res.status(200).json(updatedPhotographer);
  } catch (err) {
    next(createError(500, 'Error updating user'));
  }
});

// DELETE
photographerRouter.delete("/:id", verifyToken, verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const deletedPhotographer = await prisma.photographer.delete({where:{id: req.params.id}});
    if (!deletedPhotographer) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(createError(500, 'Error deleting user'));
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
const bcrypt = require('bcrypt');
const express = require("express");
const createError = require('http-errors');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,} = require("./verifyToken");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const clientRouter = express.Router();


// CREATE
clientRouter.post("/", verifyToken, async (req, res, next) => {
    try {
      const { phone, location, profilePic  } = req.body;
      const { id, role } = req.user;
  
      // Ensure the user is a client
      const user = await prisma.user.findUnique({ 
        where: { id: id },
        include: {
          clientProfile: true
        }
      });

      if (!user || user.role !== 'client') {
        return next(createError(403, 'Only clients can create a profile.'));
      }
  
      // Create ClientProfile
      const clientProfile = await prisma.clientProfile.create({
        data: {
          userId: id,
          phone,
          location,
          profilePic: profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
      });

      // Return the complete profile data
      res.status(201).json({
        message: 'Client profile created successfully',
        clientProfile: {
          ...clientProfile,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        }
      });
    } catch (error) {
      console.error("Prisma error:", error);
      next(createError(500, 'Error creating client profile'));
    }
});


// UPDATE
clientRouter.put("/:id", verifyToken, async (req, res, next) => {
  try {
    if (req.body.password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const updatedUser = await prisma.clientProfile.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    }
    );

    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500, 'Error updating user'));
  }
});

// DELETE
clientRouter.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const deletedUser = await prisma.clientProfile.delete({where:{id: req.params.id}});
    if (!deletedUser) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json("User has been deleted");
  } catch (err) {
    console.log("prism error", err);
    next(createError(500, 'Error deleting user'));
  }
});

// GET USER
clientRouter.get("/find/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await prisma.clientProfile.findFirst({
      where: {
        id: req.params.id,
      },
    })
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    next(createError(500, 'Error retrieving user'));
  }
});

// GET ALL USERS
clientRouter.get("/", verifyToken, verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await prisma.clientProfile.findMany()
      : await prisma.clientProfile.findMany({ orderBy:{
        createdAt: 'desc'
      }})
    res.status(200).json(users);
  } catch (err) {
    console.log("prism error", err)
    next(createError(500, 'Error retrieving users'));
  }
});

// GET USER STATS


module.exports = clientRouter;
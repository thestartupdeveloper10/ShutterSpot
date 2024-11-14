const bcrypt = require('bcrypt');
const express = require("express");
const createError = require('http-errors');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,} = require("./verifyToken");
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

const usersRouter = express.Router();

// UPDATE
usersRouter.put("/:id", verifyToken, verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    if (req.body.password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const updatedUser = await prisma.user.update({
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
usersRouter.delete("/:id", verifyToken, verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const deletedUser = await prisma.user.delete({where:{id: req.params.id}});
    if (!deletedUser) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(createError(500, 'Error deleting user'));
  }
});

// GET USER
usersRouter.get("/find/:id", verifyToken, verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
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
usersRouter.get("/", verifyToken, verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await prisma.user.findMany()
      : await prisma.user.findMany({ orderBy:{
        createdAt: 'desc'
      }})
    res.status(200).json(users);
  } catch (err) {
    next(createError(500, 'Error retrieving users'));
  }
});

// GET USER STATS


module.exports = usersRouter;
const bcrypt = require('bcrypt');
const User = require("../models/user");
const express = require("express");
const createError = require('http-errors');
const { verifyToken, authorizeRoles, verifyOwnership } = require("./verifyToken");

const usersRouter = express.Router();

// UPDATE
usersRouter.put("/:id", verifyToken, verifyOwnership, async (req, res, next) => {
  try {
    if (req.body.password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
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
usersRouter.delete("/:id", verifyToken, verifyOwnership, async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(createError(500, 'Error deleting user'));
  }
});

// GET USER
usersRouter.get("/find/:id", verifyToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(createError(500, 'Error retrieving user'));
  }
});

// GET ALL USERS
usersRouter.get("/", verifyToken, authorizeRoles('admin'), async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(createError(500, 'Error retrieving users'));
  }
});

// GET USER STATS


module.exports = usersRouter;
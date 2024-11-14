const Contact = require("../models/contact");
const express = require("express");
const createError = require('http-errors');
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const contactRouter = express.Router();

// Create a new contact
contactRouter.post('/', async (req, res, next) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    next(createError(500, 'Error creating contact'));
  }
});

// Get all contacts (admin only)
contactRouter.get("/", verifyToken, verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const contacts = query
      ? await Contact.find().sort({ _id: -1 }).limit(5)
      : await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    next(createError(500, 'Error retrieving contacts'));
  }
});

module.exports = contactRouter;
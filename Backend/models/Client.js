const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  preferences: {
    type: [String], // e.g., ['portrait', 'wedding', 'event']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
    }
  },
  bookings: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
  }],
  favoritePhotographers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Photographer',
  }],
});

clientSchema.index({ location: '2dsphere' });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  specialties: {
    type: [String],
    required: true,
  },
  portfolio: {
    type: [String], // Array of image URLs
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  availability: {
    type: [Date],
  },
  pricing: {
    hourlyRate: {
      type: Number,
      required: true,
    },
    packageRates: {
      type: Map,
      of: Number,
    },
  },
  reviews: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
  }],
  ratingAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5'],
    set: val => Math.round(val * 10) / 10 // Rounds to 1 decimal place
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  experience: {
    type: String,
  },
  about: {
    type: String,
  },
  portfolioDescription: {
    type: String,
  },
  booking: {
    type: String,
  },
  equipment: {
    camera: String,
    lenses: String,
  },
  languages: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  profilePicture: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
});

photographerSchema.index({ location: '2dsphere' });

const Photographer = mongoose.model('Photographer', photographerSchema);

module.exports = Photographer;
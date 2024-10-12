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
  portfolio: [String],
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
  availability: [Date],
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
    set: val => Math.round(val * 10) / 10
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  experience: String,
  about: String,
  portfolioDescription: String,
  equipment: {
    camera: String,
    lenses: String,
  },
  languages: [String],
  skills: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

photographerSchema.index({ location: '2dsphere' });

photographerSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

const Photographer = mongoose.model('Photographer', photographerSchema);

module.exports = Photographer;
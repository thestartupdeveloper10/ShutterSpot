const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  preferences: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  bookings: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
  }],
  favoritePhotographers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Photographer',
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

clientSchema.index({ location: '2dsphere' });

clientSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
const mongoose = require('mongoose');
const Photographer = require('./photographer');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide a rating']
  },
  photographer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photographer',
    required: [true, 'Review must belong to a photographer']
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'Review must belong to a client']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.index({ photographer: 1, client: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function(photographerId) {
  const stats = await this.aggregate([
    {
      $match: { photographer: photographerId }
    },
    {
      $group: {
        _id: '$photographer',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Photographer.findByIdAndUpdate(photographerId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating
    });
  } else {
    await Photographer.findByIdAndUpdate(photographerId, {
      ratingQuantity: 0,
      ratingAverage: 0
    });
  }
};

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.photographer);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.photographer);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
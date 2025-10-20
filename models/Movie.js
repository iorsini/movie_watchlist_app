const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  watched: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 10, required: false },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // NOVO: associa filme ao user
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
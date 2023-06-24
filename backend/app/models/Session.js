const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '2h' },
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

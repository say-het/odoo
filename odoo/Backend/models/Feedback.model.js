// models/Feedback.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FeedbackSchema = new Schema({
  swapRequest: { type: Schema.Types.ObjectId, ref: 'SwapRequest', required: true },
  reviewer:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewee:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating:      { type: Number, min: 1, max: 5, required: true },
  comment:     { type: String },
  createdAt:   { type: Date, default: Date.now }
});

export const Feedback = model('Feedback', FeedbackSchema);

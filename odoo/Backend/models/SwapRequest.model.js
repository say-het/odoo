// models/SwapRequest.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SwapRequestSchema = new Schema({
  fromUser:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toUser:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
  skillsOffered:  [{ type: Schema.Types.ObjectId, ref: 'Skill', required: true }],
  skillsRequested:[{ type: Schema.Types.ObjectId, ref: 'Skill', required: true }],
  status:         {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  createdAt:      { type: Date, default: Date.now },
  updatedAt:      { type: Date, default: Date.now }
});

export const SwapRequest = model('SwapRequest', SwapRequestSchema);

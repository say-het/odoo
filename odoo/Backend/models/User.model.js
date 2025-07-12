// models/User.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name:       { type: String, required: true },
  email:      { type: String, unique: true, required: true },
  password:   { type: String, required: true }, // hashed
  location:   { type: String },
  profilePic: { type: String }, // URL
  availability: [{ type: String }], // e.g., ['weekends', 'evenings']
  isPublic:   { type: Boolean, default: true },
  isBanned:   { type: Boolean, default: false },
  role:       { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt:  { type: Date, default: Date.now },
  rating  : {type : Number , default : 0},
  totalResolved : {type : Number  , default : 0}
});

export const User = model('User', UserSchema);
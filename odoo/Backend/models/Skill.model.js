// models/Skill.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SkillSchema = new Schema({
  name:        { type: String, required: true, lowercase: true, trim: true },
  description: { type: String },
  createdBy:   { type: Schema.Types.ObjectId, ref: 'User' } // Optional: who created/moderates the skill
});

export const Skill = model('Skill', SkillSchema);

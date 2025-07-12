// models/UserSkills.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSkillsSchema = new Schema({
  user:    { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 reference to the user
  offered: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  wanted:  [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
});

export const UserSkills = model('UserSkills', UserSkillsSchema);

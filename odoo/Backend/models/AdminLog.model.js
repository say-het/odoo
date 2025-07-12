// models/AdminLog.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AdminLogSchema = new Schema({
  admin:      { type: Schema.Types.ObjectId, ref: 'User' },
  action:     { type: String }, // e.g., "ban_user", "reject_skill"
  targetUser: { type: Schema.Types.ObjectId, ref: 'User' },
  skillId:    { type: Schema.Types.ObjectId, ref: 'Skill' },
  notes:      { type: String },
  createdAt:  { type: Date, default: Date.now }
});

export const AdminLog = model('AdminLog', AdminLogSchema);

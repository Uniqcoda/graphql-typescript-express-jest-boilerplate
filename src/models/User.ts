import { model, Schema } from 'mongoose';
import { UserInterface } from '../types/user';

const userSchema = new Schema(
  {
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    phonePrefix: { type: String },
    phone: { type: String },
    gender: {
      type: String,
      enum: ['Female', 'Male'],
    },
    dob: { type: Date },
    role: {
      type: String,
      enum: ['SuperAdmin', 'Admin', 'User'],
      default: 'User',
      required: true,
    },
    avatarURL: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export default model<UserInterface>('User', userSchema);

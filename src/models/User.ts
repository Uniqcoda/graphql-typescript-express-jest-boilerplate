import { model, Schema } from 'mongoose';
import { UserInterface } from '../types/user';
import bcrypt, { hash } from 'bcryptjs';

const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    phone: { type: String },
    DOB: { type: Date },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isGuest: { type: Boolean, default: false },
    isSocial: { type: Boolean, default: false },
    domain: { type: String },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre<UserInterface>('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    this.password = await hash(this.password.toString(), salt);
  }
});

userSchema.methods = {
  transform() {
    const {
      id,
      email,
      lastname,
      firstname,
      DOB,
      phone,
      isDeleted,
      isActive,
      isVerified,
      isGuest,
      isSocial,
      domain,
      createdAt,
      updatedAt,
    } = this;

    return {
      id,
      email,
      firstname,
      lastname,
      DOB,
      phone,
      isDeleted,
      isActive,
      isVerified,
      isGuest,
      isSocial,
      domain,
      createdAt,
      updatedAt,
    };
  },
};

export default model<UserInterface>('User', userSchema);

import { Document } from 'mongoose';

export interface UserInterface extends Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  dob: string;
  phonePrefix: number;
  phone: number;
  role: string;
  password: string;
  createdAt: string;
  avatarURL: string;
  updatedAt: string;
  deletedAt: string;
  isActive: boolean;
}

export interface UserPure {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  gender?: string;
  dob?: string;
  phonePrefix: number;
  phone: number;
  role: string;
  password: string;
  createdAt?: string;
  token?: string;
}

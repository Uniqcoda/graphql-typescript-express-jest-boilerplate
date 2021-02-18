import { Document } from 'mongoose';

export interface UserInterface extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  DOB: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isActive: boolean;
  isVerified: boolean;
  isGuest: boolean;
  transform: Function;
  isSocial: boolean;
  domain: string;
}

export interface UserPure {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  DOB?: string;
  phone: string;
  password: string;
  createdAt?: string;
  token?: string;
  isActive?: boolean;
}

export interface LoginInterface {
  email: String;
  password: string;
}

export interface SocialLoginInterface {
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
}

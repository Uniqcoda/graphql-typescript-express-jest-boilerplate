import bcrypt from 'bcryptjs';
import joi from '@hapi/joi';
import { UserInputError } from 'apollo-server-express';
import UserModel from '../models/User';
import { UserPure } from '../types/user';
import { generateToken } from '../middleware/auth';
import config from '../config/env';

const userSchema = joi.object().keys({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().required(),
  dob: joi.date(),
  gender: joi.string(),
  phonePrefix: joi.number(),
  phone: joi.number(),
});

export async function create(data: UserPure) {
  //Validate request data
  const {
    firstname,
    lastname,
    email,
    password,
    role,
    dob,
    gender,
    phonePrefix,
    phone,
  } = await userSchema.validateAsync(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  // make sure user doesn't already exist
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new UserInputError('Email already in use');
  }

  // hash password before creating the user
  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = new UserModel({
    firstname,
    lastname,
    email,
    role,
    dob,
    gender,
    phonePrefix,
    phone,
    password: passwordHash,
  });
  await newUser.save();

  return { message: 'Sign-up Successful', payload: newUser };
}

export async function getUsers() {
  const users = await UserModel.find();
  return { payload: users };
}

const loginSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
});
export async function login(data: UserPure) {
  const { email, password } = await loginSchema.validateAsync(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UserInputError('Wrong email or password');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new UserInputError('Wrong email or password');
  }

  const token = generateToken(user, config.jwtSecret);
  return { message: 'Login successful', payload: { email: user.email, token } };
}

import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import { UserPure, UserInterface } from '../types/user';
import { generateToken } from '../middleware/auth';
import config from '../config/env';
import { userSchema, loginSchema } from '../validations/user';
import generateMessageTemplate from '../helpers/generateMessageTemplateHeader';
import sendMail from '../helpers/sendMail';

export async function create(data: UserPure) {
  try {
    const userData: UserPure = await userSchema.validateAsync(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser && !existingUser.isGuest) {
      throw new Error('Email already in use');
    }
    let user: UserInterface | null;
    if (!existingUser) {
      user = new UserModel(userData);
    } else {
      // for guest users
      let password = userData.password;
      delete userData.password;
      user = await UserModel.findOneAndUpdate(
        { email: userData.email },
        { ...userData, isGuest: false },
        { new: true },
      );
      user!.password = password;
    }

    await user!.save();

    const msg = generateMessageTemplate(
      config.senderMail,
      user!.email,
      {
        Receiver_Name: `${user?.firstname} ${user?.lastname}`,
      },
      config.welcomeMailTemplate,
    );
    await sendMail(msg);

    const token = generateToken(
      { email: user?.email, _id: user?._id, isActive: user?.isActive },
      config.jwtSecret,
    );
    const transformedUser = user!.transform();

    return { payload: { ...transformedUser, token } };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUsers() {
  const users = await UserModel.find();
  return { payload: users };
}

export async function login(data: UserPure) {
  const { email, password } = await loginSchema.validateAsync(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Wrong email or password');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Wrong email or password');
  }

  const token = generateToken(
    { email: user.email, _id: user._id, isActive: user.isActive },
    config.jwtSecret,
  );
  return { payload: { token } };
}

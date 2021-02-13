import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import config from '../config/env';
import { UserPure } from '../types/user';
import { Request } from 'express';
import UserModel from '../models/User';

const jwtSecret = config.jwtSecret;
const jwtExpiresIn = config.jwtExpiresIn;

export const generateToken = (user: UserPure, secret: string) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: jwtExpiresIn },
  );
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const tokenDetails = <UserPure>jwt.verify(token, secret);
    return tokenDetails;
  } catch (error) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

export const checkAuth = async (req: Request) => {
  //  context will be an object that will have headers property {... headers}
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Bearer ...
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = <UserPure>jwt.verify(token, jwtSecret);
        const userExists = await UserModel.findById(user.id);
        if (userExists && userExists.deletedAt) {
          throw new Error('User account does not exist');
        }
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new AuthenticationError(
      "Authorization token must be 'Bearer [token]'",
    );
  }
  throw new AuthenticationError('Authorization header must be provided');
};

import { user } from '../controllers';
import { UserPure } from '../types/user';

export default {
  Query: {
    getUsers: async () => {
      const response = await user.getUsers();
      return response.payload;
    },
  },

  Mutation: {
    signUp: async (_: Request, { input }: { input: UserPure }) => {
      const {
        firstname,
        lastname,
        email,
        gender,
        dob,
        password,
        role,
        phonePrefix,
        phone,
      } = input;
      const response = await user.create({
        firstname,
        lastname,
        email,
        gender,
        dob,
        password,
        role,
        phonePrefix,
        phone,
      });

      return response.payload;
    },
    login: async (_: Request, args: UserPure) => {
      const response = await user.login(args);
      return response.payload;
    },
  },
};

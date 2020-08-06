import mongoose from 'mongoose';
import UserModel from './models/User';
import { graphql } from 'graphql';
import { schema } from './index';

export const teardown = async function () {
  await UserModel.deleteMany({});
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export const graphqlTestCall = async (
  query: any,
  variables?: any,
  authorization?: string,
) => {
  return graphql(
    schema,
    query,
    undefined,
    // context
    {
      req: {
        headers: {
          authorization,
        },
      },
    },
    variables,
  );
};

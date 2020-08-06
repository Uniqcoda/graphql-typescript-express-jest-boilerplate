import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import mongoose from 'mongoose';
import resolvers from './resolvers/index';
import typeDefs from './typeDefs';
import config from './config/env';

const MONGODB = config.MONGODB;
const PORT = config.port;
const SERVER_URL = config.serverUrl;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const startServer = async () => {
  const server = new ApolloServer({
    schema,
    // add context for authorization header in request body
    context: ({ req }) => ({ req }),
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app });

  try {
    await mongoose
      .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        if (config.env !== 'test') {
          console.log('MongoDB connected successfully!');
        }
      });
  } catch (error) {
    console.log(error);
  }

  // open a port if the environment is not test
  if (config.env !== 'test') {
    app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready at ${SERVER_URL}`),
    );
  }
};

startServer();

export default app;

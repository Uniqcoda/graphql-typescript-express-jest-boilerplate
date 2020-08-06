import * as dotenv from 'dotenv';
dotenv.config();

const envVars = JSON.parse(JSON.stringify(process.env));

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  MONGODB:
    envVars.NODE_ENV === 'test'
      ? envVars.MONGODB_TEST
      : envVars.NODE_ENV === 'development'
      ? envVars.MONGODB_LOCAL
      : envVars.MONGODB_URI,
  serverUrl:
    envVars.NODE_ENV === 'production'
      ? envVars.SERVER_URL
      : envVars.LOCAL_SERVER_URL,
  frontEndUrl:
    envVars.NODE_ENV === 'production'
      ? envVars.FRONT_END_URL_PROD
      : envVars.FRONT_END_URL_DEV,
};

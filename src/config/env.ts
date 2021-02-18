import * as dotenv from 'dotenv';
dotenv.config();

const envVars = JSON.parse(JSON.stringify(process.env));

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_TOKEN_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  MONGODB:
    envVars.NODE_ENV === 'test'
      ? envVars.MONGO_URI_TEST
      : envVars.NODE_ENV === 'development'
      ? envVars.MONGO_URI
      : envVars.MONGODB_URI,
  serverUrl:
    envVars.NODE_ENV === 'production'
      ? envVars.SERVER_URL
      : envVars.LOCAL_SERVER_URL,
  frontEndUrl:
    envVars.NODE_ENV === 'production'
      ? envVars.FRONT_END_URL_PROD
      : envVars.CLIENT_SIDE_URL,
  senderMail: envVars.SENDER_MAIL,
  welcomeMailTemplate: envVars.WELCOME_MAIL_TEMPLATE_ID,
  sendGridApiKey: envVars.SENDGRID_API_KEY,
};

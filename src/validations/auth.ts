import joi from '@hapi/joi';

export const forgotPassword = joi.object().keys({
  email: joi.string().email().required().trim(),
});

export const resetPassword = joi.object().keys({
  password: joi
    .string()
    .min(6)
    .max(20)
    .required()
    .error(new Error('Password does not meet requirements')),
  id: joi
    .string()
    // .min(24)
    // .max(24)
    .required()
    .error(new Error('id is required. User was not authenticated')),
  user: joi.object().required().error(new Error('user was not authenticated')),
});

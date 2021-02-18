import joi from '@hapi/joi';

export const userSchema = joi.object().keys({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().min(3).max(20),
  DOB: joi.date(),
  phone: joi.string(),
});

export const loginSchema = joi.object().keys({
  email: joi.string().required().trim(),
  password: joi.string().required(),
});

export const contactFormSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required().trim(),
  how: joi.string().required(),
  message: joi.string().required(),
});

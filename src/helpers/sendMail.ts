import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import config from '../config/env';

sgMail.setApiKey(config.sendGridApiKey);
export default async function sendMail(msg: MailDataRequired) {
  try {
    await sgMail.send({
      ...msg,
      mailSettings: {
        sandboxMode: { enable: config.env === 'test' ? true : false },
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

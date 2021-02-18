import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export default function formatMessageHeaders(
  from: string,
  to: string,
  templateData: Record<string, unknown>,
  templateId: string,
): MailDataRequired {
  return {
    from,
    personalizations: [
      {
        to: [{ email: to }],
        dynamicTemplateData: templateData,
      },
    ],
    templateId,
  };
}

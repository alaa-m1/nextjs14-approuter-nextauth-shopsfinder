import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

export default async function sendCustomEmail(
  to: string,
  name: string,
  activationLink: string,
  subject: string,
  template: string
) {
  const {
    SMTP_PORT,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    // MAILING_EMAIL,
    // MAILING_PASSWORD,
  } = process.env;

  const transporter = nodemailer.createTransport({
    port: Number(SMTP_PORT),
    host: SMTP_HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const templateData = handlebars.compile(template);
  const replacementVariables = {
    user_name: name,
    activation_link: activationLink,
  };
  const html = templateData(replacementVariables);


  // send the activation email
  const options = {
    from: SMTP_EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(options, (error) => {
    if (error) {
      throw new Error((error as Error).message);
    }
  });
}

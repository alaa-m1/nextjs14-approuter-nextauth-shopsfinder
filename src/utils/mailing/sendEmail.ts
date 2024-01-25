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
    secure:true,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const templateData = handlebars.compile(template);
  const replacementVariables = {
    user_name: name,
    activation_link: activationLink,
  };
  const html = templateData(replacementVariables);

  // verify connection configuration
  transporter.verify(function (error) {
    if (error) {
      console.log(error);
    }else {
      console.log('Server is ready to take our messages');
}
  });

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

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
    MAILING_EMAIL,
    MAILING_PASSWORD,
  } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
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
    }
  });

  // send the activation email
  const options = {
    from: MAILING_EMAIL,
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

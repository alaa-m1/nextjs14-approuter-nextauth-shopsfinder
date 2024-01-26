import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

export default async function sendCustomEmail(
  to: string,
  name: string,
  link: string,
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
  const date=new Date()
  const copyrights=`©${date.getFullYear()} ShopsFinder`
  const replacementVariables = {
    user_name: name,
    link,
    copyrights
  };
  const html = templateData(replacementVariables);


  // verify the connection configuration
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  const options = {
    from: MAILING_EMAIL,
    to,
    subject,
    html,
  };
  // send the activation email
  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

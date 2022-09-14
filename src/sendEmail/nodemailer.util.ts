import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email/email.interface";
import hbs, { HbsTransporter } from "nodemailer-express-handlebars";
import "dotenv/config";

const sendEmail = async ({ subject, text, template, to }: IEmailRequest) => {
  const transporter: HbsTransporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".handlebars",
        partialsDir: "./src/views",
        defaultLayout: false,
      },
      viewPath: "./src/views",
      extName: ".handlebars",
    })
  );
  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      template: template || "normalShipping",
      context: { text },
    })
    .then(() => {
      console.log("Email send with success");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error sending email, try again later");
    });
};

export { sendEmail };

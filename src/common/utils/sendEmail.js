import nodemailer from "nodemailer";
import createError from "./error.js";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../configs/environments.js";

const sendEmail = async (email, subject, options = {}) => {
  const { text, html } = options;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: EMAIL_USERNAME || "vmink2004@gmail.com",
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"CodeFarm" <vmink2004@gmail.com>',
    to: email,
    subject: subject,
    text: text || "This email requires an HTML-compatible email client.",
    html: html || text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw createError(500, `Gửi email thất bại: ${error.message}`);
  }
};

export default sendEmail;

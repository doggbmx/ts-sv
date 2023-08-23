import nodemailer from "nodemailer";
import { config } from "../config/config";

export const mailService = nodemailer.createTransport({
  host: config.smtpHost,
  port: 465,
  secure: true,
  auth: {
    user: config.smtpEmail,
    pass: config.smtpPassword,
  },
});

import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "secret",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
  },
  refreshToken: process.env.REFRESH_SECRET || "refresh",
  nodeMailerEmail: process.env.NODEMAILER_EMAIL || "email",
  nodeMailerPassword: process.env.NODEMAILER_PASS || "password",
};

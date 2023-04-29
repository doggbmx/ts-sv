import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "secret",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
  },
  refreshToken: process.env.REFRESH_SECRET || "refresh",
  smtpEmail: process.env.SMTP_EMAIL || "email",
  smtpPassword: process.env.SMTP_PASS || "password",
};

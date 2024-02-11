import "dotenv/config";

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "secret",
    db: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        name: process.env.DB_NAME || "db",
    },
    refreshToken: process.env.REFRESH_SECRET || "refresh",
    smtpEmail: process.env.SMTP_EMAIL || "email",
    smtpPassword: process.env.SMTP_PASS || "password",
    smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
};

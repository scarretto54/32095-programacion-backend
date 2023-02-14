require("dotenv").config();

module.exports = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  MEM_TYPE: process.env.MEM_TYPE || "MEM",
  SECRET: process.env.SECRET || "secret" ,
  MAIL_GMAIL: process.env.MAIL_GMAIL,
  PASS_GMAIL: process.env.PASS_GMAIL,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_EMAIL_PASSW: process.env.NODEMAILER_EMAIL_PASSW,
  ACCOUNT_TWILIO_SID: process.env.ACCOUNT_TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUM_SMS_FROM: process.env.TWILIO_NUM_SMS_FROM,
  TWILIO_NUM_WP_FROM: process.env.TWILIO_NUM_WP_FROM,
  TWILIO_NUM_TO: process.env.TWILIO_NUM_TO,
  SESSION_EXP_TIME: Number(process.env.SESSION_EXP_TIME) || 60000
};

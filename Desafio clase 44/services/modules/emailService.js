const nodemailer = require("nodemailer");
const { PASS_GMAIL } = require("../../config/globals");

exports.transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: 'wilhelm34@ethereal.email',
    pass: 'JQS5sXn1t1eC3KRtQB',
  },
});

exports.transporterGmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "santiagocarretto@gmail.com",
    pass: PASS_GMAIL,
  },
});

const {
  TWILIO_AUTH_TOKEN,
  ACCOUNT_TWILIO_SID,
} = require("../../config/globals");
const twilioClient = require("twilio")(ACCOUNT_TWILIO_SID, TWILIO_AUTH_TOKEN);

exports.sendSMS = async (smsContent) => {
  try {
    await twilioClient.messages.create({
      body: smsContent,
      from: "+17759795311",
      to: "+541135865454",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sendWhatsApp = async (whatsAppContent) => {
  try {
    await twilioClient.messages.create({
      body: whatsAppContent,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491135865454",
    });
  } catch (error) {
    console.log(error);
  }
};


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 465),
  secure: String(process.env.MAIL_SECURE) === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export async function sendInquiryEmail(inquiry) {
  const {
    fromWhatsApp,
    language,
    checkin,
    checkout,
    adults,
    children,
    childrenAges,
    name,
    email,
    specialRequest,
  } = inquiry;

  const subject = `New hotel inquiry - ${name}`;

  const text =
    `New inquiry from WhatsApp bot\n\n` +
    `Language: ${language}\n` +
    `WhatsApp: ${fromWhatsApp}\n` +
    `Check-in: ${checkin}\n` +
    `Check-out: ${checkout}\n` +
    `Adults: ${adults}\n` +
    `Children: ${children}\n` +
    `Children ages: ${childrenAges || "N/A"}\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Special request: ${specialRequest || "None"}\n`;

  const info = await transporter.sendMail({
    from: `"Laki Hotel Bot" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject,
    text,
  });

  console.log("EMAIL SENT:", info.messageId);
  return info;
}

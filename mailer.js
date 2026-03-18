import { Resend } from "resend";

const resend = new Resend(process.env.re_N4vp5Vfe_LyVWAVV5VZmpwj9QTktWYcoz);

export async function sendInquiryEmail(inquiry) {
  const {
    fromWhatsApp,
    checkin,
    checkout,
    adults,
    children,
    name,
    email,
    specialRequest,
  } = inquiry;

  const text =
    `New inquiry from WhatsApp bot\n\n` +
    `WhatsApp: ${fromWhatsApp}\n` +
    `Check-in: ${checkin}\n` +
    `Check-out: ${checkout}\n` +
    `Adults: ${adults}\n` +
    `Children: ${children}\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Special request: ${specialRequest || "None"}\n`;

  try {
    await resend.emails.send({
      from: "Laki Hotel <onboarding@resend.dev>",
      to: [process.env.MAIL_TO],
      subject: `New hotel inquiry - ${name}`,
      text,
    });

    console.log("EMAIL SENT VIA RESEND");
  } catch (err) {
    console.error("RESEND ERROR:", err);
    throw err;
  }
}

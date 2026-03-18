import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getFaqReply, hotelKnowledge } from "./knowledge.js";
import { getAiReply } from "./ai.js";
import { sendInquiryEmail } from "./mailer.js";

dotenv.config();

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const PORT = process.env.PORT || 3000;

const userLanguage = {};
const userInquiryState = {};

// ==========================
// AI INTENT FUNCTION
// ==========================
async function detectIntentWithAI(message, language) {
  try {
    const prompt = `
Classify this hotel message.

Return ONLY JSON:
{
  "intent": "spa | restaurant | parking | location | contact | rooms | offer | checkin_checkout | children_policy | baby_crib | unknown",
  "guestType": "family | couple | none",
  "needsInquiry": true/false
}

Message: "${message}"
`;

    const ai = await getAiReply({
      message: prompt,
      language,
      faqContext: "",
    });

    const clean = ai.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);

  } catch (err) {
    return { intent: "unknown", guestType: "none", needsInquiry: false };
  }
}

// ==========================
// SEND MESSAGE
// ==========================
async function sendWhatsAppMessage(to, body) {
  await axios.post(
    `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      text: { body },
    },
    {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}

// ==========================
// HUMAN FALLBACK
// ==========================
function getHumanFallback(language = "en") {
  return language === "mk"
    ? `Нашиот тим ќе ви помогне. Контакт: ${hotelKnowledge.hotel.email}`
    : `Our team will assist you. Contact: ${hotelKnowledge.hotel.email}`;
}

// ==========================
// START INQUIRY
// ==========================
function startInquiryFlow(from, language) {
  userInquiryState[from] = {
    step: "waiting_details",
  };

  return language === "mk"
    ? "Ве молиме испратете датум и број на гости."
    : "Please send your dates and number of guests.";
}

// ==========================
// WEBHOOK VERIFY
// ==========================
app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
    return res.send(req.query["hub.challenge"]);
  }
  res.sendStatus(403);
});

// ==========================
// ROOT (optional)
// ==========================
app.get("/", (req, res) => {
  res.send("Laki Bot running 🚀");
});

// ==========================
// MAIN BOT
// ==========================
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return res.sendStatus(200);

    const from = message.from;
    const rawText = (message.text?.body || "").trim();

    if (!rawText) return res.sendStatus(200);

    const currentLanguage = userLanguage[from] || "en";

    // ==========================
    // INQUIRY FLOW HANDLER
    // ==========================
    if (userInquiryState[from]) {
      const state = userInquiryState[from];

      if (state.step === "waiting_details") {
        state.details = rawText;
        state.step = "waiting_name";

        const reply =
          currentLanguage === "mk"
            ? "Ве молиме внесете го вашето име."
            : "Please provide your name.";

        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (state.step === "waiting_name") {
        state.name = rawText;

        await sendInquiryEmail({
          name: state.name,
          details: state.details,
          from,
        });

        delete userInquiryState[from];

        const reply =
          currentLanguage === "mk"
            ? "Ви благодариме! Наскоро ќе добиете понуда."
            : "Thank you! You will receive an offer shortly.";

        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }
    }

    let reply;

    // ==========================
    // FAQ
    // ==========================
    const faqReply = getFaqReply(rawText, currentLanguage);

    if (faqReply) {
      reply = faqReply.text;

      if (faqReply.triggersInquiryFlow) {
        reply = startInquiryFlow(from, currentLanguage);
      }

      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    // ==========================
    // AI INTENT
    // ==========================
    const aiIntent = await detectIntentWithAI(rawText, currentLanguage);

    if (aiIntent?.needsInquiry || aiIntent?.intent === "offer") {
      reply = startInquiryFlow(from, currentLanguage);
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    if (aiIntent?.guestType === "family") {
      reply =
        "For families we recommend an apartment. Send dates for an offer.";
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    if (aiIntent?.guestType === "couple") {
      reply =
        "For two persons, a double room is ideal. Send dates.";
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    // ==========================
    // DIRECT FAQ FROM INTENT
    // ==========================
    const faqFromIntent = getFaqReply(aiIntent?.intent, currentLanguage);

    if (faqFromIntent) {
      await sendWhatsAppMessage(from, faqFromIntent.text);
      return res.sendStatus(200);
    }

    // ==========================
    // AI REPLY
    // ==========================
    const aiReply = await getAiReply({
      message: rawText,
      language: currentLanguage,
      faqContext: hotelKnowledge.faq
        .map((f) => `${f.id}: ${f.textEn}`)
        .join("\n"),
    });

    if (aiReply) {
      await sendWhatsAppMessage(from, aiReply);
      return res.sendStatus(200);
    }

    // ==========================
    // FALLBACK
    // ==========================
    reply = getHumanFallback(currentLanguage);

    await sendWhatsAppMessage(from, reply);
    return res.sendStatus(200);

  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// ==========================
app.listen(PORT, () => {
  console.log("Bot running on port", PORT);
});

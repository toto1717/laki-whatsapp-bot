import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getFaqReply, hotelKnowledge } from "./knowledge.js";
import { getAiReply } from "./ai.js";

dotenv.config();

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const PORT = process.env.PORT || 3000;

const userLanguage = {};

// ==========================
// AI INTENT FUNCTION
// ==========================
async function detectIntentWithAI(message, language) {
  try {
    const prompt = `
You are an AI assistant for a hotel.

Classify the user message into:

intents:
- spa
- restaurant
- parking
- location
- contact
- rooms
- offer
- checkin_checkout
- children_policy
- baby_crib
- unknown

Also detect:
- guestType: family | couple | none
- needsInquiry: true if asking about price/availability/booking

Return ONLY JSON:
{
  "intent": "spa",
  "guestType": "family",
  "needsInquiry": false,
  "confidence": 0.9
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
    console.log("AI intent error:", err);
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
    ? `За точни информации контактирајте не на ${hotelKnowledge.hotel.email}`
    : `For accurate info contact us at ${hotelKnowledge.hotel.email}`;
}

// ==========================
// INQUIRY START
// ==========================
function startInquiryFlow(from, language) {
  return language === "mk"
    ? "Ве молиме испратете ни датум и број на гости за понуда."
    : "Please send your dates and number of guests for an offer.";
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

    let reply;

    // ==========================
    // LAYER 1 — FAQ
    // ==========================
    const faqReply = getFaqReply(rawText, currentLanguage);

    if (faqReply) {
      reply = faqReply.text;

      if (faqReply.id === "spa") {
        reply +=
          currentLanguage === "mk"
            ? "\n\nМожете да го комбинирате спа искуството со престој."
            : "\n\nYou can combine the spa experience with a stay.";
      }

      if (faqReply.triggersInquiryFlow) {
        reply = startInquiryFlow(from, currentLanguage);
      }

      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    // ==========================
    // LAYER 2 — AI INTENT
    // ==========================
    const aiIntent = await detectIntentWithAI(rawText, currentLanguage);

    console.log("AI INTENT:", aiIntent);

    if (aiIntent?.needsInquiry || aiIntent?.intent === "offer") {
      reply = startInquiryFlow(from, currentLanguage);
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    if (aiIntent?.guestType === "family") {
      reply =
        currentLanguage === "mk"
          ? "За семејства препорачуваме апартман. Пратете ни датуми."
          : "For families, we recommend an apartment. Send your dates.";

      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    if (aiIntent?.guestType === "couple") {
      reply =
        currentLanguage === "mk"
          ? "За двајца, двокреветна соба е одличен избор."
          : "For two persons, a double room is ideal.";

      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    // ==========================
    // DIRECT FAQ FROM INTENT
    // ==========================
    const faqFromIntent = getFaqReply(aiIntent?.intent, currentLanguage);

    if (faqFromIntent) {
      reply = faqFromIntent.text;
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    // ==========================
    // LAYER 3 — AI REPLY
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
// START SERVER
// ==========================
app.listen(PORT, () => {
  console.log("Bot running on port", PORT);
});

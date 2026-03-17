import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getFaqReply } from "./knowledge.js";

dotenv.config();

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const PORT = process.env.PORT || 3000;

// simple in-memory language store
const userLanguage = {};

app.get("/", (req, res) => {
  res.status(200).send("Laki bot is running");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

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

function getLanguageMenu() {
  return (
    "Welcome to Laki Hotel & Spa 🏨\n\n" +
    "Please choose your language / Ве молиме изберете јазик:\n" +
    "1. English\n" +
    "2. Македонски"
  );
}

function getEnglishMenu() {
  return (
    "Welcome to Laki Hotel & Spa 🏨\n\n" +
    "How can we help you?\n" +
    "1. Prices\n" +
    "2. Spa information\n" +
    "3. Parking\n" +
    "4. Contact\n\n" +
    "You can also type your question directly."
  );
}

function getMacedonianMenu() {
  return (
    "Добредојдовте во Laki Hotel & Spa 🏨\n\n" +
    "Како можеме да ви помогнеме?\n" +
    "1. Цени\n" +
    "2. СПА информации\n" +
    "3. Паркинг\n" +
    "4. Контакт\n\n" +
    "Или напишете прашање директно."
  );
}

app.post("/webhook", async (req, res) => {
  try {
    console.log("Incoming webhook:", JSON.stringify(req.body, null, 2));

    const value = req.body?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = (message.text?.body || "").trim().toLowerCase();

    if (!text) {
      return res.sendStatus(200);
    }

    let reply = "";
    const currentLanguage = userLanguage[from] || null;

    // 1. FIRST CONTACT -> always language selection
    if (!currentLanguage) {
      if (text === "1" || text === "english") {
        userLanguage[from] = "en";
        reply = getEnglishMenu();
      } else if (text === "2" || text === "македонски" || text === "mk") {
        userLanguage[from] = "mk";
        reply = getMacedonianMenu();
      } else {
        reply = getLanguageMenu();
      }

      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    // 2. MENU HANDLING
    if (currentLanguage === "en") {
      if (text === "1") {
        const faqReply = getFaqReply("prices", "en");
        reply = faqReply?.text || "For prices and availability, please contact us at contact@lakihotelspa.com or call +389 46 203 333.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "2") {
        const faqReply = getFaqReply("spa", "en");
        reply = faqReply?.text || "Spa information is available directly from the hotel.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "3") {
        const faqReply = getFaqReply("parking", "en");
        reply = faqReply?.text || "Parking information is available directly from the hotel.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "4") {
        const faqReply = getFaqReply("contact", "en");
        reply = faqReply?.text || "You can contact us at contact@lakihotelspa.com or call +389 46 203 333.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }
    }

    if (currentLanguage === "mk") {
      if (text === "1") {
        const faqReply = getFaqReply("цени", "mk");
        reply = faqReply?.text || "За цени и достапност, ве молиме контактирајте не на contact@lakihotelspa.com или на +389 46 203 333.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "2") {
        const faqReply = getFaqReply("спа", "mk");
        reply = faqReply?.text || "Информации за СПА се достапни директно од хотелот.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "3") {
        const faqReply = getFaqReply("паркинг", "mk");
        reply = faqReply?.text || "Информации за паркинг се достапни директно од хотелот.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "4") {
        const faqReply = getFaqReply("контакт", "mk");
        reply = faqReply?.text || "Можете да не контактирате на contact@lakihotelspa.com или на +389 46 203 333.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }
    }

    // 3. FREE TEXT FAQ
    const faqReply = getFaqReply(text, currentLanguage);

    if (faqReply) {
      reply = faqReply.text;
    } else {
      reply = currentLanguage === "mk" ? getMacedonianMenu() : getEnglishMenu();
    }

    await sendWhatsAppMessage(from, reply);
    return res.sendStatus(200);
  } catch (error) {
    console.error(
      "Webhook error:",
      error.response?.data || error.message || error
    );
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

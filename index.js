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
    "1. Prices / Offer\n" +
    "2. Rooms\n" +
    "3. Spa information\n" +
    "4. Parking\n" +
    "5. Location\n" +
    "6. Contact\n\n" +
    "You can also type your question directly."
  );
}

function getMacedonianMenu() {
  return (
    "Добредојдовте во Laki Hotel & Spa 🏨\n\n" +
    "Како можеме да ви помогнеме?\n" +
    "1. Цени / Понуда\n" +
    "2. Соби\n" +
    "3. СПА информации\n" +
    "4. Паркинг\n" +
    "5. Локација\n" +
    "6. Контакт\n\n" +
    "Или напишете прашање директно."
  );
}

app.post("/webhook", async (req, res) => {
  try {
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

    // FIRST CONTACT -> ALWAYS LANGUAGE MENU
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

    // ENGLISH MENU
    if (currentLanguage === "en") {
      if (text === "1") {
        const faqReply = getFaqReply("offer", "en");
        reply =
          faqReply?.text ||
          "For the best accommodation offer, please send us your stay details.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "2") {
        const faqReply = getFaqReply("rooms", "en");
        reply =
          faqReply?.text ||
          "Please contact us with your stay details and we will recommend the best room option for you.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "3") {
        const faqReply = getFaqReply("spa", "en");
        reply = faqReply?.text || "Spa information is available directly from the hotel.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "4") {
        const faqReply = getFaqReply("parking", "en");
        reply = faqReply?.text || "Parking information is available directly from the hotel.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "5") {
        const faqReply = getFaqReply("location", "en");
        reply = faqReply?.text || "Location information is available directly from the hotel.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "6") {
        const faqReply = getFaqReply("contact", "en");
        reply =
          faqReply?.text ||
          "You can contact us at contact@lakihotelspa.com or call +389 46 203 333.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }
    }

    // MACEDONIAN MENU
    if (currentLanguage === "mk") {
      if (text === "1") {
        const faqReply = getFaqReply("понуда", "mk");
        reply =
          faqReply?.text ||
          "За најдобра понуда за сместување, испратете ни ги деталите за престојот.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "2") {
        const faqReply = getFaqReply("соби", "mk");
        reply =
          faqReply?.text ||
          "Испратете ни ги деталите за престојот и ќе ви ја препорачаме најсоодветната соба.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "3") {
        const faqReply = getFaqReply("спа", "mk");
        reply = faqReply?.text || "Информации за СПА се достапни директно од хотелот.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "4") {
        const faqReply = getFaqReply("паркинг", "mk");
        reply = faqReply?.text || "Информации за паркинг се достапни директно од хотелот.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "5") {
        const faqReply = getFaqReply("локација", "mk");
        reply = faqReply?.text || "Информации за локација се достапни директно од хотелот.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }

      if (text === "6") {
        const faqReply = getFaqReply("контакт", "mk");
        reply =
          faqReply?.text ||
          "Можете да не контактирате на contact@lakihotelspa.com или на +389 46 203 333.";
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);
      }
    }

    // FREE TEXT FAQ
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

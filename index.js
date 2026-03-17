import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const PORT = process.env.PORT || 3000;

// very simple in-memory language store for testing
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
    "Please choose your language:\n" +
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
    "4. Contact"
  );
}

function getMacedonianMenu() {
  return (
    "Добредојдовте во Laki Hotel & Spa 🏨\n\n" +
    "Како можеме да ви помогнеме?\n" +
    "1. Цени\n" +
    "2. СПА информации\n" +
    "3. Паркинг\n" +
    "4. Контакт"
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

    let reply = "";

    // language selection
    if (text === "1" || text === "english") {
      userLanguage[from] = "en";
      reply = getEnglishMenu();
    } else if (text === "2" || text === "македонски" || text === "mk") {
      userLanguage[from] = "mk";
      reply = getMacedonianMenu();
    } else {
      const lang = userLanguage[from];

      if (!lang) {
        reply = getLanguageMenu();
      } else if (lang === "en") {
        if (text.includes("price") || text === "prices") {
          reply =
            "For the best offer, please contact us at contact@lakihotelspa.com or call +389 46 203 333.";
        } else if (text.includes("spa") || text === "2") {
          reply =
            "Spa is included in the price. When there is high occupancy, spa use may be limited to 2 hours so all guests can enjoy it. Our indoor saltwater pool is open from 11:00 to 21:00.";
        } else if (text.includes("parking") || text === "3") {
          reply = "Parking is outdoor and free of charge.";
        } else if (text.includes("contact") || text === "4") {
          reply =
            "You can contact us at contact@lakihotelspa.com or call +389 46 203 333.";
        } else {
          reply = getEnglishMenu();
        }
      } else if (lang === "mk") {
        if (text.includes("цена") || text === "цени") {
          reply =
            "За најдобра понуда, ве молиме пишете ни на contact@lakihotelspa.com или јавете се на +389 46 203 333.";
        } else if (text.includes("спа") || text === "2") {
          reply =
            "СПА е вклучено во цената. Кога има поголема гужва, користењето може да биде ограничено на 2 часа за сите гости да можат да уживаат. Внатрешниот базен со солена вода работи од 11:00 до 21:00.";
        } else if (text.includes("паркинг") || text === "3") {
          reply = "Паркингот е надворешен и бесплатен.";
        } else if (text.includes("контакт") || text === "4") {
          reply =
            "Можете да не контактирате на contact@lakihotelspa.com или на +389 46 203 333.";
        } else {
          reply = getMacedonianMenu();
        }
      }
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

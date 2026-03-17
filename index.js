import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getFaqReply } from "./knowledge.js";
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

function startInquiryFlow(from, language) {
  userInquiryState[from] = {
    step: "checkin",
    language,
    data: {},
  };

  return language === "mk"
    ? "За да ви подготвиме понуда, ве молиме внесете check-in датум.\nПример: 10.04.2026"
    : "To prepare an offer for you, please enter your check-in date.\nExample: 10.04.2026";
}

function resetInquiryFlow(from) {
  delete userInquiryState[from];
}

async function handleInquiryStep(from, text) {
  const inquiry = userInquiryState[from];
  if (!inquiry) return null;

  const language = inquiry.language;
  const msg = text.trim();

  if (msg === "cancel" || msg === "stop" || msg === "откажи" || msg === "стоп") {
    resetInquiryFlow(from);
    return language === "mk"
      ? "Барањето е откажано.\n\n" + getMacedonianMenu()
      : "Inquiry cancelled.\n\n" + getEnglishMenu();
  }

  if (inquiry.step === "checkin") {
    inquiry.data.checkin = msg;
    inquiry.step = "checkout";

    return language === "mk"
      ? "Внесете check-out датум.\nПример: 12.04.2026"
      : "Please enter your check-out date.\nExample: 12.04.2026";
  }

  if (inquiry.step === "checkout") {
    inquiry.data.checkout = msg;
    inquiry.step = "adults";

    return language === "mk"
      ? "Колку возрасни гости ќе има?"
      : "How many adults will stay?";
  }

  if (inquiry.step === "adults") {
    inquiry.data.adults = msg;
    inquiry.step = "children";

    return language === "mk"
      ? "Колку деца ќе има?\nАко нема, напишете 0."
      : "How many children will stay?\nIf none, type 0.";
  }

  if (inquiry.step === "children") {
    inquiry.data.children = msg;
    inquiry.step = "name";

    return language === "mk"
      ? "Ве молиме внесете го вашето име:"
      : "Please enter your name:";
  }

  if (inquiry.step === "name") {
    inquiry.data.name = msg;
    inquiry.step = "email";

    return language === "mk"
      ? "Ве молиме внесете e-mail адреса:"
      : "Please enter your email address:";
  }

  if (inquiry.step === "email") {
    inquiry.data.email = msg;

    console.log("NEW HOTEL INQUIRY:", {
      from,
      language,
      ...inquiry.data,
    });

    try {
      await sendInquiryEmail({
        fromWhatsApp: from,
        language,
        checkin: inquiry.data.checkin,
        checkout: inquiry.data.checkout,
        adults: inquiry.data.adults,
        children: inquiry.data.children,
        name: inquiry.data.name,
        email: inquiry.data.email,
      });
    } catch (emailError) {
      console.error("Email send error:", emailError.message || emailError);
    }

    const summaryMk =
      "Ви благодариме. Вашето барање е примено.\n\n" +
      "Check-in: " + inquiry.data.checkin + "\n" +
      "Check-out: " + inquiry.data.checkout + "\n" +
      "Возрасни: " + inquiry.data.adults + "\n" +
      "Деца: " + inquiry.data.children + "\n" +
      "Име: " + inquiry.data.name + "\n" +
      "Email: " + inquiry.data.email + "\n\n" +
      "Вашето барање е успешно испратено и на нашиот e-mail.\n" +
      "Ќе ви испратиме понуда што е можно поскоро.\n" +
      "За дополнителни информации: contact@lakihotelspa.com / +389 46 203 333";

    const summaryEn =
      "Thank you. Your inquiry has been received.\n\n" +
      "Check-in: " + inquiry.data.checkin + "\n" +
      "Check-out: " + inquiry.data.checkout + "\n" +
      "Adults: " + inquiry.data.adults + "\n" +
      "Children: " + inquiry.data.children + "\n" +
      "Name: " + inquiry.data.name + "\n" +
      "Email: " + inquiry.data.email + "\n\n" +
      "Your inquiry has also been sent to our email.\n" +
      "We will send you an offer as soon as possible.\n" +
      "For additional information: contact@lakihotelspa.com / +389 46 203 333";

    resetInquiryFlow(from);
    return language === "mk" ? summaryMk : summaryEn;
  }

  return null;
}

function shouldStartInquiryFlow(text, language) {
  const t = text.toLowerCase();

  if (language === "mk") {
    return (
      t === "1" ||
      t.includes("цена") ||
      t.includes("цени") ||
      t.includes("понуда") ||
      t.includes("достапност") ||
      t.includes("резервација")
    );
  }

  return (
    t === "1" ||
    t.includes("price") ||
    t.includes("prices") ||
    t.includes("offer") ||
    t.includes("availability") ||
    t.includes("booking") ||
    t.includes("reservation")
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

    if (userInquiryState[from]) {
      reply = await handleInquiryStep(from, text);
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

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

    if (shouldStartInquiryFlow(text, currentLanguage)) {
      reply = startInquiryFlow(from, currentLanguage);
      await sendWhatsAppMessage(from, reply);
      return res.sendStatus(200);
    }

    if (currentLanguage === "en") {
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

    if (currentLanguage === "mk") {
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

    const faqReply = getFaqReply(text, currentLanguage);

    if (faqReply) {
      if (faqReply.triggersInquiryFlow) {
        reply = startInquiryFlow(from, currentLanguage);
      } else {
        reply = faqReply.text;
      }
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

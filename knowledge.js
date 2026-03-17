const hotelKnowledge = {
  hotel: {
    name: "Laki Hotel & Spa",
    email: "contact@lakihotelspa.com",
    phone: "+389 46 203 333",
    fallbackMessageEn:
      "For accurate information, please contact us at contact@lakihotelspa.com or call +389 46 203 333.",
    fallbackMessageMk:
      "За точни информации, ве молиме контактирајте не на contact@lakihotelspa.com или јавете се на +389 46 203 333.",
  },

  faq: [
    {
      id: "spa",
      keywords: [
        "spa",
        "wellness",
        "sauna",
        "steam bath",
        "jacuzzi",
        "базен",
        "спа",
        "велнес",
        "сауна",
        "џакузи",
      ],
      answerEn:
        "Our Spa & Wellness Center is available for hotel guests. Access and time slots may depend on hotel occupancy and internal schedule. For exact availability, please contact us directly.",
      answerMk:
        "Нашиот СПА и Wellness центар е достапен за гостите на хотелот. Пристапот и термините може да зависат од исполнетоста на хотелот и интерниот распоред. За точна достапност, ве молиме контактирајте не директно.",
    },

    {
      id: "parking",
      keywords: [
        "parking",
        "car",
        "vehicle",
        "park",
        "паркинг",
        "кола",
        "возило",
      ],
      answerEn:
        "Parking information is available directly from the hotel. Please contact us for current parking details and availability.",
      answerMk:
        "Информации за паркинг се добиваат директно од хотелот. Ве молиме контактирајте не за тековни детали и достапност.",
    },

    {
      id: "contact",
      keywords: [
        "contact",
        "phone",
        "email",
        "call",
        "number",
        "kontakt",
        "контакт",
        "телефон",
        "мејл",
        "email",
        "број",
      ],
      answerEn:
        "You can contact Laki Hotel & Spa at contact@lakihotelspa.com or +389 46 203 333.",
      answerMk:
        "Може да не контактирате на contact@lakihotelspa.com или +389 46 203 333.",
    },

    {
      id: "prices",
      keywords: [
        "price",
        "prices",
        "rate",
        "rates",
        "cost",
        "availability",
        "available",
        "book",
        "booking",
        "reservation",
        "reserve",
        "цена",
        "цени",
        "достапност",
        "слободно",
        "резервација",
        "резервирај",
        "соба",
        "понуда",
      ],
      answerEn:
        "For prices and availability, please send us your stay details and we will prepare an offer.",
      answerMk:
        "За цени и достапност, испратете ни ги деталите за престојот и ќе ви подготвиме понуда.",
      triggersInquiryFlow: true,
    },

    {
      id: "location",
      keywords: [
        "location",
        "address",
        "where",
        "map",
        "locate",
        "адреса",
        "локација",
        "каде",
        "мапа",
      ],
      answerEn:
        "For the exact hotel location and directions, please contact us directly.",
      answerMk:
        "За точна локација и насоки до хотелот, ве молиме контактирајте не директно.",
    },

    {
      id: "checkin_checkout",
      keywords: [
        "check in",
        "check-in",
        "check out",
        "check-out",
        "arrival",
        "departure",
        "чекин",
        "чек ин",
        "чек аут",
        "доаѓање",
        "заминување",
      ],
      answerEn:
        "For check-in and check-out details, please contact the hotel directly so we can provide the latest information.",
      answerMk:
        "За информации за check-in и check-out, ве молиме контактирајте го хотелот директно за да ви дадеме најточни информации.",
    },

    {
      id: "breakfast",
      keywords: [
        "breakfast",
        "food",
        "meal",
        "restaurant",
        "појадок",
        "храна",
        "оброк",
        "ресторан",
      ],
      answerEn:
        "For breakfast and meal details, please contact the hotel directly for the latest information.",
      answerMk:
        "За информации за појадок и оброци, ве молиме контактирајте го хотелот директно за најнови информации.",
    },

    {
      id: "pets",
      keywords: [
        "pet",
        "pets",
        "dog",
        "cat",
        "animal",
        "милениче",
        "миленичиња",
        "куче",
        "мачка",
      ],
      answerEn:
        "For pet policy, please contact the hotel directly before booking.",
      answerMk:
        "За политика за миленичиња, ве молиме контактирајте го хотелот директно пред резервација.",
    },

    {
      id: "children",
      keywords: [
        "children",
        "kids",
        "child",
        "baby",
        "family",
        "деца",
        "дете",
        "бебе",
        "фамилија",
      ],
      answerEn:
        "For children accommodation details, please send us your stay details and number of guests so we can prepare the right offer.",
      answerMk:
        "За сместување со деца, испратете ни ги деталите за престојот и бројот на гости за да ви подготвиме соодветна понуда.",
    },
  ],
};

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findBestFaqMatch(message) {
  const normalizedMessage = normalizeText(message);

  let bestMatch = null;
  let bestScore = 0;

  for (const item of hotelKnowledge.faq) {
    let score = 0;

    for (const keyword of item.keywords) {
      const normalizedKeyword = normalizeText(keyword);

      if (normalizedMessage.includes(normalizedKeyword)) {
        score += normalizedKeyword.length > 4 ? 2 : 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestScore === 0) return null;

  return bestMatch;
}

function getFaqReply(message, language = "en") {
  const match = findBestFaqMatch(message);

  if (!match) return null;

  return {
    id: match.id,
    text: language === "mk" ? match.answerMk : match.answerEn,
    triggersInquiryFlow: !!match.triggersInquiryFlow,
  };
}

module.exports = {
  hotelKnowledge,
  getFaqReply,
  findBestFaqMatch,
  normalizeText,
};

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
      ],
      answerEn:
        "For prices and availability, please send us your stay details and we will prepare an offer.",
      answerMk:
        "За цени и достапност, испратете ни ги деталите за престојот и ќе ви подготвиме понуда.",
      triggersInquiryFlow: true,
    },

    {
      id: "rooms",
      keywords: [
        "room",
        "rooms",
        "accommodation",
        "stay",
        "apartment",
        "suite",
        "соба",
        "соби",
        "сместување",
        "апартман",
        "апартмани",
      ],
      answerEn:
        "Laki Hotel & Spa offers comfortable accommodation options for couples, families and groups. Please contact us with your preferred dates, number of adults and children, and we will recommend the best room option for you.",
      answerMk:
        "Laki Hotel & Spa нуди удобни опции за сместување за парови, фамилии и групи. Испратете ни ги датумите, бројот на возрасни и деца, и ќе ви ја препорачаме најсоодветната соба.",
    },

    {
      id: "offer",
      keywords: [
        "offer",
        "offers",
        "special offer",
        "deal",
        "package",
        "accommodation offer",
        "понуда",
        "понуди",
        "пакет",
        "специјална понуда",
      ],
      answerEn:
        "For the best accommodation offer, please send us your check-in date, check-out date, number of adults, number of children, your name and email, and we will prepare an offer for you.",
      answerMk:
        "За најдобра понуда за сместување, испратете ни check-in датум, check-out датум, број на возрасни, број на деца, име и e-mail, и ќе ви подготвиме понуда.",
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
        "near",
        "локација",
        "адреса",
        "каде",
        "мапа",
        "блиску",
      ],
      answerEn:
        "You can find our exact location here:\nhttps://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
      answerMk:
        "Локацијата на хотелот можете да ја видите тука:\nhttps://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
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

export { hotelKnowledge, getFaqReply, findBestFaqMatch, normalizeText };

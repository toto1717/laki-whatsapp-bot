const hotelKnowledge = {
  hotel: {
    name: "Laki Hotel & Spa",
    email: "contact@lakihotelspa.com",
    phone: "+389 46 203 333",
    mapsUrl:
      "https://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D",
    fallbackMessageEn:
      "For accurate information, please contact us at contact@lakihotelspa.com or call +389 46 203 333.",
    fallbackMessageMk:
      "За точни информации, ве молиме контактирајте не на contact@lakihotelspa.com или јавете се на +389 46 203 333.",
  },

  faq: [
    {
      id: "offer",
      keywordsEn: [
        "price",
        "prices",
        "offer",
        "offers",
        "availability",
        "booking",
        "reservation",
        "reserve",
        "rate",
        "rates",
        "cost",
      ],
      keywordsMk: [
        "цена",
        "цени",
        "понуда",
        "понуди",
        "достапност",
        "резервација",
        "резервирај",
      ],
      textEn:
        "For prices, availability and the best offer, please send us your stay details and we will prepare an offer for you.",
      textMk:
        "За цени, достапност и најдобра понуда, испратете ни ги деталите за престојот и ќе ви подготвиме понуда.",
      triggersInquiryFlow: true,
    },

    {
      id: "rooms",
      keywordsEn: [
        "room",
        "rooms",
        "apartment",
        "apartments",
        "accommodation",
        "stay",
        "suite",
        "minibar",
        "balcony",
        "crib",
      ],
      keywordsMk: [
        "соба",
        "соби",
        "апартман",
        "апартмани",
        "сместување",
        "мини бар",
        "балкон",
        "креветче",
      ],
      textEn:
        "Laki Hotel & Spa offers rooms and apartments.\n\n" +
        "- Breakfast is included\n" +
        "- All accommodation units have a balcony\n" +
        "- Minibar is available and charged extra\n" +
        "- Baby crib is available on request\n\n" +
        "For the best option, please send us your stay details and we will prepare an offer for you.",
      textMk:
        "Laki Hotel & Spa нуди соби и апартмани.\n\n" +
        "- Појадокот е вклучен\n" +
        "- Сите сместувачки единици имаат балкон\n" +
        "- Мини бар има и се наплаќа дополнително\n" +
        "- Креветче за дете е достапно по барање\n\n" +
        "За најсоодветна опција, испратете ни ги деталите за престојот и ќе ви подготвиме понуда.",
    },

    {
      id: "spa",
      keywordsEn: [
        "spa",
        "wellness",
        "pool",
        "jacuzzi",
        "sauna",
        "steam bath",
        "aroma bath",
        "massage",
      ],
      keywordsMk: [
        "спа",
        "велнес",
        "базен",
        "џакузи",
        "сауна",
        "парна бања",
        "арома бања",
        "масажа",
      ],
      textEn:
        "Our Spa Center includes:\n" +
        "- Indoor heated saltwater pool\n" +
        "- Jacuzzi\n" +
        "- Sauna\n" +
        "- Steam bath\n" +
        "- Aroma bath\n" +
        "- Massage\n\n" +
        "Spa working hours: 11:00 - 21:00\n" +
        "Spa access is included in the price.\n" +
        "When the spa is busy, usage may be limited to 2 hours.\n\n" +
        "For additional information, please contact reception.",
      textMk:
        "Нашиот СПА центар вклучува:\n" +
        "- Внатрешен базен со солена топла вода\n" +
        "- Џакузи\n" +
        "- Сауна\n" +
        "- Парна бања\n" +
        "- Арома бања\n" +
        "- Масажа\n\n" +
        "Работно време на СПА: 11:00 - 21:00\n" +
        "СПА е вклучено во цената.\n" +
        "Кога има гужва, користењето може да се ограничи на 2 часа.\n\n" +
        "За дополнителни информации, ве молиме контактирајте рецепција.",
    },

    {
      id: "restaurant",
      keywordsEn: [
        "restaurant",
        "food",
        "meal",
        "dinner",
        "lunch",
        "breakfast",
      ],
      keywordsMk: [
        "ресторан",
        "храна",
        "оброк",
        "вечера",
        "ручек",
        "појадок",
      ],
      textEn:
        "Our restaurant working hours are from 07:00 to 22:00.\n" +
        "Breakfast is included in the accommodation.",
      textMk:
        "Работното време на нашиот ресторан е од 07:00 до 22:00.\n" +
        "Појадокот е вклучен во сместувањето.",
    },

    {
      id: "parking",
      keywordsEn: ["parking", "car", "vehicle", "park"],
      keywordsMk: ["паркинг", "кола", "возило"],
      textEn:
        "Parking is free for hotel guests.\n" +
        "It is an outdoor parking area located in the hotel yard and under video surveillance.",
      textMk:
        "Паркингот е бесплатен за гостите на хотелот.\n" +
        "Се работи за надворешен паркинг во дворот на хотелот и е под видео надзор.",
    },

    {
      id: "location",
      keywordsEn: ["location", "address", "map", "where", "near", "airport", "beach"],
      keywordsMk: ["локација", "адреса", "мапа", "каде", "блиску", "аеродром", "плажа"],
      textEn:
        "Laki Hotel & Spa is located in Ohrid.\n" +
        "- About 15 km from Ohrid Airport\n" +
        "- A short walk from Beach Nemo\n" +
        "- Around 8 km from Early Christian Basilica and Port Ohrid\n\n" +
        `Google Maps:\n${"https://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"}`,
      textMk:
        "Laki Hotel & Spa се наоѓа во Охрид.\n" +
        "- Околу 15 km од Охридскиот аеродром\n" +
        "- На кратко пешачење од Beach Nemo\n" +
        "- Околу 8 km од Early Christian Basilica и Port Ohrid\n\n" +
        `Google Maps:\n${"https://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"}`,
    },

    {
      id: "contact",
      keywordsEn: ["contact", "phone", "email", "call", "number", "reception"],
      keywordsMk: ["контакт", "телефон", "мејл", "број", "рецепција"],
      textEn:
        "You can contact Laki Hotel & Spa 24/7 at:\n" +
        "Email: contact@lakihotelspa.com\n" +
        "Phone: +389 46 203 333",
      textMk:
        "Може да не контактирате 24/7 на:\n" +
        "Email: contact@lakihotelspa.com\n" +
        "Телефон: +389 46 203 333",
    },
{
  id: "internal_phone",

  keywordsEn: [
    "phone",
    "internal",
    "call",
    "reception",
    "number"
  ],

  keywordsMk: [
    "телефон",
    "внатрешен",
    "број",
    "рецепција",
    "како да се јавам"
  ],

  textEn:
    "📞 Internal phone numbers (from your room):\n\n" +
    "0 – Reception\n" +
    "501 – Restaurant\n" +
    "502 – Spa\n" +
    "503 – Pool\n" +
    "504 – Kitchen\n\n" +
    "All numbers are available via the phone in your room.",

  textMk:
    "📞 Внатрешни телефонски броеви (од соба):\n\n" +
    "0 – Рецепција\n" +
    "501 – Ресторан\n" +
    "502 – СПА\n" +
    "503 – Базен\n" +
    "504 – Кујна\n\n" +
    "Сите броеви се достапни преку телефонот во вашата соба."
},
    {
      id: "checkin_checkout",
      keywordsEn: ["check in", "check-in", "check out", "check-out", "arrival", "departure"],
      keywordsMk: ["чек ин", "чекин", "чек аут", "доаѓање", "заминување"],
      textEn:
        "Check-in time is from 14:00.\nCheck-out time is until 10:30.",
      textMk:
        "Check-in е од 14:00.\nCheck-out е до 10:30.",
    },

    {
      id: "children_policy",
      keywordsEn: ["children", "kids", "child", "baby", "family", "child policy"],
      keywordsMk: ["деца", "дете", "бебе", "фамилија", "политика за деца"],
      textEn:
        "Children policy:\n" +
        "- Children up to 7 years stay free of charge\n" +
        "- Children from 7 to 12 years receive a 50% rate",
      textMk:
        "Политика за деца:\n" +
        "- Деца до 7 години се без доплата\n" +
        "- Деца од 7 до 12 години се со 50% цена",
    },

    {
      id: "baby_crib",
      keywordsEn: ["baby crib", "crib", "cot", "baby bed"],
      keywordsMk: ["креветче", "детско креветче", "бебешко креветче"],
      textEn:
        "Baby crib is available on request. Please mention it in your inquiry.",
      textMk:
        "Креветче за дете е достапно по барање. Ве молиме наведете го тоа во вашето барање.",
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

function getFaqById(id) {
  return hotelKnowledge.faq.find((item) => item.id === id) || null;
}

function findBestFaqMatch(message, language = "en") {
  const normalizedMessage = normalizeText(message);
  if (!normalizedMessage) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const item of hotelKnowledge.faq) {
    const keywords =
      language === "mk"
        ? [...(item.keywordsMk || []), ...(item.keywordsEn || [])]
        : [...(item.keywordsEn || []), ...(item.keywordsMk || [])];

    let score = 0;

    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (!normalizedKeyword) continue;

      if (normalizedMessage.includes(normalizedKeyword)) {
        score += normalizedKeyword.length > 4 ? 2 : 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

function getFaqReply(input, language = "en") {
  const byId = getFaqById(input);

  const match = byId || findBestFaqMatch(input, language);

  if (!match) return null;

  return {
    id: match.id,
    text: language === "mk" ? match.textMk : match.textEn,
    triggersInquiryFlow: !!match.triggersInquiryFlow,
    documentUrl: match.documentUrl || null,
  };
}

export { hotelKnowledge, getFaqReply, getFaqById, findBestFaqMatch, normalizeText };

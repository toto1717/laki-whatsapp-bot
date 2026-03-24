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
        "quote",
        "book",
      ],
      keywordsMk: [
        "цена",
        "цени",
        "понуда",
        "понуди",
        "достапност",
        "резервација",
        "резервирај",
        "слободно",
        "достапно",
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
        "Laki Hotel & Spa offers comfortable rooms and apartments.\n\n" +
        "- Breakfast is included\n" +
        "- All accommodation units have a balcony\n" +
        "- Minibar is available and charged extra\n" +
        "- Baby crib is available on request\n\n" +
        "If you would like, send us your stay details and we will gladly prepare the most suitable offer for you.",
      textMk:
        "Laki Hotel & Spa нуди удобни соби и апартмани.\n\n" +
        "- Појадокот е вклучен\n" +
        "- Сите сместувачки единици имаат балкон\n" +
        "- Мини бар има и се наплаќа дополнително\n" +
        "- Креветче за дете е достапно по барање\n\n" +
        "Доколку сакате, испратете ни ги деталите за престојот и со задоволство ќе ви подготвиме најсоодветна понуда.",
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
        "If you would like to reserve a spa treatment or massage, please let us know your preferred time so we can check availability.",
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
        "Доколку сакате да резервирате СПА третман или масажа, само пишете ни за кој термин сте заинтересирани, па ќе провериме дали има слободно место.",
    },

    {
      id: "spa_booking",
      keywordsEn: [
        "spa booking",
        "book spa",
        "reserve spa",
        "massage booking",
        "book massage",
        "spa reservation",
      ],
      keywordsMk: [
        "резервација за спа",
        "резервација за масажа",
        "резервирај спа",
        "резервирај масажа",
        "термин за спа",
        "термин за масажа",
      ],
      textEn:
        "If you would like to reserve a spa treatment or massage, please send us your preferred time and we will check availability for you.",
      textMk:
        "Доколку сакате да резервирате СПА третман или масажа, испратете ни кој термин ви одговара, па ќе провериме дали има слободно место.",
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
        "Breakfast is included in the accommodation.\n" +
        "Breakfast hours are from 07:00 to 10:00.",
      textMk:
        "Работното време на нашиот ресторан е од 07:00 до 22:00.\n" +
        "Појадокот е вклучен во сместувањето.\n" +
        "Појадокот се служи од 07:00 до 10:00.",
    },

    {
      id: "breakfast_hours",
      keywordsEn: [
        "breakfast hours",
        "when is breakfast",
        "breakfast time",
        "what time is breakfast",
      ],
      keywordsMk: [
        "време за појадок",
        "појадок од колку",
        "појадок до колку",
        "кога е појадок",
      ],
      textEn:
        "Breakfast is served from 07:00 to 10:00 and is included in the accommodation.",
      textMk:
        "Појадокот се служи од 07:00 до 10:00 и е вклучен во сместувањето.",
    },

    {
      id: "room_service",
      keywordsEn: [
        "room service",
        "order from room",
        "food to room",
        "call restaurant",
        "restaurant from room",
      ],
      keywordsMk: [
        "room service",
        "нарачка во соба",
        "нарачка од соба",
        "храна во соба",
        "како да нарачам од соба",
        "како да се јавам на ресторан",
      ],
      textEn:
        "Room service is available.\n" +
        "From your room phone, please call the restaurant directly:\n" +
        "- Restaurant: 501",
      textMk:
        "Достапна е нарачка во соба.\n" +
        "Од телефонот во собата јавете се директно во ресторанот:\n" +
        "- Ресторан: 501",
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
  keywordsEn: [
    "location",
    "address",
    "map",
    "where",
    "near",
    "airport",
    "beach",
  ],
  keywordsMk: [
    "локација",
    "адреса",
    "мапа",
    "каде",
    "блиску",
    "аеродром",
    "плажа",
  ],
  textEn:
    "Laki Hotel & Spa is located in Ohrid.\n" +
    "- About 15 km from Ohrid Airport\n" +
    "- Close to the beach\n" +
    "- Around 8 km from the city attractions and Port Ohrid\n\n" +
    "Google Maps:\n" +
    "https://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D",
  textMk:
    "Laki Hotel & Spa се наоѓа во Охрид.\n" +
    "- Околу 15 km од Охридскиот аеродром\n" +
    "- Во близина има плажа\n" +
    "- Околу 8 km од градските знаменитости и Порт Охрид\n\n" +
    "Google Maps:\n" +
    "https://www.google.com/maps/place/Hotel+%26+Spa+%E2%80%9ELaki%E2%80%9C/@41.068414,20.7991041,827m/data=!3m1!1e3!4m11!3m10!1s0x1350c37c9dd4da75:0xeb369b8ad996df4f!5m4!1s2026-04-04!2i4!4m1!1i2!8m2!3d41.068414!4d20.801679!16s%2Fg%2F11ddxpfd7j?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D",
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
      id: "payment_methods",
      keywordsEn: [
        "payment",
        "payment methods",
        "pay",
        "card",
        "cash",
        "advance payment",
        "deposit",
      ],
      keywordsMk: [
        "плаќање",
        "начин на плаќање",
        "картичка",
        "готовина",
        "аванс",
        "депозит",
      ],
      textEn:
        "Payment can be arranged by cash, card or advance payment, depending on the reservation details.\n" +
        "For a specific booking, please send us your stay details and preferred payment method so our team can confirm everything for you.",
      textMk:
        "Плаќањето може да се организира со готовина, картичка или аванс, зависно од деталите на резервацијата.\n" +
        "За конкретна резервација, испратете ни ги деталите за престојот и начинот на плаќање што го преферирате, а нашиот тим ќе ви потврди сè.",
    },

    {
      id: "cancellation_policy",
      keywordsEn: [
        "cancellation",
        "cancel",
        "refund",
        "non refundable",
        "change booking",
        "change date",
      ],
      keywordsMk: [
        "откажување",
        "отказ",
        "рефундација",
        "нон рефундабле",
        "промена на термин",
        "промена на резервација",
      ],
      textEn:
        "Our reservations are generally handled under a non-refundable policy.\n" +
        "If you need a date change, please contact us with your reservation details and we will check the available options.",
      textMk:
        "Нашите резервации вообичаено се водат по non-refundable политика.\n" +
        "Доколку ви е потребна промена на термин, испратете ни ги деталите од резервацијата и ќе провериме кои се можностите.",
    },

    {
      id: "pet_policy",
      keywordsEn: ["pet", "pets", "dog", "cat", "animal"],
      keywordsMk: ["миленик", "миленици", "куче", "мачка", "животно"],
      textEn:
        "Thank you for asking. Pets are currently not allowed in the hotel.\n" +
        "We appreciate your understanding.",
      textMk:
        "Ви благодариме на прашањето. Во моментов миленици не се дозволени во хотелот.\n" +
        "Ви благодариме на разбирањето.",
    },

    {
      id: "wifi",
      keywordsEn: ["wifi", "wi-fi", "internet", "wireless"],
      keywordsMk: ["wifi", "wi-fi", "интернет", "безжичен интернет"],
      textEn:
        "Wi-Fi internet is available free of charge for hotel guests.",
      textMk:
        "Wi-Fi интернетот е бесплатен за гостите на хотелот.",
    },

    {
      id: "late_checkin",
      keywordsEn: [
        "late check in",
        "late check-in",
        "late arrival",
        "arrive late",
        "check in late",
      ],
      keywordsMk: [
        "доцно чекирање",
        "доцно пристигнување",
        "ќе дојдам доцна",
        "касно пристигнување",
        "касен check in",
      ],
      textEn:
        "Late check-in is possible only with prior notice and approval from reception, depending on the reservations and hotel availability.\n" +
        "Please let us know your expected arrival time in advance.",
      textMk:
        "Доцно check-in е возможно само со претходна најава и одобрување од рецепција, зависно од резервациите и распоредот во хотелот.\n" +
        "Ве молиме однапред да ни го испратите очекуваното време на пристигнување.",
    },

    {
      id: "children_policy",
      keywordsEn: [
        "children",
        "kids",
        "child",
        "family",
        "baby",
        "extra bed",
      ],
      keywordsMk: [
        "деца",
        "дете",
        "бебе",
        "фамилија",
        "дополнителен кревет",
      ],
      textEn:
        "Families with children are welcome.\n" +
        "For the most suitable accommodation option, please send us the number of adults, number of children and their ages.",
      textMk:
        "Семејства со деца се добредојдени.\n" +
        "За да ви предложиме најсоодветна опција, испратете ни број на возрасни, број на деца и нивна возраст.",
    },

    {
      id: "baby_crib",
      keywordsEn: ["baby crib", "crib", "cot", "baby bed"],
      keywordsMk: ["бебешко креветче", "креветче", "детско креветче"],
      textEn:
        "A baby crib is available on request, depending on availability.",
      textMk:
        "Бебешко креветче е достапно по барање, зависно од расположливоста.",
    },

    {
      id: "internal_phone",
      keywordsEn: [
        "internal phone",
        "internal number",
        "from room",
        "call from room",
        "call reception from room",
        "room phone",
        "hotel phone",
        "how to call reception",
        "how to call restaurant",
        "how to call spa",
        "extension",
        "extensions",
        "dial reception",
        "dial restaurant",
        "dial spa",
        "order from room",
        "room service phone",
      ],
      keywordsMk: [
        "внатрешен телефон",
        "внатрешен број",
        "од соба",
        "како да се јавам од соба",
        "како да ја добијам рецепција",
        "како да се јавам на ресторан",
        "како да се јавам на спа",
        "телефон во соба",
        "број од соба",
        "локал",
        "екстензија",
        "како да нарачам од соба",
        "како да се јавам на рецепција",
        "како да се јавам на кујна",
      ],
      textEn:
        "From your room you can call directly:\n\n" +
        "– Reception: 0\n" +
        "– Restaurant: 501\n" +
        "– Spa center: 502\n" +
        "– Pool: 503\n" +
        "– Kitchen: 504\n\n" +
        "If you need anything, feel free to contact us 😊",
      textMk:
        "Од вашата соба можете директно да се јавите:\n\n" +
        "– Рецепција: 0\n" +
        "– Ресторан: 501\n" +
        "– СПА центар: 502\n" +
        "– Базен: 503\n" +
        "– Кујна: 504\n\n" +
        "Доколку ви треба нешто, слободно обратете се 😊",
    },
  ],
};

function getFaqReply(message, language = "en") {
  if (!message) return null;

  const normalizedMessage = message.toLowerCase().trim();

  const matchedFaq = hotelKnowledge.faq.find((item) => {
    if (item.id === normalizedMessage) return true;

    const keywords =
      language === "mk" ? item.keywordsMk || [] : item.keywordsEn || [];

    return keywords.some((keyword) => normalizedMessage.includes(keyword));
  });

  if (!matchedFaq) return null;

  return {
    id: matchedFaq.id,
    text: language === "mk" ? matchedFaq.textMk : matchedFaq.textEn,
    triggersInquiryFlow: Boolean(matchedFaq.triggersInquiryFlow),
  };
}

export { hotelKnowledge, getFaqReply };

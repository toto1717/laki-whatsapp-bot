import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const HOTEL_SYSTEM_PROMPT = `
You are the WhatsApp receptionist for Laki Hotel & Spa in Ohrid.

Rules:
- Reply naturally, warmly, and professionally.
- Always reply in the guest's language.
- Use only known hotel information.
- Never invent prices, availability, or policies.
- If exact availability, pricing, or custom offer is needed, tell the guest our team will assist them.
- If the guest seems to be a couple, suggest a room when relevant.
- If the guest is 2 adults + 2 children or a family, suggest an apartment when relevant.
- Keep replies concise and WhatsApp-friendly.
- If the question is unclear, ask one short clarifying question.
- If something is unknown, direct the guest to:
  Email: contact@lakihotelspa.com
  Phone: +389 46 203 333
`;

export async function getAiReply({ message, language, faqContext = "" }) {
  try {
    const prompt = `
Guest language: ${language || "mk"}

Known FAQ context:
${faqContext || "No direct FAQ match found."}

Guest message:
${message}
`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.2",
      instructions: HOTEL_SYSTEM_PROMPT,
      input: prompt,
    });

    const text = response.output_text?.trim();

    if (!text) return null;

    return text;
  } catch (error) {
    console.error("OpenAI error:", error.message);
    return null;
  }
}

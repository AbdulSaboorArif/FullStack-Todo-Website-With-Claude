import type { Citation, Message } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export type ChatResponse = {
  answer: string;
  citations?: Citation[];
  tag?: string;
};

/**
 * Send a question to the FastAPI backend.
 *
 * Expected backend contract (POST {API_URL}/api/chat):
 *   request:  { "question": string, "history": [{ "role", "content" }] }
 *   response: { "answer": string, "citations"?: [{ "title", "detail"?, "icon"? }], "tag"?: string }
 *
 * Override the base URL with NEXT_PUBLIC_API_URL.
 */
export async function askQuestion(
  question: string,
  history: Message[],
): Promise<ChatResponse> {
  if (USE_MOCK) {
    await delay(900);
    return mockResponse(question);
  }

  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      history: history.map(({ role, content }) => ({ role, content })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }

  const data = await response.json();
  return {
    answer: data.answer ?? data.response ?? "",
    citations: data.citations ?? [],
    tag: data.tag,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mockResponse(question: string): ChatResponse {
  return {
    answer:
      `Based on the approved Shamail sources, your question — **"${question}"** — relates to the well-documented character and conduct of the Prophet ﷺ.\n\nHere are key characteristics highlighted in the verified corpus:\n\n- **Profound Humility:** He would mend his own shoes, patch his garments, and assist his household in daily chores, never elevating himself above his companions in physical labor.\n\n- **Equanimity in Interaction:** He gave his full attention to whomever he spoke with, turning his entire body toward them, ensuring every individual felt they were the most important person to him.\n\n- **Generosity and Restraint:** He was known to never say "no" to a request if he had the means to fulfill it, yet he lived a life of deliberate simplicity.\n\n> His character was repeatedly described by Aisha (RA) as "the Quran walking on earth," embodying its injunctions perfectly.\n\n_This is a preview response. Connect the FastAPI backend to receive answers grounded in the full Seerah corpus._`,
    citations: [
      {
        title: "Ash-Shama'il Al-Muhammadiyah",
        detail: "Entry #42 • Imam Tirmidhi's collection on the Prophet's character ﷺ.",
        icon: "menu_book",
      },
      {
        title: "Seerah Ibn Hisham",
        detail: "Vol 1, Sections detailing conduct and daily life.",
        icon: "book",
      },
    ],
    tag: "Shamail",
  };
}

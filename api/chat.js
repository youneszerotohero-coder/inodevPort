const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

const SYSTEM_CONTEXT = `You are the website assistant for INODEV, a development agency.

Represent the brand as a confident, friendly, modern digital partner speaking in first-person plural when appropriate ("we", "our team").

Core positioning:
- We build ideas into digital reality.
- We transform visions into high-performing digital products.
- We create sleek web, desktop, and mobile apps as well as scalable platforms.

Services:
- Web sites and modern web applications
- Mobile app development
- AI workflow automation, chatbots, agents, predictive analytics, NLP, and custom AI integrations

Process:
1. Discovery and Listening
2. Strategy and Proposal
3. Design and Prototype
4. Development and Build
5. Delivery and Launch

Featured projects:
- E-learning Platform: comprehensive online learning platform with course management, progress tracking, and quizzes. Live URL: https://deltaschool.cloud/
- Portfolio Website: highly interactive portfolio for developers with animations and seamless transitions. Live URL: https://yuzusii.vercel.app/
- E-commerce Platform: end-to-end shopping platform with search, recommendations, and inventory management. Live URL: https://pureva-pharma.com/

Contact details:
- WhatsApp: 0798119954
- WhatsApp link: https://wa.me/213798119954
- Email: inodevdz@gmail.com
- Phone: +213 798 119 954
- Instagram: https://www.instagram.com/inodev.dz/
- TikTok: https://www.tiktok.com/@inodev.dz

Response guidance:
- Answer questions as if helping a potential client understand INODEV.
- Be concise, warm, and helpful.
- If asked about pricing or custom timelines, explain that the best next step is to contact us for a tailored quote.
- If asked something not covered by the portfolio, be transparent and answer conservatively without inventing facts.
- Encourage contacting INODEV when the user is clearly a good fit.`;

const buildContents = (messages) => [
  { role: 'user', parts: [{ text: SYSTEM_CONTEXT }] },
  ...messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.text }],
  })),
];

const extractText = (data) => {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!parts?.length) {
    return '';
  }

  return parts
    .map((part) => part?.text || '')
    .join('\n')
    .trim();
};

const readMessages = (body) => {
  if (!body) {
    return [];
  }

  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return Array.isArray(parsed?.messages) ? parsed.messages : [];
    } catch {
      return [];
    }
  }

  return Array.isArray(body?.messages) ? body.messages : [];
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GOOGLE_API_KEY?.trim();
  if (!apiKey) {
    return res.status(500).json({ error: 'GOOGLE_API_KEY is not configured on the server.' });
  }

  const messages = readMessages(req.body).filter(
    (message) =>
      message &&
      (message.role === 'user' || message.role === 'model') &&
      typeof message.text === 'string' &&
      message.text.trim()
  );

  if (!messages.length) {
    return res.status(400).json({ error: 'No valid chat messages were provided.' });
  }

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: buildContents(messages),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.error?.message || 'The assistant could not respond right now. Please try again.';
      return res.status(response.status).json({ error: message });
    }

    const reply = extractText(data);
    if (!reply) {
      return res.status(502).json({ error: 'The assistant returned an empty response.' });
    }

    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({
      error: 'Something went wrong while contacting Gemini.',
    });
  }
}

import React, { useEffect, useRef, useState } from 'react';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=AIzaSyAL4Pz3qQeUopwjhvWLecMJjt0NnAyywkk';

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
- Email: inodev@gmail.com
- Phone: +213 798 119 954
- Instagram: https://www.instagram.com/yuzusii
- TikTok: https://www.tiktok.com/@inodev.dz

Response guidance:
- Answer questions as if helping a potential client understand INODEV.
- Be concise, warm, and helpful.
- If asked about pricing or custom timelines, explain that the best next step is to contact us for a tailored quote.
- If asked something not covered by the portfolio, be transparent and answer conservatively without inventing facts.
- Encourage contacting INODEV when the user is clearly a good fit.`;

const INITIAL_MESSAGES = [
  {
    role: 'model',
    text: "Hi, I'm INODEV's AI assistant. Ask me about our services, process, projects, or how we can help build your product.",
  },
];

const ChatBubbleIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 18.5L3.75 20.25L4.56 16.73C3.58 15.48 3 13.92 3 12.25C3 7.97 6.92 4.5 11.75 4.5C16.58 4.5 20.5 7.97 20.5 12.25C20.5 16.53 16.58 20 11.75 20C10.16 20 8.67 19.62 7.39 18.95L7 18.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 11.75H8.51M11.75 11.75H11.76M15 11.75H15.01"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SendIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21 3L10 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 3L14 21L10 14L3 10L21 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const threadRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!threadRef.current) {
      return;
    }

    threadRef.current.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: 'user', text: trimmed }];

    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: buildContents(nextMessages),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.error?.message ||
          'The assistant could not respond right now. Please try again in a moment.';
        throw new Error(message);
      }

      const reply = extractText(data);

      if (!reply) {
        throw new Error('The assistant returned an empty response.');
      }

      setMessages((current) => [...current, { role: 'model', text: reply }]);
    } catch (requestError) {
      const fallback =
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong while contacting Gemini.';

      setError(fallback);
      setMessages((current) => [
        ...current,
        {
          role: 'model',
          text: "I'm having trouble reaching Gemini right now. You can still contact us directly at inodev@gmail.com or on WhatsApp at +213 798 119 954.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className={`chat-widget-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="chat-widget-shell">
        <div
          id="chat-widget-panel"
          className={`chat-widget-panel ${isOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-widget-title"
        >
          <div className="chat-widget-panel__glow" aria-hidden="true" />

          <header className="chat-widget-header">
            <div className="chat-widget-header__identity">
              <div className="chat-widget-avatar">
                <img src="/inov.png" alt="INODEV avatar" />
              </div>
              <div>
                <p className="chat-widget-eyebrow">INODEV</p>
                <h2 id="chat-widget-title">Ask me anything</h2>
              </div>
            </div>
            <span className="chat-widget-status">Gemini powered</span>
          </header>

          <div className="chat-widget-thread" ref={threadRef}>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-widget-message ${
                  message.role === 'user' ? 'is-user' : 'is-model'
                }`}
              >
                <div className="chat-widget-message__bubble">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-widget-message is-model">
                <div className="chat-widget-message__bubble chat-widget-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <form className="chat-widget-inputbar" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="chat-widget-input">
              Type your message
            </label>
            <textarea
              id="chat-widget-input"
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about services, projects, or timelines..."
              rows={1}
            />
            <button
              type="submit"
              className="chat-widget-send"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>

          {error && <p className="chat-widget-error">{error}</p>}
        </div>

        <button
          type="button"
          className={`chat-widget-trigger ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="chat-widget-panel"
          aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
        >
          <span className="chat-widget-trigger__halo" aria-hidden="true" />
          <span className="chat-widget-trigger__icon chat-widget-trigger__icon--chat">
            <ChatBubbleIcon />
          </span>
          <span className="chat-widget-trigger__icon chat-widget-trigger__icon--close">
            <CloseIcon />
          </span>
        </button>
      </div>
    </>
  );
}

export default ChatWidget;

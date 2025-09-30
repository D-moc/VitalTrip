import React, { useState } from "react";
import "./Chatbot.css";
import logo from "../../assets/logo.png"; // VitalTrip logo

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m Vital, your travel assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Knowledge base (FAQs)
  const knowledgeBase = [
    {
      q: ["hello", "hi", "hey"],
      a: "Hello! 👋 How can I assist you with your travel today?",
    },
    {
      q: ["services", "help", "what can you do"],
      a: "I can help you explore destinations, suggest trip itineraries, show blogs, and guide you with services like hotels, flights, and health hubs.",
    },
    {
      q: ["trip", "plan", "itinerary"],
      a: "You can use the **Plan Your Trip** button on the homepage to generate a customized itinerary. Just enter city, days, travellers, and budget!",
    },
    {
      q: ["explore", "hidden gems", "places"],
      a: "Check out the **Explore section** 🏞️ to discover hidden gems of Maharashtra like Ajoba Fort, Rajmachi, Kaas Plateau, and more.",
    },
    {
      q: ["contact", "query", "email"],
      a: "You can send us a query through the **Contact form** in the footer, and we’ll respond via email 📧.",
    },
    {
      q: ["bye", "goodbye", "see you"],
      a: "Goodbye! 👋 Have a great day and safe travels with VitalTrip.",
    },
  ];

  const handleSend = (message = input) => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMsg]);

    // Bot response logic
    const lowerInput = message.toLowerCase();
    let botReply = "🤖 Sorry, I’m still learning! Try asking about services, trips, or contact.";

    for (let item of knowledgeBase) {
      if (item.q.some((keyword) => lowerInput.includes(keyword))) {
        botReply = item.a;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 700);

    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      {!isOpen && (
        <div
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          title="Chat with Vital"
        >
          V
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-left">
              <img src={logo} alt="VitalTrip" className="chatbot-logo" />
              <span>Vital – Your Travel Assistant</span>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {/* Chat Body */}
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Footer Input */}
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>

          {/* Quick Action Buttons */}
          <div className="chatbot-quick">
            <button onClick={() => handleSend("Plan a trip")}>✈️ Plan Trip</button>
            <button onClick={() => handleSend("Explore places")}>🏞 Explore</button>
            <button onClick={() => handleSend("Contact support")}>📞 Contact</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ThemeToggle from "./ThemeToggle";
import { Send, SendHorizontal  } from "lucide-react";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m Ravi AI Assistant . Ask me anything about his works." },
    { sender: "bot", text: "You can ask questions like - " },
    { sender: "bot", text: "What are Ravi’s technical skills?" },
    { sender: "bot", text: "Can you tell me about Ravi's projects?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://portfolio-chatbot-backend-a1xj.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Could not get response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex gap-2 items-center">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <div className="flex-1 flex justify-end">
            <ThemeToggle />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="p-4 h-[60vh] overflow-y-auto space-y-3 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && (
          <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Typing...
          </div>
        )}
      </div>

      <div className="flex px-4 py-2  border-gray-300 dark:border-gray-600">
        <input
          
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-4 py-3 mr-2 rounded-3xl flex-1 bg-transparent outline-none dark:text-white border border-gray-300 dark:border-gray-600"
          placeholder="Type your question and press Enter"
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-3xl bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Send  />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;

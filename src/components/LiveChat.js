import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, addRandomMessage } from "../utils/chatSlice";

const LiveChat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => dispatch(addRandomMessage()), 2000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const sendMessage = () => {
    if (!input.trim()) return;
    dispatch(
      addMessage({
        id: `${Date.now()}`,
        name: "You",
        message: input.trim(),
      })
    );
    setInput("");
  };

  return (
    <section className="mt-4 rounded-xl border border-gray-300 dark:border-gray-700">
      <div className="h-72 overflow-y-auto p-3">
        {messages.map((chat) => (
          <p key={chat.id} className="mb-1 text-sm">
            <span className="font-semibold">{chat.name}: </span>
            {chat.message}
          </p>
        ))}
      </div>
      <div className="flex gap-2 border-t border-gray-300 p-2 dark:border-gray-700">
        <input
          className="flex-1 rounded-lg border border-gray-400 bg-transparent px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white">
          Send
        </button>
      </div>
    </section>
  );
};

export default LiveChat;

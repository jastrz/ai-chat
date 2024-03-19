import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessages";

const MessagesContainer = () => {
  const containerRef = useRef();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="overflow-y-auto mb-4 mt-4 rounded-md no-scrollbar"
      ref={containerRef}
    >
      <ChatMessages messages={messages} />
    </div>
  );
};

export default MessagesContainer;

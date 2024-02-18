import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const ChatMessages = ({ messages }) => {
  return (
    <div
      style={{
        maxHeight: "calc(100vh - 312px)",
      }}
    >
      <div
        style={{
          padding: "10px 10px",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="mb-4 text-sm">
            <Message
              username={message.username}
              content={message.content}
              type={message.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function MessagesContainer() {
  const containerRef = useRef();
  const history = useSelector((state) => state.chat.history);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [history]);

  return (
    <div class="overflow-y-auto mb-4 " ref={containerRef}>
      <ChatMessages messages={history} />
    </div>
  );
}

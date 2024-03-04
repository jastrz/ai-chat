import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessages";

const MessagesContainer = () => {
  const containerRef = useRef();
  const history = useSelector((state) => state.chat.history);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [history]);

  return (
    <div
      className="overflow-y-auto mb-4 bg-white rounded-md no-scrollbar"
      ref={containerRef}
    >
      <ChatMessages messages={history} />
    </div>
  );
};

export default MessagesContainer;

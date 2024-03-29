import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessages";
import { Typography } from "@material-tailwind/react";
import Animation from "components/Common/Animation";
import { easings } from "@react-spring/web";

const HelloThere = () => {
  const animationConfig = {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
    config: {
      duration: 500,
      easing: easings.easeOutCirc,
    },
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Animation animationConfig={animationConfig}>
        <Typography variant="lead">Hello there! How can I help you?</Typography>
      </Animation>
    </div>
  );
};

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
      <div
        style={{
          height: "calc(100vh - 265px)",
        }}
      >
        {messages.length > 0 ? (
          <ChatMessages messages={messages} />
        ) : (
          <HelloThere />
        )}
      </div>
    </div>
  );
};

export default MessagesContainer;

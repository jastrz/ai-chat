import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection/socketConnection";
import ChatHistoryPanel from "./ChatHistoryPanel";

const Chat = () => {
  useAuthGuard();
  const [isHistoryExpanded, setisHistoryExpanded] = useState(false);

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  const toggleHistory = () => {
    setisHistoryExpanded(!isHistoryExpanded);
  };

  return (
    <>
      <div className="flex flex-row">
        <ChatHistoryPanel isExpanded={isHistoryExpanded} />
        <div className="w-full relative">
          <div className="absolute top-2 left-2">
            <Button
              size="sm"
              className="drop-shadow-xl"
              variant=""
              onClick={toggleHistory}
              style={{ zIndex: "1" }}
            >
              {isHistoryExpanded ? "<" : ">"}
            </Button>
          </div>

          <MessagesContainer />
          <MessageInput />
        </div>
      </div>
    </>
  );
};

export default Chat;

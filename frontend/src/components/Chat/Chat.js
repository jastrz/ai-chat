import React, { useState } from "react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection/socketConnection";
import ChatHistoryPanel from "./History/ChatHistoryPanel";
import ChatHistoryPanelExpandControl from "./History/ChatHistoryPanelControl";
import Gallery from "components/Gallery";

const Chat = () => {
  useAuthGuard();
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  const toggleHistory = () => {
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  return (
    <>
      <Gallery />
      <div className="flex flex-row">
        <ChatHistoryPanel isExpanded={isHistoryExpanded} />
        <div className="w-full relative">
          <ChatHistoryPanelExpandControl
            toggleHistory={toggleHistory}
            isHistoryExpanded={isHistoryExpanded}
          />

          <MessagesContainer />
          <MessageInput />
        </div>
      </div>
    </>
  );
};

export default Chat;

import React from "react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection/socketConnection";
import ChatHistoryPanel from "./History/ChatHistoryPanel";
import Gallery from "components/Gallery";

const Chat = () => {
  useAuthGuard();

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return (
    <>
      <Gallery />
      <div className="flex flex-row">
        <ChatHistoryPanel />
        <div className="w-full">
          <MessagesContainer />
          <MessageInput />
        </div>
      </div>
    </>
  );
};

export default Chat;

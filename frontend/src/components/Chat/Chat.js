import React from "react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection/socketConnection";
import ChatHistoryPanel from "./History/ChatHistoryPanel";
import Gallery from "components/Gallery";
import { useSelector } from "react-redux";

const Chat = () => {
  useAuthGuard();

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData.token) {
      connectWithSocketServer(userData.token);
    }
  }, [userData]);

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

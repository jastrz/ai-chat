import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection";

const Chat = () => {
  useAuthGuard();

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return (
    <>
      <Card>
        <CardBody className="bg-gray-50">
          <MessagesContainer />
          <MessageInput />
        </CardBody>
      </Card>
    </>
  );
};

export default Chat;

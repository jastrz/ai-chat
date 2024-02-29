import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";

const Chat = () => (
  <>
    <Card>
      <CardBody className="bg-gray-50">
        <MessagesContainer />
        <MessageInput />
      </CardBody>
    </Card>
  </>
);

export default Chat;

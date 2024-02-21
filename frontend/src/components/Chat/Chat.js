import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";

const Chat = () => (
  <>
    <Card>
      <CardBody>
        <MessagesContainer />
        <MessageInput />
      </CardBody>
    </Card>
  </>
);

export default Chat;

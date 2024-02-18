import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";

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

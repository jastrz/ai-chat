import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection/socketConnection";
import ChatHistory from "./ChatHistory";
import { getHistoryList } from "api/historyApi";
import { useSelector } from "react-redux";

const Chat = () => {
  useAuthGuard();
  const { username } = useSelector((state) => state.auth.userData);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  useEffect(() => {
    console.log(username);
    const fetchHistoryIds = async () => {
      const history = await getHistoryList(username);
      console.log(history);
      setHistory(history);
    };
    console.log("fetchin");
    fetchHistoryIds(username);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/4">
          <ChatHistory history={history} />
        </div>
        <div className="w-3/4">
          <Card>
            <CardBody className="bg-gray-50">
              <MessagesContainer />
              <MessageInput />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Chat;

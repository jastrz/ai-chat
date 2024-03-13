import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput/MessageInput";
import { useAuthGuard } from "common/useAuthGuard";
import { useEffect } from "react";
import { connectWithSocketServer } from "socketConnection/socketConnection";
import ChatHistory from "./ChatHistory";
import { getHistoryList } from "api/historyApi";
import { useDispatch, useSelector } from "react-redux";
import { setHistoryList } from "store/chatSlice";

const Chat = () => {
  useAuthGuard();
  const { username } = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  useEffect(() => {
    console.log(username);
    const fetchHistoryIds = async () => {
      const historyList = await getHistoryList(username);
      if (historyList && historyList.length > 0) {
        dispatch(setHistoryList(historyList));
      }
    };

    fetchHistoryIds(username);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/4">
          <ChatHistory />
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

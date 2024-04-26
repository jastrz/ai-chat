import React, { useEffect, useRef, createContext, useState } from "react";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessages";
import { Typography } from "@material-tailwind/react";
import Animation from "components/Common/Animation";
import { easings } from "@react-spring/web";

const HelloThere = () => {
  const animationConfig = {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
    config: {
      duration: 500,
      easing: easings.easeOutCirc,
    },
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Animation animationConfig={animationConfig}>
        <Typography variant="lead">Hello there! How can I help you?</Typography>
      </Animation>
    </div>
  );
};

export const MessagesContext = createContext(null);

const MessagesContainer = () => {
  const containerRef = useRef();
  const messages = useSelector((state) => state.chat.messages);
  const [updatedMessages, setUpdatedMessages] = useState(messages);
  const [latestMessageGuid, setLatestMessageGuid] = useState("");

  const messageRefs = useRef([]);

  useEffect(() => {
    let sortedMsgs = insertAndSortResponses(messages);

    let msgs = sortedMsgs.map((message, id) => {
      if (id > 0 && sortedMsgs[id - 1].username === message.username) {
        return { ...message, concat: true };
      }
      return message;
    });

    setUpdatedMessages(msgs);
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) return;

    let msgs = [...messages].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    const latestMessage = msgs[0];

    if (latestMessage.guid !== latestMessageGuid) {
      setLatestMessageGuid(latestMessage.guid);
    }
  }, [updatedMessages, messages]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newestMessageIndex = updatedMessages.findIndex(
        (msg) => msg.guid === latestMessageGuid
      );

      let totalHeight = 0;
      messageRefs.current.slice(0, newestMessageIndex).forEach((elem) => {
        totalHeight += elem ? elem.clientHeight : 0;
      });

      containerRef.current.scrollTo({
        top: totalHeight,
        behavior: "smooth",
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [latestMessageGuid]);

  // todo: probably move to backend or perhaps enable display modes for frontend
  function insertAndSortResponses(msgs) {
    // Create a map for quick ID to message lookup
    const idToMessageMap = new Map(msgs.map((msg) => [msg.guid, msg]));

    // Set to track IDs of responses to avoid duplicating them in the main array
    const responseIds = new Set(msgs.flatMap((msg) => msg.responses));

    // Filter out responses from the main list
    let parentMsgs = msgs.filter((msg) => !responseIds.has(msg.guid));

    let reorderedMsgs = [];

    parentMsgs.forEach((message) => {
      // Add the main message to the reordered list
      reorderedMsgs.push(message);

      // Check if there are responses and assign them
      if (message.responses && message.responses.length > 0) {
        let responses = message.responses.map((id) => idToMessageMap.get(id));
        responses.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        reorderedMsgs.push(...responses);
      }
    });

    return reorderedMsgs;
  }

  return (
    <div
      className="overflow-y-auto mb-4 mt-4 rounded-md no-scrollbar"
      ref={containerRef}
    >
      <MessagesContext.Provider value={messageRefs}>
        <div
          style={{
            height: "calc(100vh - 265px)",
          }}
        >
          {messages.length > 0 ? (
            <ChatMessages messages={updatedMessages} />
          ) : (
            <HelloThere />
          )}
        </div>
      </MessagesContext.Provider>
    </div>
  );
};

export default MessagesContainer;

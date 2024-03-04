import { IconButton, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import ImageContent from "./ImageContent";
import TextContent from "./TextContent";
import { cancelPrompt } from "socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "store/chatSlice";
import Animation from "components/Common/Animation";

const UsernameIndicator = ({ username }) => {
  return (
    <div className="shadow-xl rounded-xl mb-2">
      <Typography color="white" style={{ fontSize: "0.7rem" }}>
        {username}
      </Typography>
    </div>
  );
};

const Contents = ({ message, backgroundColor, sameUserAsPrevious }) => {
  const TextContents = message.content
    .filter(({ type }) => type !== "image")
    .map(({ data }, index) => <TextContent key={index} data={data} />);

  const ImageContents = message.content
    .filter(({ type }) => type === "image")
    .map(({ data }, index) => <ImageContent key={index} data={data} />);

  return (
    <>
      <div className={`${backgroundColor} shadow-xl rounded-2xl px-4 py-2`}>
        <div className="flex items-center">
          {!sameUserAsPrevious && (
            <UsernameIndicator username={message.username} />
          )}
        </div>
        <div>{TextContents}</div>
        <div className="flex flex-wrap gap-x-4">{ImageContents}</div>
      </div>
    </>
  );
};

const Message = ({ message }) => {
  const { history } = useSelector((state) => state.chat);
  const [sameUserAsPrevious, setSameUserAsPrevious] = useState(false);

  useEffect(() => {
    const msgIndex = history.findIndex((msg) => msg === message);
    if (msgIndex > 1) {
      setSameUserAsPrevious(
        history[msgIndex - 1].username === message.username
      );
    }
  }, []);

  const animationConfig = {
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: -50 },
  };

  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.chat);
  const isUser = message.username === "User";
  const backgroundColor = isUser
    ? "bg-gradient-to-r from-red-900 to-red-700"
    : "bg-gradient-to-r from-blue-gray-900 to-blue-gray-500";

  const getPromptStatus = () => {
    const prompt = prompts.find((prompt) => prompt.guid === message.promptGuid);
    if (prompt) {
      console.log(prompt.status);
      return prompt.status;
    }
  };

  const handleInterrupt = () => {
    cancelPrompt(message.promptGuid);
    dispatch(removeMessage(message.guid));
  };

  return (
    <Animation animationConfig={animationConfig}>
      <div
        className={`flex items-center ${isUser ? "justify-end" : ""} ${
          sameUserAsPrevious ? "mt-2" : "mt-4"
        }`}
      >
        <Contents
          message={message}
          backgroundColor={backgroundColor}
          sameUserAsPrevious={sameUserAsPrevious}
        />
        {isUser && getPromptStatus() !== "completed" && (
          <IconButton onClick={handleInterrupt} size="sm" variant="outlined">
            {getPromptStatus() === "pending" ? (
              <i className="fas fa-xmark" />
            ) : (
              <i className="fas fa-square" />
            )}
          </IconButton>
        )}
      </div>
    </Animation>
  );
};

export default Message;

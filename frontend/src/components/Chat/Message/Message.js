import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";

import ImageContent from "./ImageContent";
import TextContent from "./TextContent";
import { cancelPrompt } from "../../../socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "../../../store/chatSlice";

const UsernameIndicator = ({ username }) => {
  return (
    <span className="shadow-md text-xs font-bold mx-2 rounded-md p-1/2">
      <Typography variant="small">{username}</Typography>
    </span>
  );
};

const Contents = ({ content, backgroundColor }) => {
  const TextContents = content
    .filter(({ type }) => type !== "image")
    .map(({ data }, index) => <TextContent key={index} data={data} />);

  const ImageContents = content
    .filter(({ type }) => type === "image")
    .map(({ data }, index) => <ImageContent key={index} data={data} />);

  return (
    <div className={`${backgroundColor} shadow-xl rounded-2xl px-4 py-2`}>
      <div className="">{TextContents}</div>
      <div className="flex flex-wrap gap-x-4">{ImageContents}</div>
    </div>
  );
};

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.chat);
  const isUser = message.username === "User";
  const backgroundColor = isUser ? "bg-blue-50" : "bg-blue-200";

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
    <>
      <div className={`flex items-center ${isUser ? "justify-end" : ""}`}>
        <UsernameIndicator username={message.username} />
        <Contents content={message.content} backgroundColor={backgroundColor} />
        {isUser && getPromptStatus() !== "completed" && (
          <IconButton onClick={handleInterrupt} size="sm">
            <i className="fas fa-xmark" />
          </IconButton>
        )}
      </div>
    </>
  );
};

export default Message;

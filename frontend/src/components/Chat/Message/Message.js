import { Typography } from "@material-tailwind/react";
import React from "react";

import ImageContent from "./ImageContent";
import TextContent from "./TextContent";

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

const Message = ({ username, content }) => {
  const isUser = username === "me";
  const backgroundColor = isUser ? "bg-blue-50" : "bg-blue-200";

  return (
    <div className={`flex items-center ${isUser ? "justify-end" : ""}`}>
      <UsernameIndicator username={username} />
      <Contents content={content} backgroundColor={backgroundColor} />
    </div>
  );
};

export default Message;

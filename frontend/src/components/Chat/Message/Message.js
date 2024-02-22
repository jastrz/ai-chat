import { Typography } from "@material-tailwind/react";
import React from "react";

import ImageContent from "./ImageContent";
import TextContent from "./TextContent";

const Message = ({ username, content }) => {
  const isUser = username === "me";
  const backgroundColor = isUser ? "bg-blue-50" : "bg-blue-200";

  const TextContents = content
    .filter(({ type }) => type !== "image")
    .map(({ data, type }, index) => <TextContent key={index} data={data} />);

  const ImageContents = content
    .filter(({ type }) => type === "image")
    .map(({ data, type }, index) => <ImageContent key={index} data={data} />);

  return (
    <div className={`flex items-center ${isUser ? "justify-end" : ""}`}>
      <span className="shadow-md uppercase text-xs font-bold mr-3">
        <Typography variant="small">{username}</Typography>
      </span>
      <div className={`${backgroundColor} shadow-lg rounded-lg px-4 py-2`}>
        <div className="">{TextContents}</div>
        <div className="flex flex-wrap gap-2">{ImageContents}</div>
      </div>
    </div>
  );
};

export default Message;

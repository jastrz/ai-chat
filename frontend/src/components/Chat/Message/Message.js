import { Typography } from "@material-tailwind/react";
import React from "react";

import ImageContent from "./ImageContent";
import TextContent from "./TextContent";

const Message = ({ username, content }) => {
  const isUser = username === "me";
  const backgroundColor = isUser ? "bg-blue-50" : "bg-blue-200";

  const MessageContents = content.map(({ data, type }, index) => {
    const isImage = type === "image";

    return isImage ? (
      <ImageContent index={index} data={data} />
    ) : (
      <TextContent index={index} data={data} />
    );
  });

  return (
    <div className={`flex items-center  ${isUser ? "justify-end" : ""}`}>
      <span className="shadow-md uppercase text-xs font-bold mr-3">
        <Typography key={username} variant="small">
          {username}
        </Typography>
      </span>
      <div className={`${backgroundColor} shadow-lg rounded-lg px-4 py-2`}>
        {MessageContents}
      </div>
    </div>
  );
};

export default Message;

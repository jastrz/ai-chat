import { Typography } from "@material-tailwind/react";
import React from "react";

const Message = ({ username, content, type }) => {
  const isUser = username === "me";
  const isImage = type === "image";

  const messageStyle = {
    shadow: "shadow-lg",
    borderRadius: "rounded-lg",
    padding: "px-4 py-2",
    backgroundColor: isUser ? "bg-blue-50" : "bg-blue-200",
    whiteSpace: "pre-wrap",
    width: "w-auto",
  };

  const MessageContent = isImage ? (
    <img
      className={`max-h-96 ${messageStyle.shadow} ${messageStyle.borderRadius} ${messageStyle.width}`}
      src={`data:image/png;base64, ${content}`}
    />
  ) : (
    <div
      className={`${messageStyle.shadow} ${messageStyle.borderRadius} ${messageStyle.padding} ${messageStyle.backgroundColor}`}
      style={{ whiteSpace: messageStyle.whiteSpace }}
    >
      <Typography variant="small">{content}</Typography>
    </div>
  );

  return (
    <div className={`flex items-center ${isUser ? "justify-end" : ""}`}>
      <span className="shadow-md uppercase text-xs font-bold mr-3">
        <Typography variant="small">{username}</Typography>
      </span>
      {MessageContent}
    </div>
  );
};

export default Message;

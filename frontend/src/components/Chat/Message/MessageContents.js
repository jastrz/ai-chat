import React from "react";
import UsernameIndicator from "./UsernameIndicator";
import ImageContent from "./ImageContent";
import TextContent from "./TextContent";

const MessageContents = ({ message, backgroundColor, sameUserAsPrevious }) => {
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
            <UsernameIndicator
              username={message.username}
              timestamp={message.timestamp}
            />
          )}
        </div>
        <div>{TextContents}</div>
        <div className="flex flex-wrap gap-x-4">{ImageContents}</div>
      </div>
    </>
  );
};

export default MessageContents;

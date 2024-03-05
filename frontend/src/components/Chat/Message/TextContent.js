import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import Typing from "components/Common/Typing/Typing";
import { splitTextContent } from "utils";

const CodeBlock = ({ code }) => {
  return (
    <div
      className="mt-4 mb-4 py-4 px-4 rounded-2xl inline-block leading-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
      }}
    >
      <code style={{ fontSize: "14px" }}>{code}</code>
    </div>
  );
};

const TextContent = ({ index, data }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messages = splitTextContent(data);
    setMessages(messages);
  }, [data, setMessages]);

  return (
    <>
      <div key={index} style={{ whiteSpace: "pre-wrap" }}>
        {messages.map((message, index) => {
          return message.type === "text" ? (
            <Typography key={index} className="text-white" variant="small">
              {message.content}
            </Typography>
          ) : (
            <CodeBlock key={index} code={message.content} />
          );
        })}
        {data.length === 0 && <Typing />}
      </div>
    </>
  );
};

export default TextContent;

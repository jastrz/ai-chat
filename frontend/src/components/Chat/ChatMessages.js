import Message from "./Message/Message";
import { useEffect, useState } from "react";

const ChatMessages = ({ messages }) => {
  const [updatedMessages, setUpdatedMessages] = useState(messages);

  useEffect(() => {
    const msgs = messages.map((message, id) => {
      if (id > 0 && messages[id - 1].username === message.username) {
        return { ...message, concat: true };
      }
      return message;
    });
    setUpdatedMessages(msgs);
  }, [messages]);

  return (
    <div className="px-4 py-2">
      {updatedMessages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

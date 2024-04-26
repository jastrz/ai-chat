import Message from "./Message/Message";
import { useEffect, useContext } from "react";
import { MessagesContext } from "./MessagesContainer";

const ChatMessages = ({ messages }) => {
  const messageRefs = useContext(MessagesContext);

  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, messages.length);
  }, [messages, messageRefs]);

  return (
    <div className="px-4 py-2">
      {messages.map((message, index) => (
        <div ref={(el) => (messageRefs.current[index] = el)}>
          <Message key={index} message={message} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

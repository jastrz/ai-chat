import Message from "./Message/Message";

const ChatMessages = ({ messages }) => {
  return (
    <div className="px-4 py-2">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

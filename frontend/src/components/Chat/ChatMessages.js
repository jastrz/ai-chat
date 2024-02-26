import Message from "./Message/Message";

const ChatMessages = ({ messages }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 290px)",
      }}
    >
      <div
        style={{
          padding: "10px 10px",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="mb-4 text-sm">
            <Message username={message.username} content={message.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;

import Message from "./Message/Message";

const ChatMessages = ({ messages }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 280px)",
      }}
    >
      <div className="px-4">
        {messages.map((message, index) => (
          <>
            <div key={index}>
              <Message message={message} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;

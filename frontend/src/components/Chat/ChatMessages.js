import Message from "./Message/Message";

const ChatMessages = ({ messages }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 265px)",
      }}
    >
      <div className="px-4 py-2">
        {messages.map((message, index) => (
          <>
            <div key={index}>
              <Message key={index} message={message} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;

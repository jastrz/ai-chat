import ChatHistory from "./ChatHistory";

const expandingPanel = {
  width: 0,
  overflow: "hidden",
  transition: "width 0.35s",
};

const ChatHistoryPanel = ({ isExpanded }) => {
  return (
    <div
      className="bg-gray-300"
      style={{ ...expandingPanel, width: isExpanded ? "35%" : "0%" }}
    >
      <ChatHistory />
    </div>
  );
};

export default ChatHistoryPanel;

import ChatHistory from "./ChatHistory";

const expandingPanel = {
  width: 0,
  overflow: "hidden",
  transition: "width 0.35s, min-width 0.35s, max-width 0.35s",
};

const panelExpanded = {
  minWidth: 275,
  maxWidth: 350,
  width: 350,
};

const panelCollapsed = {
  width: 0,
  minWidth: 0,
  maxWidth: 0,
};

const ChatHistoryPanel = ({ isExpanded }) => {
  return (
    <div
      className="bg-gray-100"
      style={{
        ...expandingPanel,
        ...(isExpanded ? panelExpanded : panelCollapsed),
      }}
    >
      <ChatHistory />
    </div>
  );
};

export default ChatHistoryPanel;

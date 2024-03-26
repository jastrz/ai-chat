import { Typography } from "@material-tailwind/react";
import ChatHistory from "./ChatHistory";

const expandingPanel = {
  width: 0,
  overflow: "hidden",
  transition: "width 0.25s, min-width 0.25s, max-width 0.25s",
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
      <div className="flex py-2">
        <Typography
          className="w-full text-center text-lg font-medium"
          style={{ minWidth: "275px" }}
        >
          History
        </Typography>
      </div>
      <ChatHistory />
    </div>
  );
};

export default ChatHistoryPanel;

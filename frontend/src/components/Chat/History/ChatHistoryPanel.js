import { Typography } from "@material-tailwind/react";
import ChatHistory from "./ChatHistory";
import ChatHistoryPanelExpandControl from "./ChatHistoryPanelControl";
import { useState } from "react";

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

const ChatHistoryPanel = () => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const toggleHistory = () => {
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  return (
    <>
      <div className="absolute top-20 left-2 z-20 ">
        <ChatHistoryPanelExpandControl
          toggleHistory={toggleHistory}
          isHistoryExpanded={isHistoryExpanded}
        />
      </div>

      <div
        className="bg-white z-10 absolute md:static max-h-fit shadow-xl rounded-md"
        style={{
          ...expandingPanel,
          ...(isHistoryExpanded ? panelExpanded : panelCollapsed),
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
    </>
  );
};

export default ChatHistoryPanel;

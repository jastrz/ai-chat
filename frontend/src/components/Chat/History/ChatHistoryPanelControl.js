import { Button } from "@material-tailwind/react";

const ChatHistoryPanelExpandControl = ({
  toggleHistory,
  isHistoryExpanded,
}) => {
  return (
    <div className="absolute top-2 left-2">
      <Button
        size="sm"
        className="drop-shadow-xl"
        onClick={toggleHistory}
        style={{ zIndex: "1" }}
      >
        {isHistoryExpanded ? "<" : ">"}
      </Button>
    </div>
  );
};

export default ChatHistoryPanelExpandControl;

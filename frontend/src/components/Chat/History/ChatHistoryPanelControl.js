import { Button } from "@material-tailwind/react";
import { HoverableAnimation } from "components/Common/Animation";

const ChatHistoryPanelExpandControl = ({
  toggleHistory,
  isHistoryExpanded,
}) => {
  const animationConfig = {
    from: { opacity: 1, scale: 1.0 },
    to: { opacity: 0.75, scale: 0.95 },
  };

  return (
    <HoverableAnimation animationConfig={animationConfig}>
      <Button
        size="sm"
        className="drop-shadow-xl"
        onClick={toggleHistory}
        style={{ zIndex: "1" }}
      >
        {isHistoryExpanded ? "<" : ">"}
      </Button>
    </HoverableAnimation>
  );
};

export default ChatHistoryPanelExpandControl;

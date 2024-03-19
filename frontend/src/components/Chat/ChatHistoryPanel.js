import ChatHistory from "./ChatHistory";
import { getHistoryIds } from "actions";
import { useEffect } from "react";

import { useSelector } from "react-redux";

const ChatHistoryPanel = ({ isExpanded }) => {
  const { username } = useSelector((state) => state.auth.userData);

  useEffect(() => {
    getHistoryIds();
  }, []);

  return (
    <div
      className="expanding-panel bg-gray-300"
      style={{ width: isExpanded ? "35%" : "0%" }}
    >
      <ChatHistory />
    </div>
  );
};

export default ChatHistoryPanel;

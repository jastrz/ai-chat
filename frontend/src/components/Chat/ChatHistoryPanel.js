import ChatHistory from "./ChatHistory";
import { getHistoryList } from "api/historyApi";
import { setHistoryList } from "store/chatSlice";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const ChatHistoryPanel = ({ isExpanded }) => {
  const { username } = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(username);
    const fetchHistoryIds = async () => {
      const historyList = await getHistoryList(username);
      if (historyList && historyList.length > 0) {
        dispatch(setHistoryList(historyList));
      }
    };

    fetchHistoryIds(username);
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

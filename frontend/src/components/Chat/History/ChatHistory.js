import { useSelector } from "react-redux";
import { getHistoryIds } from "../../../historyActions";
import { useEffect, useState } from "react";
import ChatHistoryEntry from "./ChatHistoryEntry";

const ChatHistory = () => {
  const { availableHistories, historyId } = useSelector((state) => state.chat);
  const [histories, setHistories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      await getHistoryIds();
      setLoaded(true);
    };

    getHistory();
  }, []);

  useEffect(() => {
    if (availableHistories && availableHistories.length > 0) {
      const sortedHistories = [...availableHistories].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setHistories(sortedHistories);
    }
  }, [availableHistories]);

  return (
    <>
      {loaded && histories.length > 0 && (
        <div className="grid grid-flow-row auto-rows-max gap-y-2 mt-2 px-2 mb-2">
          {histories.map((historyEntry, index) => {
            return (
              <ChatHistoryEntry
                key={index}
                historyId={historyEntry._id}
                timestamp={historyEntry.timestamp}
                active={historyEntry._id === historyId}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChatHistory;

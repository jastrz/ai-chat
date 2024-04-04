import { useSelector } from "react-redux";
import { getHistoryIds } from "../../../historyActions";
import { useEffect, useState } from "react";
import ChatHistoryEntry from "./ChatHistoryEntry";

const ChatHistory = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      await getHistoryIds();
      setDataLoaded(true);
    };

    getHistory();
  }, []);

  const { availableHistories, historyId } = useSelector((state) => state.chat);

  return (
    <>
      {dataLoaded && (
        <div className="grid grid-flow-row auto-rows-max gap-y-2 mt-2 px-2">
          {availableHistories.map((historyEntry, index) => {
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

import { Button } from "@material-tailwind/react";
import { setHistory, removeHistory } from "actions";
import { useSelector } from "react-redux";

const ChatHistoryEntry = ({ historyId }) => {
  const onHistoryEntryClicked = async () => {
    await setHistory(historyId);
  };

  const onRemoveHistoryEntry = async () => {
    await removeHistory(historyId);
  };

  return (
    <>
      <div className="flex">
        <div className="grow">
          <Button
            variant="outlined"
            size="sm"
            className="w-full"
            onClick={async () => await onHistoryEntryClicked()}
          >
            {historyId}
          </Button>
        </div>
        <div className="flex-end">
          <Button
            variant="outlined"
            size="sm"
            onClick={async () => await onRemoveHistoryEntry()}
          >
            <i className="fas fa-trash-alt" />
          </Button>
        </div>
      </div>
    </>
  );
};

const ChatHistory = () => {
  const availableHistories = useSelector(
    (state) => state.chat.availableHistories
  );
  return (
    <>
      <div className="grid grid-flow-row auto-rows-max gap-y-2 mt-2 px-2">
        {availableHistories &&
          availableHistories.map((historyEntry, index) => {
            return (
              <ChatHistoryEntry key={index} historyId={historyEntry._id} />
            );
          })}
      </div>
    </>
  );
};

export default ChatHistory;

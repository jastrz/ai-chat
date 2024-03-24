import { Button } from "@material-tailwind/react";
import { setHistory, removeHistory } from "historyActions";

const ChatHistoryEntry = ({ historyId, active }) => {
  const onHistoryEntryClicked = async () => {
    await setHistory(historyId);
  };

  const onRemoveHistoryEntry = async () => {
    await removeHistory(historyId);
  };

  return (
    <>
      <div className="flex">
        <div className="grow ">
          <Button
            variant="outlined"
            size="sm"
            className={`w-full ${active ? "bg-gray-400" : ""}`}
            onClick={onHistoryEntryClicked}
          >
            {historyId}
          </Button>
        </div>
        <div className="flex-end">
          <Button variant="outlined" size="sm" onClick={onRemoveHistoryEntry}>
            <i className="fas fa-trash-alt" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatHistoryEntry;

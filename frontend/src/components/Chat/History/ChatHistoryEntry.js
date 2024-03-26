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
            size="sm"
            className={`w-full ${active ? "" : "bg-gray-700"} shadow-md`}
            onClick={onHistoryEntryClicked}
          >
            {historyId}
          </Button>
        </div>
        <div className="flex-end px-1">
          <Button
            variant="outlined"
            className="shadow-md"
            size="sm"
            style={{ scale: "0.85" }}
            onClick={onRemoveHistoryEntry}
          >
            <i className="fas fa-trash-alt" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatHistoryEntry;

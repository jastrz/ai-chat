import { Button, Typography } from "@material-tailwind/react";
import { setHistory, removeHistory } from "historyActions";

const ChatHistoryEntry = ({ historyId, timestamp, active }) => {
  const onHistoryEntryClicked = async () => {
    await setHistory(historyId);
  };

  const onRemoveHistoryEntry = async () => {
    await removeHistory(historyId);
  };

  return (
    <>
      <div className="flex">
        <div className="grow min-w-48">
          <Button
            size="sm"
            className={`w-full ${
              active ? "" : "bg-gradient-to-r from-gray-500 to-gray-600"
            } shadow-md ${active ? "" : "hover:to-gray-700"}`}
            onClick={onHistoryEntryClicked}
          >
            <Typography className="tracking-wider text-xs">
              {new Date(timestamp).toLocaleString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Button>
        </div>
        <div className="flex-end px-1">
          <Button
            variant="outlined"
            className="shadow-md"
            size="sm"
            style={{ scale: "0.75" }}
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

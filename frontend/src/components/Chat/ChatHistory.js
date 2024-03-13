import { Button, IconButton } from "@material-tailwind/react";
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
      <Button
        variant="outlined"
        size="sm"
        onClick={async () => await onHistoryEntryClicked()}
      >
        {historyId}
      </Button>
      <IconButton
        variant="outlined"
        size="sm"
        onClick={async () => await onRemoveHistoryEntry()}
      >
        <i className="fas fa-trash-alt" />
      </IconButton>
    </>
  );
};

const ChatHistory = () => {
  const availableHistories = useSelector(
    (state) => state.chat.availableHistories
  );
  console.log(availableHistories);
  return (
    <>
      <div className="grid grid-flow-row auto-rows-max">
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

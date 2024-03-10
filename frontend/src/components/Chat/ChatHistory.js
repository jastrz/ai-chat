import { Button } from "@material-tailwind/react";
const ChatHistoryEntry = ({ historyId }) => {
  const onHistoryEntryClicked = () => {
    console.log(historyId);
  };

  return (
    <>
      <Button variant="outlined" size="sm" onClick={onHistoryEntryClicked}>
        {historyId}
      </Button>
    </>
  );
};

const ChatHistory = ({ history }) => {
  console.log(history);
  return (
    <>
      <div className="grid grid-flow-row auto-rows-max">
        {history &&
          history.map((historyEntry, index) => {
            return <ChatHistoryEntry historyId={historyEntry._id} />;
          })}
      </div>
    </>
  );
};

export default ChatHistory;

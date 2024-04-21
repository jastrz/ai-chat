import Message from "./Message/Message";
import { useEffect, useState } from "react";

const ChatMessages = ({ messages }) => {
  const [updatedMessages, setUpdatedMessages] = useState(messages);

  useEffect(() => {
    let sortedMsgs = insertAndSortResponses(messages);

    let msgs = sortedMsgs.map((message, id) => {
      if (id > 0 && sortedMsgs[id - 1].username === message.username) {
        return { ...message, concat: true };
      }
      return message;
    });

    setUpdatedMessages(msgs);
  }, [messages]);

  function insertAndSortResponses(msgs) {
    // Create a map for quick ID to message lookup
    const idToMessageMap = new Map(msgs.map((msg) => [msg.guid, msg]));

    // Set to track IDs of responses to avoid duplicating them in the main array
    const responseIds = new Set(msgs.flatMap((msg) => msg.responses));
    console.log(responseIds);

    // Filter out responses from the main list
    let parentMsgs = msgs.filter((msg) => !responseIds.has(msg.guid));
    console.log(parentMsgs);

    let reorderedMsgs = [];

    parentMsgs.forEach((message) => {
      // Add the main message to the reordered list
      reorderedMsgs.push(message);

      // Check if there are responses and assign them
      if (message.responses && message.responses.length > 0) {
        let responses = message.responses.map((id) => idToMessageMap.get(id));
        responses.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        reorderedMsgs.push(...responses);
      }
    });

    return reorderedMsgs;
  }

  return (
    <div className="px-4 py-2">
      {updatedMessages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

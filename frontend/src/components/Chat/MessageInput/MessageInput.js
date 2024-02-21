import { Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessageToSend } from "../../../store/chatSlice";
import { sendPromptThroughSocket } from "../../../socketConnection";
import { reset } from "../../../socketConnection";
import MessageInputControls from "./MessageInputControls";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState({
    username: "me",
    content: [],
  });
  const [promptType, setPromptType] = useState("text");

  const onClickSend = () => {
    if (currentMessage.content.length === 0) return;
    dispatch(setMessageToSend(currentMessage));

    const prompt = {
      type: promptType,
      username: currentMessage.username,
      message: currentMessage.content[0].data,
    };

    sendPromptThroughSocket(prompt);
    setCurrentMessage({ username: "me", content: [] });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onClickSend();
    }
  };

  const onTextChanged = (event) => {
    setCurrentMessage({
      username: "me",
      content: [{ data: event.target.value, type: "text" }],
    });
  };

  const onClickReset = () => {
    reset();
  };

  const handleImagePromptCheckbox = () => {
    setPromptType(promptType === "text" ? "image" : "text");
  };

  return (
    <>
      <Textarea
        variant="outlined"
        label="Message..."
        value={
          currentMessage.content.length > 0
            ? currentMessage.content[0].data
            : ""
        } // todo: add input that can handle images
        onKeyDown={handleKeyDown}
        onChange={onTextChanged}
        style={{ width: "100%" }}
      />
      <MessageInputControls
        promptType={promptType === "image"}
        handleImagePromptCheckbox={handleImagePromptCheckbox}
        onClickReset={onClickReset}
        onClickSend={onClickSend}
      />
    </>
  );
};

export default MessageInput;

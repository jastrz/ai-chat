import { Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { sendPrompt, reset } from "socketConnection/sendActions";
import MessageInputControls from "./MessageInputControls";
import { Prompt } from "data/prompt";
import { useSelector } from "react-redux";

const MessageInput = () => {
  const [currentMessage, setCurrentMessage] = useState([]);
  const [promptType, setPromptType] = useState("text");
  const { userData } = useSelector((state) => state.auth);

  const onClickSend = () => {
    if (currentMessage.length === 0) return;
    const prompt = new Prompt(currentMessage[0].data, promptType);
    sendPrompt(prompt);
    setCurrentMessage({ username: userData.username, content: [] });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onClickSend();
    }
  };

  const onTextChanged = (event) => {
    setCurrentMessage([{ data: event.target.value, type: "text" }]);
  };

  const onClickReset = () => {
    reset();
  };

  const handleImagePromptCheckbox = () => {
    setPromptType(promptType === "text" ? "image" : "text");
  };

  return (
    <>
      <div className="px-2">
        <Textarea
          variant="outlined"
          label="Message..."
          value={currentMessage.length > 0 ? currentMessage[0].data : ""} // todo: add input that can handle images
          onKeyDown={handleKeyDown}
          onChange={onTextChanged}
        />
        <MessageInputControls
          promptType={promptType === "image"}
          handleImagePromptCheckbox={handleImagePromptCheckbox}
          onClickReset={onClickReset}
          onClickSend={onClickSend}
        />
      </div>
    </>
  );
};

export default MessageInput;

import { Textarea, Progress } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage, addPrompt } from "store/chatSlice";
import { sendPrompt, reset } from "socketConnection/sendActions";
import MessageInputControls from "./MessageInputControls";
import { getImageGenProgress } from "api/api";
import { Prompt } from "data/prompt";
import { Message } from "data/message";
import { useSelector } from "react-redux";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isImage, setIsImage] = useState(false);
  const [promptType, setPromptType] = useState("text");
  const { userData } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchImageGenProgress = async () => {
  //     const progress = await getImageGenProgress();
  //     setProgress(progress);
  //   };

  //   const interval = setInterval(() => {
  //     if (isImage || progress !== 0) fetchImageGenProgress();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isImage, progress]);

  const onClickSend = () => {
    if (currentMessage.length === 0) return;
    setIsImage(promptType === "image");
    const username = userData.username;
    const userMessage = new Message(username, currentMessage);
    const prompt = new Prompt(userMessage.content[0].data, promptType);
    userMessage.promptGuid = prompt.guid;

    sendPrompt(prompt);

    dispatch(addMessage(userMessage.obj()));
    dispatch(addPrompt(prompt.obj()));
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
        {progress !== 0 && <Progress value={progress} />}
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

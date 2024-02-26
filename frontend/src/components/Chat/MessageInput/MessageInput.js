import { Textarea, Progress } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserMessage } from "../../../store/chatSlice";
import { sendPrompt } from "../../../socketConnection";
import { reset } from "../../../socketConnection";
import MessageInputControls from "./MessageInputControls";
import { getImageGenProgress } from "../../../api";
import { getPrompt } from "../../../promptFactory";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState({
    username: "me",
    content: [],
  });
  const [progress, setProgress] = useState(0);
  const [isImage, setIsImage] = useState(false);
  const [promptType, setPromptType] = useState("text");

  useEffect(() => {
    const fetchImageGenProgress = async () => {
      const progress = await getImageGenProgress();
      setProgress(progress);
    };

    const interval = setInterval(() => {
      if (isImage || progress !== 0) fetchImageGenProgress();
    }, 1000);

    return () => clearInterval(interval);
  }, [isImage, progress]);

  const onClickSend = () => {
    if (currentMessage.content.length === 0) return;
    dispatch(setUserMessage(currentMessage));
    const prompt = getPrompt(promptType, currentMessage.content[0].data);
    setIsImage(promptType === "image");
    sendPrompt(prompt);
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
      />
      {progress !== 0 && <Progress value={progress} />}
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

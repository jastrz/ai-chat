import {
  Button,
  Textarea,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../app/store";
import { sendMessageThroughSocket } from "../socketConnection";
import { Checkbox } from "@material-tailwind/react";
import { reset } from "../socketConnection";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState({
    username: "",
    content: "",
  });
  const [promptType, setPromptType] = useState("text");

  const onClickSend = () => {
    dispatch(sendMessage(currentMessage));
    setCurrentMessage({ username: "", content: "" });

    const prompt = {
      type: promptType,
      username: currentMessage.username,
      message: currentMessage.content,
    };

    console.log(prompt);

    sendMessageThroughSocket(prompt);
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
      content: event.target.value,
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
        value={currentMessage.content}
        onKeyDown={handleKeyDown}
        onChange={onTextChanged}
        style={{ width: "100%" }}
      />
      <div className="columns-2 mt-2">
        <div className="column flex justify-start items-center space-x-4">
          <IconButton onClick={onClickReset}>
            <i className="fas fa-trash-alt" />
          </IconButton>
        </div>
        <div className="column flex justify-end items-center space-x-4">
          <Checkbox
            height="40px"
            checked={promptType === "image"}
            ripple={false}
            label={
              <Typography
                variant="small"
                color="blue-gray"
                textGradient
                className="flex "
              >
                Image prompt
              </Typography>
            }
            onChange={handleImagePromptCheckbox}
            className="h-4 w-4 hover:scale-105 hover:before:opacity-0"
          />
          <Button onClick={onClickSend}>Send</Button>
        </div>
      </div>
    </>
  );
};

export default MessageInput;

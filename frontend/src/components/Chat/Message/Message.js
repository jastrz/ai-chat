import { IconButton } from "@material-tailwind/react";
import React from "react";
import { cancelPrompt } from "socketConnection/sendActions";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "store/chatSlice";
import Animation from "components/Common/Animation";
import { PromptStatus } from "data";
import MessageContents from "./MessageContents";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.auth);

  const animationConfig = {
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: -50 },
  };

  const isUser = message.username === userData.username;
  const backgroundColor = isUser
    ? "bg-gradient-to-r from-red-900 to-red-700"
    : "bg-gradient-to-r from-blue-gray-900 to-blue-gray-600";

  const getPromptStatus = () => {
    const prompt = prompts.find((prompt) => prompt.guid === message.promptGuid);
    if (prompt) {
      return prompt.status;
    }
  };

  const handleInterrupt = () => {
    cancelPrompt(message.promptGuid);
    dispatch(removeMessage(message.guid));
  };

  return (
    <Animation animationConfig={animationConfig}>
      <div
        className={`flex items-center ${isUser ? "justify-end" : ""} ${
          message.concat ? "mt-1" : "mt-4"
        }`}
      >
        <MessageContents
          message={message}
          backgroundColor={backgroundColor}
          sameUserAsPrevious={message.concat}
        />
        {isUser &&
          message.promptGuid &&
          getPromptStatus() !== PromptStatus.Completed && (
            <IconButton
              onClick={handleInterrupt}
              size="sm"
              variant="outlined"
              className="ml-2 rounded-2xl"
            >
              {getPromptStatus() === PromptStatus.Pending ? (
                <i className="fas fa-xmark" />
              ) : (
                <i className="fas fa-square" />
              )}
            </IconButton>
          )}
      </div>
    </Animation>
  );
};

export default Message;

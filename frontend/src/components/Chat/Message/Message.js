import { IconButton } from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";
import { cancelPrompt } from "socketConnection/sendActions";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "store/chatSlice";
import Animation from "components/Common/Animation";
import { PromptStatus } from "data/prompt";
import MessageContents from "./MessageContents";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.auth);

  const [relatedPrompt, setRelatedPrompt] = useState(null);

  const isUser = useMemo(() => {
    const isUserValue = message.username === userData.username;

    return isUserValue;
  }, [message.username, userData]);

  const animationConfig = useMemo(() => {
    const startXPos = isUser ? 50 : -50;

    const animationConfigValue = {
      to: { opacity: 1, x: 0 },
      from: { opacity: 0, x: startXPos },
    };

    return animationConfigValue;
  }, [isUser]);

  const backgroundColor = useMemo(() => {
    return isUser
      ? "bg-gradient-to-r from-red-900 to-red-700"
      : "bg-gradient-to-r from-blue-gray-900 to-blue-gray-600";
  }, [isUser]);

  useEffect(() => {
    const prompt = prompts.find((prompt) => prompt.guid === message.promptGuid);
    setRelatedPrompt(prompt);
  }, [relatedPrompt, setRelatedPrompt, prompts]);

  const handleInterrupt = () => {
    cancelPrompt(message.promptGuid);
    if (relatedPrompt.status === PromptStatus.Pending) {
      dispatch(removeMessage(message.guid));
    }
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
          relatedPrompt &&
          relatedPrompt.status !== PromptStatus.Completed && (
            <IconButton
              onClick={handleInterrupt}
              size="sm"
              variant="outlined"
              className="ml-2 rounded-2xl"
            >
              {relatedPrompt.status === PromptStatus.Pending ? (
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

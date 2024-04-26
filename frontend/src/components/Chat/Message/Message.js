import { IconButton } from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";
import { cancelPrompt } from "socketConnection/sendActions";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMessage,
  setPromptTarget,
  updatePromptStatus,
} from "store/chatSlice";
import Animation from "components/Common/Animation";
import { PromptStatus } from "data/prompt";
import MessageContents from "./MessageContents";
import { sendPrompt } from "socketConnection/sendActions";
import { generateGUID } from "utils";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.auth);

  const [relatedPrompt, setRelatedPrompt] = useState(undefined);

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
    const prompt = message.prompt;
    if (prompt) {
      setRelatedPrompt(prompt);
    } else {
      setRelatedPrompt(undefined);
    }
  }, [relatedPrompt, setRelatedPrompt, prompts]);

  const handleInterrupt = () => {
    cancelPrompt(message.guid);
    if (message.prompt.status === PromptStatus.Pending) {
      dispatch(removeMessage(message.guid));
    }
  };

  const onClickResendPrompt = () => {
    const prompt = {
      ...message.prompt,
      guid: message.guid,
      message: message.content[0].data,
      status: PromptStatus.Pending,
      targetGuid: generateGUID(),
    };

    dispatch(
      setPromptTarget({ id: message.guid, targetGuid: prompt.targetGuid })
    );

    // temporarily optimistically updating status here - should get acknowlegment from backend that prompt has been received
    dispatch(
      updatePromptStatus({ guid: message.guid, status: PromptStatus.Pending })
    );
    sendPrompt({ ...prompt });
  };

  return (
    <Animation animationConfig={animationConfig}>
      <div
        className={`flex items-center ${isUser ? "justify-end" : ""} ${
          message.concat ? "mt-1" : "mt-4"
        }`}
      >
        {message.prompt && message.prompt.status === PromptStatus.Completed && (
          <IconButton
            size="sm"
            variant="outlined"
            style={{ scale: "0.75" }}
            onClick={onClickResendPrompt}
          >
            <i className="fas fa-rotate-right" />
          </IconButton>
        )}
        <MessageContents
          message={message}
          backgroundColor={backgroundColor}
          sameUserAsPrevious={message.concat}
        />
        {isUser &&
          message.prompt &&
          message.prompt.status &&
          message.prompt.status !== PromptStatus.Completed && (
            <Animation animationConfig={animationConfig}>
              <IconButton
                onClick={handleInterrupt}
                size="sm"
                variant="outlined"
                className="ml-2 rounded-2xl"
              >
                {message.prompt.status === PromptStatus.Pending ? (
                  <i className="fas fa-xmark" />
                ) : (
                  <i className="fas fa-square" />
                )}
              </IconButton>
            </Animation>
          )}
      </div>
    </Animation>
  );
};

export default Message;

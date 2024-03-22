import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";

const MessageInputControls = ({
  handleImagePromptCheckbox,
  onClickSend,
  onClickReset,
  imageCheckboxToggled,
}) => {
  return (
    <div className="flex flex-row mt-2 mb-2">
      <div className="basis-1/4 flex justify-start items-center">
        <Button onClick={onClickReset}>New chat</Button>
      </div>
      <div className="basis-3/4 flex justify-end items-center space-x-4">
        <Checkbox
          height="40px"
          checked={imageCheckboxToggled}
          ripple={false}
          label={
            <Typography
              variant="small"
              color="blue-gray"
              textGradient
              className="flex"
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
  );
};

export default MessageInputControls;

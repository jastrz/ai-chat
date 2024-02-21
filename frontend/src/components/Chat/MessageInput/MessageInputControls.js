import React from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";

const MessageInputControls = ({
  handleImagePromptCheckbox,
  onClickSend,
  onClickReset,
  imageCheckboxToggled,
}) => {
  return (
    <div className="columns-2 mt-2">
      <div className="column flex justify-start items-center">
        <IconButton onClick={onClickReset}>
          <i className="fas fa-trash-alt" />
        </IconButton>
      </div>
      <div className="column flex justify-end items-center space-x-4">
        <Checkbox
          height="40px"
          checked={imageCheckboxToggled}
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
  );
};

export default MessageInputControls;

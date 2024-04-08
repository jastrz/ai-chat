import React from "react";
import { IconButton } from "@material-tailwind/react";
import Animation from "components/Common/Animation";

const SaveButton = ({ imageSrc, imageName, disabled, size }) => {
  const animationConfig = {
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 5 },
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageSrc}`;
    link.download = imageName;
    link.click();
  };

  return (
    <Animation animationConfig={animationConfig}>
      <IconButton
        className="rounded=full"
        size={size ? size : "sm"}
        disabled={disabled}
        onClick={handleSaveClick}
      >
        <i className="fas fa-download" />
      </IconButton>
    </Animation>
  );
};

export default SaveButton;

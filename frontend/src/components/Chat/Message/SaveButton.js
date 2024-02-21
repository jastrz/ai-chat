import React from "react";
import { IconButton } from "@material-tailwind/react";

const SaveButton = ({ imageSrc, imageName, disabled, size }) => {
  const handleSaveClick = (event) => {
    event.stopPropagation();

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageSrc}`;
    link.download = imageName;
    link.click();
  };

  return (
    <IconButton
      className="rounded=full"
      size={size ? size : "sm"}
      disabled={disabled}
      onClick={handleSaveClick}
    >
      <i className="fas fa-download" />
    </IconButton>
  );
};

export default SaveButton;

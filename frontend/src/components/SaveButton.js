import React from "react";
import { Button } from "@material-tailwind/react";

const SaveButton = ({ imageSrc, imageName, disabled }) => {
  const handleSaveClick = () => {
    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageSrc}`;
    link.download = imageName;
    link.click();
  };

  return (
    <Button disabled={disabled} onClick={handleSaveClick}>
      Save Image
    </Button>
  );
};

export default SaveButton;

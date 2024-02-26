import React, { useState } from "react";
import SaveButton from "./SaveButton";
import { ImageDialog } from "./ImageDialog";

const ImageContent = ({ index, data }) => {
  const [showHiddenItem, setShowHiddenItem] = useState(false);
  const [open, setOpen] = React.useState(false);

  const showHidden = () => {
    setShowHiddenItem(true);
  };

  const hide = () => {
    setShowHiddenItem(false);
  };

  const toggleFullscreen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ImageDialog data={data} open={open} toggle={toggleFullscreen} />
      <div
        key={index}
        className="relative py-2"
        onFocus={showHidden}
        onMouseOver={showHidden}
        onMouseOut={hide}
        onClick={toggleFullscreen}
      >
        <img
          className={"max-h-64 shadow-lg rounded-md"}
          src={`data:image/png;base64, ${data}`}
          alt=""
        />
        {showHiddenItem && (
          <div
            data-testid="hidden"
            className="absolute right-0 bottom-2 shadow-lg"
          >
            <SaveButton imageSrc={data} imageName={new Date().toUTCString()} />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageContent;

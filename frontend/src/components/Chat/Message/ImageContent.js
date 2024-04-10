import React, { useState } from "react";
import SaveButton from "./SaveButton";

const ImageContent = ({ index, data, onImageClicked }) => {
  const [showSaveButton, setShowSaveButton] = useState(false);

  const showHidden = () => {
    setShowSaveButton(true);
  };

  const hide = () => {
    setShowSaveButton(false);
  };

  const onClick = (imageIndex) => {
    onImageClicked(imageIndex);
  };

  return (
    <>
      <div
        key={index}
        className="relative py-2"
        onFocus={showHidden}
        onMouseOver={showHidden}
        onMouseOut={hide}
        onClick={() => onClick(index)}
      >
        <img
          className={"max-h-32 2xl:max-h-64 shadow-lg rounded-md"}
          src={`data:image/png;base64, ${data}`}
          style={{ cursor: "pointer" }}
          alt=""
        />
        {showSaveButton && (
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

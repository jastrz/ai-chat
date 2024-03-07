import React from "react";
import { useState } from "react";
import SaveButton from "./Chat/Message/SaveButton";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { askForImage } from "api/api";

export const ImagePromptComponent = () => {
  const [image, setImage] = useState(null);
  const [imagePrompt, setImagePrompt] = useState("");

  const handleImagePromptInputChanged = (event) => {
    setImagePrompt(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      getImage();
    }
  };

  const getImage = async () => {
    try {
      const imageRequestData = {
        prompt: imagePrompt,
        height: 512,
        width: 512,
      };
      const imageData = await askForImage(imageRequestData);

      if (imageData) {
        setImage(imageData);
      } else {
        console.error("No image data received");
      }
    } catch (error) {
      console.error("Error getting image:", error);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <div class="mb-4">
            {image && <img src={`data:image/png;base64,${image}`} alt="" />}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Textarea
              variant="outlined"
              label="Image prompt"
              value={imagePrompt}
              onChange={handleImagePromptInputChanged}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div class="grid grid-cols-2 gap-4 mt-2 max-w-72">
            <Button onClick={getImage}>Get Image</Button>

            <SaveButton
              disabled={image === null}
              imageSrc={image}
              imageName={new Date().toISOString().slice(0, 10)}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

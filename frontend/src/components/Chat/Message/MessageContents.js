import React from "react";
import UsernameIndicator from "./UsernameIndicator";
import ImageContent from "./ImageContent";
import TextContent from "./TextContent";
import { useDispatch } from "react-redux";
import * as galleryActions from "../../../store/gallerySlice";
import { TimeStamp } from "./Timestamp";

const MessageContents = ({ message, backgroundColor, sameUserAsPrevious }) => {
  const TextContents = message.content
    .filter(({ type }) => type !== "image")
    .map(({ data }, index) => <TextContent key={index} data={data} />);

  const dispatch = useDispatch();

  const imageData = message.content.filter(({ type }) => type === "image");

  const onImageClicked = (imageIndex) => {
    const images = [];

    imageData.forEach((img) => {
      const image = `data:image/png;base64, ${img.data}`;
      images.push({
        original: image,
        thumbnail: image,
      });
    });
    dispatch(galleryActions.open({ images: images, currentIndex: imageIndex }));
  };

  const ImageContents = imageData.map(({ data }, index) => (
    <ImageContent
      index={index}
      key={index}
      data={data}
      onImageClicked={onImageClicked}
    />
  ));

  return (
    <>
      <div className={`${backgroundColor} shadow-xl rounded-2xl px-4 py-2`}>
        <div className="flex items-center">
          {!sameUserAsPrevious && (
            <UsernameIndicator username={message.username} />
          )}
        </div>
        <TimeStamp timestamp={message.timestamp} />
        {TextContents}
        <div className="flex flex-wrap gap-x-4">{ImageContents}</div>
      </div>
    </>
  );
};

export default MessageContents;

import * as galleryActions from "store/gallerySlice";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ReactImageGallery from "react-image-gallery";

import { useRef } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gallery = () => {
  const { images, isOpen, currentIndex } = useSelector(
    (state) => state.gallery
  );
  const overlayRef = useRef();
  const dispatch = useDispatch();

  const close = (event) => {
    if (event.target === overlayRef.current) {
      dispatch(galleryActions.close());
    }
  };

  return (
    <>
      {isOpen && (
        <Overlay onClick={close} ref={overlayRef}>
          <div className={`$mx-auto max-w-2xl w-full`}>
            <ReactImageGallery
              items={images}
              showPlayButton={false}
              slideDuration={150}
              stopPropagation={true}
              startIndex={currentIndex}
              showThumbnails={images.length > 1}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
            />
          </div>
        </Overlay>
      )}
    </>
  );
};

export default Gallery;

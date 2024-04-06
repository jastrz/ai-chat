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
  const { images, isOpen } = useSelector((state) => state.gallery);
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
          <div style={{ height: 512, width: 512 }}>
            <ReactImageGallery
              items={images}
              showPlayButton={false}
              slideDuration={200}
              stopPropagation={true}
            />
          </div>
        </Overlay>
      )}
    </>
  );
};

export default Gallery;

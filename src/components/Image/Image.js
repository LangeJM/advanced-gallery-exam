import ImageModal from '../ImageModal/imageModal'
import './Image.scss';

import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import FontAwesome from 'react-fontawesome';

const type = 'Image'

const Image = (props) => {

  const ref = useRef(null);
  
  const [rotation, setRotation] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { dto, galleryWidth, deleteImage, index, moveImage, imageSize, imageUrl, modalUrl } = props;
  
  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: dto.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const onRotateImage = (event) => {
    event.preventDefault();
    setRotation(rotation + 90 )
  }

  const onEnlargeImage = () => {
    setShowModal(!showModal)
  }

  const imagesPerRow = Math.round(galleryWidth / 200);
  const size = Math.round(galleryWidth / imagesPerRow * imageSize) -1;

  return (
      <div
      className="image-root"
      ref={ref}
      style={{
        backgroundImage: `url(${imageUrl})`,
        width: size + 'px',
        height: size + 'px',
        transform: `rotate(${rotation}deg)`,
        opacity: isDragging ? 0 : 1,
        }}
        >
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={(event) => onRotateImage(event)} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={(event) => deleteImage(event, dto)}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={(event) => onEnlargeImage(event)} />
          <ImageModal
            showModal={showModal}
            closeModal={onEnlargeImage}
            backgroundImage={ modalUrl }
          ></ImageModal>
        </div>
      </div>
  );
}

export default Image;

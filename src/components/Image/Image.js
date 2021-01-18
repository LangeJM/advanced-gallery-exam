import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import ImageModal from '../ImageModal/imageModal'
import './Image.scss';

const Image = (props) => {
  
  const [rotation, setRotation] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const {dto, galleryWidth, deleteImage} = props;


  const urlFromDto = (dto) => {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  const urlModalImage = (dto) => {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}_b.jpg`;
  }

  const onRotateImage = (event) => {
    event.preventDefault();
    setRotation(rotation + 90 )
  }

  const onEnlargeImage = () => {
    setShowModal(!showModal)
  }

  const imagesPerRow = Math.round(galleryWidth / 200);
  const size = Math.round(galleryWidth / imagesPerRow) -1;

  return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${urlFromDto(dto)})`,
          width: size + 'px',
          height: size + 'px',
          transform: `rotate(${rotation}deg)`
        }}
        >
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={(event) => onRotateImage(event)} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={(event) => deleteImage(event, dto)}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={(event) => onEnlargeImage(event)} />
          <ImageModal
            showModal={showModal}
            closeModal={onEnlargeImage}
            backgroundImage={ urlModalImage(dto) }
          ></ImageModal>
        </div>
      </div>
  );
}

export default Image;

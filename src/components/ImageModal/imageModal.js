import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app')

const ImageModal = (props) => {

    const { backgroundImage, closeModal } = props;
    return (
      <div >
        <Modal
          isOpen={props.showModal}
          contentLabel="Image Modal"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <img src={backgroundImage} alt={"flickr" }onClick={() => closeModal()} />
        </Modal>
      </div>
    );
}

export default ImageModal;


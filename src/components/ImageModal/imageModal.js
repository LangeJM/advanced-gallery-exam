
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app')

export class ImageModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: props.showModal
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }
  
  handleCloseModal() {
    this.setState({ showModal: false });
  }


  render() {
    const { showModal, backgroundImage, closeModal } = this.props;
    return (
      <div >
        <Modal
          isOpen={showModal}
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
          <img src={backgroundImage} onClick={() => closeModal()} />
        </Modal>
      </div>
    );
  }
}


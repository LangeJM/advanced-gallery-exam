import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {ImageModal} from '../ImageModal/imageModal'
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0,
      showModal: false
    };
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const imagesPerRow = 10;
    // const targetSize = Math.round
    // const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = Math.round(galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  urlModalImage(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}_b.jpg`;
  }

  onRotateImage(event) {
    event.preventDefault();
    this.setState({ rotation: this.state.rotation + 90 })
  }

  onEnlargeImage = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { rotation, showModal } = this.state;
    const { galleryWidth } = this.props;
    const imagesPerRow = Math.round(galleryWidth / 200);
    const size = Math.round(galleryWidth / imagesPerRow) -1;

    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: size + 'px',
          height: size + 'px',
          transform: `rotate(${rotation}deg)`
        }}
        >
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={(event) => this.onRotateImage(event)} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={(event) => this.props.deleteImage(event, this.props.dto)}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={(event) => this.onEnlargeImage(event)} />
          <ImageModal
            showModal={showModal}
            closeModal={this.onEnlargeImage}
            backgroundImage={ this.urlModalImage(this.props.dto) }
          ></ImageModal>
        </div>
      </div>
    );
  }
}

export default Image;

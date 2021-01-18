import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Gallery.scss';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      apiCallCounter: 0,
      maxPages: 0
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const pageNumber = this.state.apiCallCounter + 1;
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&page=${pageNumber}&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        this.setState({apiCallCounter: this.state.apiCallCounter + 1})
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({ images: [...this.state.images, ...res.photos.photo], maxPages: res.photos.pages });
        }
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(props) {
    this.setState({images:[]})
    this.getImages(props.tag);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onDeleteImage = (event, imageDetails) => {
    event.preventDefault();
    this.setState({
      images: this.state.images.filter((image) => {
        return image !== imageDetails
    })});
  }

  updateDimensions = () => {
    this.setState({ galleryWidth: document.body.clientWidth });
  };

  render() {
    const { galleryWidth, images, maxPages, apiCallCounter } = this.state
    return (
      <div className="gallery-root">
        <InfiniteScroll
          dataLength={images.length}
          hasMore={apiCallCounter >= 1 && maxPages >= apiCallCounter} // this is to prevent firing of the infinite scroll for the first call
          next={() => this.getImages(this.props.tag)}
          loader={<h4>Loading...</h4>}
          scrollThreshold={'100px'}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>End of image list</b>
            </p>
          }
        >
          {images.map((dto, index) => (
            <Image key={`image-${index}-${dto.id}`} dto={dto} galleryWidth={galleryWidth} deleteImage={this.onDeleteImage} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Gallery;

import Image from '../Image';
import './Gallery.scss';

import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import update from 'immutability-helper';

const Gallery = (props) => {
  const [images, setImages] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState(1000);
  const [apiCallCounter, setApiCallCounter] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  const getImages = (tag) => {
    const pageNumber = apiCallCounter + 1;
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&page=${pageNumber}&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        setApiCallCounter(apiCallCounter + 1)
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          setImages([...images, ...res.photos.photo]);
          setMaxPages(res.photos.pages)
        }
      });
  }

  useEffect(() => { //Component did mount hooks equivalent
    getImages(props.tag);
    setGalleryWidth(document.body.clientWidth);
    window.addEventListener('resize', updateDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFirstRun = useRef(true);
  const debouncedSave = useRef(
    debounce(nextValue => getImages(nextValue), 1500)).current;

  useEffect(() => { // Component did update hooks equivalent
    if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
    }
    setImages([]);
    debouncedSave(props.tag);

    window.addEventListener('resize', updateDimensions);
    return function cleanup() {
      window.removeEventListener('resize', updateDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onDeleteImage = (event, imageDetails) => {
    event.preventDefault();
    setImages(
      images.filter((image) => {
        return image !== imageDetails
    }));
  }

  const updateDimensions = () => {
    setGalleryWidth(document.body.clientWidth );
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };

  return (
    <div className="gallery-root">
      <InfiniteScroll
        dataLength={images.length}
        hasMore={apiCallCounter >= 1 && maxPages >= apiCallCounter} // this is to prevent firing of the infinite scroll for the first call
        next={() => getImages(props.tag)}
        loader={<h4>Loading...</h4>}
        scrollThreshold={'100px'}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>End of image list</b>
          </p>
        }
      >
        {images.map((dto, index) => (
          <Image key={index} dto={dto} index={index} galleryWidth={galleryWidth} deleteImage={onDeleteImage} moveImage={moveImage} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Gallery;

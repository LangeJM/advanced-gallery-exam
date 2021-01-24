import Image from "../Image";
import "./Gallery.scss";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState, useEffect, useRef } from "react";
import update from "immutability-helper";
import worldCities from "../FilterComponents/worldcities-selection.json";

const Gallery = (props) => {
  const [images, setImages] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState(1000);
  const [maxPages, setMaxPages] = useState(0);
  const apiCallsRef = useRef(0);
  const hasSearchResults = useRef(false);

  const getImages = (tag) => {
    const pageNumber = apiCallsRef.current + 1;
    let apiEndpoint = "";
    let locationString = "";

    // lookup lat lon values for city selected and write to search query, if exists
    for (const key in worldCities) {
      if (
        worldCities[key].location === props.location &&
        worldCities[key].location !== "No filter"
      ) {
        locationString =
          "&lat=" + worldCities[key].lat + "&lon=" + worldCities[key].lng;
      }
    }

    if (tag || locationString.length) apiEndpoint = "flickr.photos.search";
    else apiEndpoint = "flickr.photos.getRecent";

    const getImagesUrl = `services/rest/?method=${apiEndpoint}&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any${locationString}&per_page=100&page=${pageNumber}&format=json&nojsoncallback=1`;
    const baseUrl = "https://api.flickr.com/";

    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: "GET",
    })
      .then((res) => res.data)
      .then((res) => {
        apiCallsRef.current += 1;
        if (res && res.photos.photo.length > 0) {
          if (apiCallsRef.current === 1) setImages([...res.photos.photo]);
          else setImages([...images, ...res.photos.photo]);
          setMaxPages(res.photos.pages);
          hasSearchResults.current = true;
        } else {
          hasSearchResults.current = false;
          setImages([]);
        }
      });
  };

  useEffect(() => {
    //Component did update
    apiCallsRef.current = 0;
    getImages(props.tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tag]);

  useEffect(() => {
    //Component did mount
    setGalleryWidth(document.body.clientWidth);
    window.addEventListener("resize", updateDimensions);
    return function cleanup() {
      window.removeEventListener("resize", updateDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteImage = (event, imageDetails) => {
    event.preventDefault();
    setImages(
      images.filter((image) => {
        return image !== imageDetails;
      })
    );
  };

  const updateDimensions = () => {
    setGalleryWidth(document.body.clientWidth);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };

  return (
    <div className="gallery-root">
      <InfiniteScroll
        dataLength={images.length}
        hasMore={apiCallsRef.current >= 1 && maxPages >= apiCallsRef.current} // this is to prevent firing of the infinite scroll for the first call
        next={() => getImages(props.tag)}
        loader={
          hasSearchResults.current ? (
            <p className="mt-3">Loading...</p>
          ) : (
            <p className="mt-3">No search results...</p>
          )
        }
        scrollThreshold={"100px"}
        endMessage={
          <p className="mt-3" style={{ textAlign: "center" }}>
            {hasSearchResults.current ? (
              <b>End of image list</b>
            ) : (
              <b>No search results...</b>
            )}
          </p>
        }
      >
        {images.map((dto, index) => (
          <Image
            key={`${dto.id}-${index}`}
            imageUrl={`https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`}
            modalUrl={`https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}_b.jpg`}
            dto={dto}
            index={index}
            galleryWidth={galleryWidth}
            imageSize={props.imageSize}
            deleteImage={onDeleteImage}
            moveImage={moveImage}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;

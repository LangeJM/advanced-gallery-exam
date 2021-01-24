import React, { useState, useCallback, useRef } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import debounce from 'lodash.debounce';

import './App.scss';
import Gallery from '../Gallery';
import ImageSize from '../FilterComponents/ImageSize'
import SearchLocation from '../FilterComponents/SearchLocation'

const App = () => {

  const [tag, setTag] = useState('Wiesn');
  const [inputValue, setInputValue] = useState('Wiesn');
  const [imageSize, setImageSize] = useState(1);
  const location = useRef();

  // eslint-disable-next-line
  const callbackDebounce  = useCallback(debounce((event) => setTag(event.target.value), 1000), []);

  const handleInputChange = (event) => {
    event.preventDefault();
    event.persist()
    setInputValue(event.target.value);
    callbackDebounce(event);
  }

  const handleImageSize = (event) => { 
    event.preventDefault(null);
    switch (event.target.id) {
      case 'imageSmall':
        return setImageSize(0.75);
      case 'imageNormal':
        return setImageSize(1)
      case 'imageLarge':
        return setImageSize(2)
      default:
        return setImageSize(1)
    }
  }

  const handleLocationInput = (event) => {
    location.current = event.value
  }

    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <div className="d-flex justify-content-center flex-wrap mb-3 mt-3" style={{minWidth:"100px"}}>
            <ImageSize handleImage={handleImageSize} />
            <input className="app-input mb-1" placeholder="Showing most recent photos" onChange={(event) => handleInputChange(event)} value={inputValue} />
            <SearchLocation locationInput={handleLocationInput}/>
            </div>
        </div>
        <DndProvider backend={HTML5Backend}>
          <Gallery tag={tag} imageSize={imageSize} location={ location.current }/>
          </DndProvider>
      </div>
    );
}

export default App;

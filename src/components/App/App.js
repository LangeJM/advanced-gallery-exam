import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import debounce from 'lodash.debounce';

import './App.scss';
import Gallery from '../Gallery';
import ImageSize from '../ImageSize/ImageSize'

const App = () => {

  const [tag, setTag] = useState('Wiesn');
  const [inputValue, setInputValue] = useState('Wiesn');
  const [imageSize, setImageSize] = useState(1);

  // eslint-disable-next-line
  const callbackDebounce  = useCallback(debounce((event) => setTag(event.target.value), 2000), []);

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

    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <div className="d-flex justify-content-center">
            <ImageSize handleImage={handleImageSize}/>
            <input className="app-input" onChange={(event) => handleInputChange(event)} value={inputValue} />
            </div>
        </div>
        <DndProvider backend={HTML5Backend}>
          <Gallery tag={tag} imageSize={imageSize}/>
          </DndProvider>
      </div>
    );
}

export default App;

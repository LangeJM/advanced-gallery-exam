import React, { useState } from 'react';
import './App.scss';
import Gallery from '../Gallery';


import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const App = () => {

  const [tag, setTag] = useState('WIX, website, builder');

    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <input className="app-input" onChange={(event) => setTag(event.target.value)} value={tag}/>
        </div>
        <DndProvider backend={HTML5Backend}>
          <Gallery tag={tag} />
          </DndProvider>
      </div>
    );
}

export default App;

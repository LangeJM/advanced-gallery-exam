import React from 'react';
import FontAwesome from 'react-fontawesome'

const ImageSize = (props) => {
    return (
        <div className="d-flex align-items-start">
            <div className="d-flex align-items-end" style={{height:"2rem"}}>   
                <FontAwesome className="image-icon mr-2" name="image" size="lg" title="imageLarge" id="imageLarge" style={{marginBottom: "3px"}} onClick={(event)=>props.handleImage(event)} />
                <FontAwesome className="image-icon mr-2" name="image" title="imageNormal" id="imageNormal" onClick={(event) => props.handleImage(event)} />
                <FontAwesome className="image-icon mr-2" name="image" size="xs" title="imageSmall" id="imageSmall" onClick={(event) => props.handleImage(event)} />    
            </div>
        </div>
    );
}

export default ImageSize;

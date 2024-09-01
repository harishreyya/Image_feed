import React from 'react';

function ImageItem({ image, onDelete }) {
    return (
        <div className="image-item">
            <img src={image.url} alt="Uploaded" onClick={() => window.open(image.url, '_blank')} />
            <button onClick={() => onDelete(image._id)}>Delete</button>
        </div>
    );
}

export default ImageItem;

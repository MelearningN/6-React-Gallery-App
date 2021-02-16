import React from 'react';
import Photo from './Photo'

//displays max of 24 photos
const PhotoContainer = ({photos}) =>
        <div className="photo-container">
            <ul>
          {photos.map(photo => <Photo photos={photo} key={photo.id}/>)}
            </ul>
        </div>

export default PhotoContainer;

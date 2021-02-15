import React from 'react';
import Photo from './Photo'
import {withRouter} from 'react-router-dom';

const PhotoContainer = ({photos, routerProps}) => {
    let routerQuery=routerProps.match.params.query
    return (
        <div className="photo-container">
            { routerQuery === undefined ? <h2>Welcome to the App try searching with keywords</h2> 
            : <h2>Here are some pictures about {routerQuery}</h2>
            }
            <ul>
            {photos.photo.map(photo => <Photo photos={photo} key={photo.id}/>)} 
            </ul>
        </div>
    );
}

export default withRouter(PhotoContainer)

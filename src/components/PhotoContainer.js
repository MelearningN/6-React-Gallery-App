import React from 'react';
import Photo from './Photo'

const PhotoContainer = (props) => {
    console.log('match', props.routerProps.match.params, props.routerProps.match.params.query !=undefined)
 //   const pic = photos.photo && photos.photo.map(x => x)
    return (
        <div className="photo-container">
         {props.routerProps.match.params.query ===undefined ? <h2>Welcome to the App trying searching with keywords</h2> :  <h2>Here are some pictures about {props.routerProps.match.params.query}</h2>}
            <ul> {
                 props.photos.photo.map(x => {
                  return  <Photo photos={x} key={x.id}/>
                })
            } </ul>
        </div>

    );
}

export default PhotoContainer

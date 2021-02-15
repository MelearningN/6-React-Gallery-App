import React from 'react';
import Photo from './Photo'
import { Route, NavLink, Link,withRouter} from 'react-router-dom';

const PhotoContainer = (props) => {
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

export default withRouter(PhotoContainer)

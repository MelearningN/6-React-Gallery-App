import React from 'react';

const Photo=({photos})=>
        <li>
         <img src={`https://live.staticflickr.com/${photos.server}/${photos.id}_${photos.secret}.jpg`} alt="" />
        </li>

export default Photo
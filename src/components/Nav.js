import React from 'react';
import {
  NavLink
} from "react-router-dom";

//Starting buttons for BMW, Audi and Mercedez
const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li><NavLink to='/search/Bmw'>BMW</NavLink></li>
      <li><NavLink to='/search/Audi'>Audi</NavLink></li>
      <li><NavLink to='/search/Mercedez'>Mercedez</NavLink></li>
    </ul>
  </nav>
);

export default Nav;
import React from 'react';
import homeImage from '../assets/header-image.png';

const Header = props => (
  <header>
    <nav>
      <img src={homeImage} alt="logo" />
    </nav>
  </header>
);

export default Header;

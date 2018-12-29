import React from 'react';
import homeImage from '../assets/header-image.png';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <img src={homeImage} alt="logo" />
        </nav>
      </header>
    );
  }
}

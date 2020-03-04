import React from 'react';
import classes from './Header.module.scss';
import Logo from './images/logo.svg';
import Autocomplite from '../Autocomplite';

const Header = () => {
  return (
    <header className={classes.Header}>
      <img src={Logo} alt="logo icon" draggable="false" />
      <Autocomplite />
    </header>
  );
};

export default Header;

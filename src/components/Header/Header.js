import React from 'react';
import PropTypes from 'prop-types';

import Logo from './images/logo.svg';
import Autocomplite from '../Autocomplite';
import classes from './Header.module.scss';

const Header = ({ findCoin, getCoins }) => {
  return (
    <header className={classes.header}>
      <img src={Logo} alt="logo icon" draggable="false" />
      <Autocomplite findCoin={findCoin} getCoins={getCoins} />
    </header>
  );
};

Header.propTypes = {
  findCoin: PropTypes.func,
  getCoins: PropTypes.func
};

export default Header;

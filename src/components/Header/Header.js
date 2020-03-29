import React from 'react';
import classes from './Header.module.scss';
import Logo from './images/logo.svg';
import Autocomplite from '../Autocomplite';
import Checkbox from '../Checkbox/Checkbox';

import PropTypes from 'prop-types';

const Header = ({ findCoin, getCoins, sortFavorits }) => {
  return (
    <header className={classes.header}>
      <img src={Logo} alt="logo icon" draggable="false" />
      <Autocomplite findCoin={findCoin} getCoins={getCoins} />
      <Checkbox click={() => sortFavorits()} coin="toogleFavorits" />
    </header>
  );
};

Header.propTypes = {
  findCoin: PropTypes.func,
  getCoins: PropTypes.func,
  sortFavorits: PropTypes.func
};

export default Header;

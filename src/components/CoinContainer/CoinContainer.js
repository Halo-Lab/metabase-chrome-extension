import React from 'react';

import classes from './CoinContainer.module.scss';
// import CoinCard from '../CoinCard';

import getData from '../../services';
getData();

const CoinContainer = () => {
  return (
    <div className={classes.CoinContainer}>
    </div>
  )
}

export default CoinContainer;
import React from 'react';
import classes from './CoinCard.module.scss';

const Price = ({ price }) => {

  return (
    <span className={classes.Price}>${price}</span>
  )
}

export default Price;
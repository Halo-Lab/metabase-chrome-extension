import React, { useState } from 'react';
import classNames from 'classnames';
import classes from './Tabs.module.scss';

import { ReactComponent as CurrencyImage } from './images/currency.svg';
import { ReactComponent as CryptoImage } from './images/bitcoin.svg';

const Tabs = props => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = index => {
    setActiveIndex(index);
    props.onchange(index);
  };

  const isActive = classNames(classes.tab__btn, classes.tab__active);

  return (
    <div className={classes.tab__buttons}>
      <div className={classes.tab__wrapper}>
        <button
          type="button"
          onClick={() => handleOnClick(0)}
          className={activeIndex === 0 ? isActive : classes.tab__btn}
        >
          <CryptoImage className={classes.tab__icon} />
          Crypto
        </button>
        <button
          type="button"
          onClick={() => handleOnClick(1)}
          className={activeIndex === 1 ? isActive : classes.tab__btn}
        >
          <CurrencyImage className={classes.tab__icon} />
          Currency
        </button>
      </div>
    </div>
  );
};

export default Tabs;

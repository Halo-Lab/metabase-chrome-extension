import React from 'react';
import classes from './CurrencyCard.module.scss';

import Checkbox from '../Checkbox/Checkbox';

import VARIABLES from '../../variables';

const CurrencyCard = ({ data, addFavorits }) => {
  const isoCode = VARIABLES.isoCodes;
  const symbols = VARIABLES.currencySymbols;

  if (data) {
    return (
      <div>
        {Object.keys(data).map((name, index) => (
          <div className={classes.card} key={index}>
            <Checkbox addClass={classes.checkbox} />
            <div className={classes.row}>
              <img
                className={classes.image}
                src={`https://www.x-rates.com/themes/x-rates/images/flags/${name.toLowerCase()}.png`}
                alt="icon"
                draggable="false"
              />
              <div className={classes.name}>
                <p>
                  {index + 1}.{isoCode[name]}
                </p>
                <span>{name}</span>
              </div>
              <span className={classes.price}>
                {(1 / data[name]).toFixed(2)}
                {symbols[name]}
              </span>
              {/* <div className={`${classes.arrow} ${priceState}`}>
                <span></span>
              </div> */}
              <div className={classes.persent}>
                {/* <span className={percentClass}>{percent}%</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return false;
};

export default CurrencyCard;

import React from 'react';
import classes from './CurrencyCard.module.scss';

import Checkbox from '../Checkbox/Checkbox';

import VARIABLES from '../../variables';

const CurrencyCard = ({ data, addFavorits, base }) => {
  const isoCode = VARIABLES.isoCodes;
  const symbols = VARIABLES.currencySymbols;

  if (data) {
    return (
      <div>
        {Object.keys(data).map((name, index) => (
          <div className={classes.card} key={index}>
            <Checkbox
              click={() => addFavorits(name)}
              // isChecked={isFavorite}
              addClass={classes.checkbox}
            />
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
                {symbols[base]}
              </span>
              <div className={classes.persent}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return false;
};

export default CurrencyCard;

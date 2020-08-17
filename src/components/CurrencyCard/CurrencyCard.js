import React, { useState, useEffect } from 'react';
import classes from './CurrencyCard.module.scss';
import CurrencyService from '../../services/CurrencyService';

import Checkbox from '../Checkbox/Checkbox';

import VARIABLES from '../../variables';

const CurrencyCard = ({ data, addFavorits }) => {
  const [countries, setCountries] = useState(null);

  const getCountries = async () => {
    const res = await CurrencyService.countries('USD');
    setCountries(res);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const isoCode = VARIABLES.isoCodes;
  console.log(isoCode.EUR);

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
              <span className={classes.price}>{(1 / data[name]).toFixed(2)}</span>
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

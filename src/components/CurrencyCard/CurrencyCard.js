import React, { useState, useEffect } from 'react';
import classes from './CurrencyCard.module.scss';
import CurrencyService from '../../services/CurrencyService';

import Checkbox from '../Checkbox/Checkbox';

const CurrencyCard = ({ data, addFavorits }) => {
  const [countries, setCountries] = useState(null);

  const getCountries = async () => {
    const res = await CurrencyService.countries('USD');
    setCountries(res);
  };

  useEffect(() => {
    getCountries();
  }, []);

  console.log(countries);
  if (data) {
    return (
      <div>
        {Object.keys(data).map(name => (
          <div className={classes.card}>
            <Checkbox addClass={classes.checkbox} />
            <div className={classes.row}>
              <img
                className={classes.image}
                src={`https://www.x-rates.com/themes/x-rates/images/flags/${name.toLowerCase()}.png`}
                alt="icon"
                draggable="false"
              />
              <div className={classes.name}>
                <p>{name}</p>
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

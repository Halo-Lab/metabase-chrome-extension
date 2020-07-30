import React from 'react';
import classes from './CurrencyItem.module.scss';

import Checkbox from '../Checkbox/Checkbox';


const CurrencyItem = ({ data, addFavorits }) => {
  if (data) {
    return (
      <div>
        {Object.keys(data).map(name => (
          <div className={classes.card}>
            <Checkbox addClass={classes.checkbox}/>
            <div className={classes.row}>
              {/* <img className={classes.image} src={imageSrc} alt="icon" draggable="false" /> */}
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

export default CurrencyItem;

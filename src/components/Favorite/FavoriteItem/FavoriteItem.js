import React, { useState, useEffect } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import style from './FavoriteItem.module.scss';
import PropTypes from 'prop-types';

import { cutValueAfterPoint } from '../../../utils';

const FavoriteItem = ({
  id,
  name,
  symbol,
  number,
  priceUsd,
  changePercent24Hr,
  isFavorite,
  toogleFavorite
}) => {
  const [price, setPrice] = useState(cutValueAfterPoint(priceUsd));
  const [priceState, setPriceState] = useState(null);
  useEffect(() => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`);
    pricesWs.onmessage = function(msg) {
      const dataFromServer = cutValueAfterPoint(JSON.parse(msg.data)[id]);
      const priceStateClass = dataFromServer > price ? style.up : style.down;
      setPriceState(priceStateClass);
      setPrice(dataFromServer);
    };
    return () => {
      pricesWs.close();
    };
  }, [id]);

  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? style.green : style.red;
  return (
    <div className={`swiper-slide ${style.item}`}>
      <div className={style.wrapper}>
        <span className={style.name}>
          {number}. {name}
        </span>
        <span className={style.id}>{symbol}</span>
      </div>
      <div>
        <span className={style.price}>$ {price}</span>
        <span className={`${style.arrow} ${priceState}`}></span>
      </div>
      <div className={style.wrapper}>
        <span className={`${style.percent} ${percentClass}`}>{percent}%</span>
        <Checkbox
          addClass={style.checkbox}
          isChecked={isFavorite}
          click={() => {
            toogleFavorite(id);
          }}
        />
      </div>
    </div>
  );
};

FavoriteItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  symbol: PropTypes.string,
  number: PropTypes.number,
  priceUsd: PropTypes.string,
  changePercent24Hr: PropTypes.string,
  isFavorite: PropTypes.bool,
  toogleFavorite: PropTypes.func
};

export default FavoriteItem;

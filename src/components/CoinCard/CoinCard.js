import React, { useState, useEffect } from 'react';
import classes from './CoinCard.module.scss';

import { cutValueAfterPoint } from '../../utils';

const CoinCard = ({value}) => {
  const {id,symbol, name, priceUsd, changePercent24Hr } = value;
  const [price, setPrice] = useState(cutValueAfterPoint(priceUsd));
  console.log("update:", name)
  useEffect(()=>{
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`)
    pricesWs.onmessage = function (msg) {
        const dataFromServer = cutValueAfterPoint(JSON.parse(msg.data)[id]);
        setPrice(dataFromServer);
    }
    return ()=>{
      pricesWs.close()
    }
  },[price,id])
  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? classes.green : classes.red;
  return (
    <div className={classes.CoinCard}>
      <div className={classes.Row}>
        <img className={classes.Image} src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`} alt="icon" draggable="false" />
        <div className={classes.Name}><b>{symbol}</b> | <span>{name}</span></div>
        <div className={classes.Persent}>
          <b>24h: </b>
          <span className={percentClass}>{percent}%</span>
        </div>
        <span className={classes.Price}>${price}</span>
      </div>
    </div>
  )
}

export default CoinCard;

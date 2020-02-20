import React, { useState, useEffect } from 'react';
import classes from './CoinCard.module.scss';

import { cutValueAfterPoint } from '../../utils';

const CoinCard = ({value}) => {
  const {id,symbol, name, priceUsd, changePercent24Hr, marketCapUsd } = value;
  const [price, setPrice] = useState(cutValueAfterPoint(priceUsd));
  const [data, setData] = useState();

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

  const handleClick = () => {
    // fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=m15`)
    // .then(response => response.json())
    // .then(result => console.log(result.data))
    // .catch(error => console.log('error', error));
  }

  const imageSrc = `https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? classes.green : classes.red;
  return (
    <div className={classes.CoinCard} onClick={handleClick}>
      <div className={classes.Row}>
        <img className={classes.Image} src={imageSrc} alt="icon" draggable="false" />
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

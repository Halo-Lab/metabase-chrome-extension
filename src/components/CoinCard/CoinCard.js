import React, { useState, useEffect } from 'react';
import classes from './CoinCard.module.scss';

const CoinCard = ({value}) => {
  const {id,symbol, name, priceUsd, marketCapUsd, changePercent24Hr } = value;
  const [price, setPrice] = useState(priceUsd);
  
  useEffect(()=>{
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`)
    pricesWs.onmessage = function (msg) {
        const dataFromServer = JSON.parse(msg.data);
        setPrice(dataFromServer[id]);
    }
  },[])


  const percent =  Number(changePercent24Hr).toFixed(2);
  const percentClass = percent > 0 ? classes.green : classes.red;
  return (
    <div className={classes.CoinCard}>
      <div className={classes.Row}>
        <img className={classes.Image} src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`} alt="icon" draggable="false" />
        <div><b>{symbol}</b> | <span>{name}</span></div>
        <div className={classes.Persent}>
          <b>24h: </b>
          <span className={percentClass}>{percent}%</span>
        </div>
        <span className={classes.Price}>{Number(price).toFixed(2)}$</span>
      </div>
      {/* <div className={classes.Row}>
        
      </div> */}
    </div>
  )
}

export default CoinCard;

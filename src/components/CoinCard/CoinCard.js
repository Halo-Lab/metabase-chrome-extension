import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import classes from './CoinCard.module.scss';

import CoinService from '../../services/index';
import { cutValueAfterPoint } from '../../utils';

const CoinCard = ({ value, addFavorits }) => {
  const { id, symbol, name, priceUsd, changePercent24Hr } = value;
  const [price, setPrice] = useState(cutValueAfterPoint(priceUsd));
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`)
    pricesWs.onmessage = function (msg) {
      const dataFromServer = cutValueAfterPoint(JSON.parse(msg.data)[id]);
      setPrice(dataFromServer);
    }
    return () => {
      pricesWs.close()
    }
  }, [id])

  const handleClick = () => {
    if (!show) {
      CoinService.history(id,'m5', result => {
        setData(result.data);
        setShow(true);
      })
    } else {
      setShow(!show);
    }
  }

  const imageSrc = `https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? classes.green : classes.red;
  return (
    <div className={classes.CoinCard}>
    <input className={classes.Checkbox} type='checkbox' onClick={() => addFavorits(id)} />
      <div className={classes.Row} onClick={handleClick}>
        <img className={classes.Image} src={imageSrc} alt="icon" draggable="false" />
        <div className={classes.Name}><b>{symbol}</b> | <span>{name}</span></div>
        <div className={classes.Persent}>
          <b>24h: </b>
          <span className={percentClass}>{percent}%</span>
        </div>
        <span className={classes.Price}>${price}</span>
      </div>
      <div>
        {show ? <Chart data={data}  rise={changePercent24Hr > 0}/> : null}
      </div>
    </div>
  )
}

export default CoinCard;

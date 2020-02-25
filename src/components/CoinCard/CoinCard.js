import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import Checkbox from '../Checkbox/Checkbox';
import classes from './CoinCard.module.scss';

import CoinService from '../../services/index';
import { cutValueAfterPoint } from '../../utils';

const initialChartState = {
  isOpen: false,
  data: [],
  period: 'm15'
}

const CoinCard = ({ value, addFavorits }) => {
  const { id, symbol, name, priceUsd, changePercent24Hr } = value;
  const [price, setPrice] = useState(cutValueAfterPoint(priceUsd));
  const [chartState, setChartState] = useState(initialChartState);

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
    if (!chartState.isOpen) {
      CoinService.history(id, chartState.period , result => {
        setChartState({...chartState,data:result.data ,isOpen: true})
      })
    } else {
      console.log('aa')
      setChartState({...chartState, isOpen: false})
    }
  }

  const imageSrc = `https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? classes.green : classes.red;
  return (
    <div className={classes.CoinCard}>
      <Checkbox click={()=>addFavorits(id)} className={classes.Checkbox} coin={id}/>
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
        {chartState.isOpen ? <Chart data={chartState.data}  rise={changePercent24Hr > 0}/> : null}
      </div>
      {
        chartState.isOpen ? 
        <div> 
          <button>12H</button>
          <button>1D</button>
          <button>1W</button>
          <button>1M</button>
          <button>1Y</button>
        </div> 
        : null
      }
    </div>
  )
}

export default CoinCard;

import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import Checkbox from '../Checkbox/Checkbox';
import classes from './CoinCard.module.scss';

import CoinService from '../../services/index';
import { cutValueAfterPoint, chartPeriod } from '../../utils';

const initialChartState = {
  isOpen: false,
  data: [],
  period: '12H'
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

  const fetchPriceHistory = () => {
    if (!chartState.isOpen) {
      const timeInterval = chartPeriod(chartState.period).history
      CoinService.history(id, timeInterval, result => {
        setChartState({ ...chartState, data: result.data, isOpen: true })
      })
    } else {
      setChartState({ ...chartState, isOpen: false })
    }
  }

  const changePeriod = period => {
    const timeInterval = chartPeriod(chartState.period).history
    CoinService.history(id, timeInterval, result => {
      setChartState({ ...chartState, data: result.data, period })
    })
  }

  const imageSrc = `https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? classes.green : classes.red;
  return (
    <div className={classes.CoinCard}>
      <Checkbox click={() => addFavorits(id)} className={classes.Checkbox} coin={id} />
      <div className={classes.Row} onClick={fetchPriceHistory}>
        <img className={classes.Image} src={imageSrc} alt="icon" draggable="false" />
        <div className={classes.Name}><b>{symbol}</b> | <span>{name}</span></div>
        <div className={classes.Persent}>
          <b>24h: </b>
          <span className={percentClass}>{percent}%</span>
        </div>
        <span className={classes.Price}>${price}</span>
      </div>
      <div>
        {chartState.isOpen ?
          <Chart data={chartState.data}
            rise={changePercent24Hr > 0}
            timeInterval={chartPeriod(chartState.period).time} />
          : null}
      </div>
      {
        chartState.isOpen ?
          <div>
            {TIME_PERIODS.map(time => {
              return (<button onClick={() => changePeriod(time)} key={time}>{time}</button>)
            })}
          </div>
          : null
      }
    </div>
  )
}

const TIME_PERIODS = ['12h', '1D', '1W', '1M', '1Y'];

export default CoinCard;

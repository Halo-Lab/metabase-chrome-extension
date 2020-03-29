import React, { useState, useEffect } from 'react';
import Chart from '../Chart/Chart';
import Checkbox from '../Checkbox/Checkbox';
import classes from './CoinCard.module.scss';
import PropTypes from 'prop-types';

import CoinService from '../../services/index';
import { cutValueAfterPoint, chartPeriod } from '../../utils';

const initialChartState = {
  isOpen: false,
  data: [],
  period: '12H'
};

const CoinCard = ({ value, addFavorits, index, isFavorite }) => {
  const { id, symbol, name, priceUsd, changePercent24Hr } = value;
  const [price, setPrice] = useState(cutValueAfterPoint(priceUsd));
  const [chartState, setChartState] = useState(initialChartState);
  const [priceState, setPriceState] = useState(null);
  useEffect(() => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`);
    pricesWs.onmessage = function(msg) {
      const dataFromServer = cutValueAfterPoint(JSON.parse(msg.data)[id]);
      const priceStateClass = dataFromServer > price ? classes.up : classes.down;
      setPriceState(priceStateClass);
      setPrice(dataFromServer);
    };
    return () => {
      pricesWs.close();
    };
  }, [id]);

  const fetchPriceHistory = () => {
    if (!chartState.isOpen) {
      const timeInterval = chartPeriod(chartState.period).history;
      CoinService.history(id, timeInterval, result => {
        setChartState({ ...chartState, data: result.data, isOpen: true });
      });
    } else {
      setChartState({ ...chartState, isOpen: false });
    }
  };

  const changePeriod = period => {
    const timeInterval = chartPeriod(period).history;
    CoinService.history(id, timeInterval, result => {
      setChartState({ ...chartState, data: result.data, period });
    });
  };

  const imageSrc = `https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  const percent = cutValueAfterPoint(changePercent24Hr, 'percent');
  const percentClass = changePercent24Hr > 0 ? classes.green : classes.red;
  return (
    <div className={classes.card}>
      <Checkbox
        click={() => addFavorits(id)}
        coin={id}
        isChecked={isFavorite}
        addClass={classes.checkbox}
      />
      <div className={classes.row} onClick={fetchPriceHistory}>
        <img className={classes.image} src={imageSrc} alt="icon" draggable="false" />
        <div className={classes.name}>
          <p>
            {index}.{name}
          </p>
          <span>{symbol}</span>
        </div>
        <span className={classes.price}>${price}</span>
        <div className={`${classes.arrow} ${priceState}`}>
          <span></span>
        </div>
        <div className={classes.persent}>
          <span className={percentClass}>{percent}%</span>
        </div>
      </div>
      {chartState.isOpen ? (
        <div className={classes.wrapper}>
          <Chart
            data={chartState.data}
            rise={changePercent24Hr > 0}
            timeInterval={chartPeriod(chartState.period).time}
          />
          <div className={classes.buttons}>
            {TIME_PERIODS.map(time => {
              const isActive = time === chartState.period ? classes.active : '';
              return (
                <button
                  onClick={() => changePeriod(time)}
                  key={time}
                  className={`${classes.button} ${isActive}`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const TIME_PERIODS = ['12H', '1D', '1W', '1M', '1Y'];

CoinCard.propTypes = {
  value: PropTypes.object,
  addFavorits: PropTypes.func,
  index: PropTypes.number,
  isFavorite: PropTypes.bool
};

export default CoinCard;

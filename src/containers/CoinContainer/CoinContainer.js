import React, { useState, useEffect } from 'react';
import classes from './CoinContainer.module.scss';
import CoinCard from '../../components/CoinCard';
import CoinService from '../../services/index';

import Autocomplete from '../../components/Autocomplite/Autocomplite';


const CoinContainer = () => {
  const [data, setData] = useState([]);
  const [favorits, setFavorits] = useState([]);
  useEffect(() => {
    fetchCoins();
  }, [])

  const fetchCoins = () => {
    CoinService.limit(0,5,result => setData(result.data));
  }

  const handleClick = name => {
    CoinService.findCoin(name, result => setData([result.data]))
  }
  const sortFavorits = () => {
    const names = favorits.join(',');
    // console.log(names);
    CoinService.findCoins(names,result => setData(result['data']));
    
  }

  const addToFavorits = id => {
    if (favorits.includes(id)) {
      setFavorits(favorits.filter(item => item !== id));
    } else {
      favorits.push(id);
    }
  }

  return (
    <div className={classes.CoinContainer}>
      <div>
        <Autocomplete
          handleClick={handleClick}
        />
        <button onClick={fetchCoins}>All coins</button>
        <button onClick={sortFavorits}>Favorits</button>
      </div>
      {data.map(coin =>
        <CoinCard value={coin} key={coin.id} addFavorits={addToFavorits} />
      )}
    </div>
  )
}

export default CoinContainer;
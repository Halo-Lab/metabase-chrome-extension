import React, { useState, useEffect } from 'react';
import classes from './CoinContainer.module.scss';
import CoinCard from '../../components/CoinCard';

import Autocomplete from '../../components/Autocomplite/Autocomplite';


const CoinContainer = () => {
  const [data, setData] = useState([]);
  const [favorits, setFavorits] = useState([]);
  useEffect(() => {
    fetchAllCoins();
  }, [])

  const fetchAllCoins = () => {
    fetch("https://api.coincap.io/v2/assets?limit=10")
      .then(response => response.json())
      .then(result => setData(result.data))
      .catch(error => console.log('error', error));
  }

  const handleClick = name => {
    fetch(`https://api.coincap.io/v2/assets/${name}`)
      .then(response => response.json())
      .then(result => setData([result.data]))
      .catch(error => console.log('error', error));
  }
  const sortFavorits = () => {
    fetch("https://api.coincap.io/v2/assets?limit=10")
      .then(response => response.json())
      .then(result => {
        const res = result['data'].filter(f => favorits.includes(f.id));
        setData(res)
      })
      .catch(error => console.log('error', error));
  }

  const addToFavorits = id => {
    if (favorits.includes(id)) {
      setFavorits(favorits.filter(item => item !== id));
      return;
    }
    return setFavorits([...favorits, id]);
  }

  return (
    <div className={classes.CoinContainer}>
      <div>
        <Autocomplete
          handleClick={handleClick}
        />
        <button onClick={fetchAllCoins}>All coins</button>
        <button onClick={sortFavorits}>Favorits</button>
      </div>
      {data.map(coin =>
        <CoinCard value={coin} key={coin.id} addFavorits={addToFavorits} />
      )}
    </div>
  )
}

export default CoinContainer;
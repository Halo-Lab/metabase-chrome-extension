import React, { useState, useEffect } from 'react';
import classes from './CoinContainer.module.scss';
import CoinCard from '../../components/CoinCard';

import Autocomplete from '../../components/Autocomplite';


const CoinContainer = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch("https://api.coincap.io/v2/assets?limit=10")
    .then(response => response.json())
    .then(result => setData(result.data))
    .catch(error => console.log('error', error));  
  },[])

  const coinNameList = data.map(coin => coin['id']);

  return (
    <div className={classes.CoinContainer}>
      <div>
      <Autocomplete
        suggestions={coinNameList}
      />
      </div>
      {data.map(coin => 
        <CoinCard value={coin} key={coin.id} />
      )}
    </div>
  )
}

export default CoinContainer;
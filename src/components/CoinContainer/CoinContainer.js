import React, { useState, useEffect } from 'react';

import classes from './CoinContainer.module.scss';
import CoinCard from '../CoinCard';


const CoinContainer = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    console.log('update')
    fetch("https://api.coincap.io/v2/assets?limit=10")
    .then(response => response.json())
    // .then(result => console(result.data))
    .then(result => setData(result.data))
    .catch(error => console.log('error', error));  
  },[])

  return (
    <div className={classes.CoinContainer}>
      {data.map(coin => 
        <CoinCard value={coin} key={coin.id} />
      )}
    </div>
  )
}

export default CoinContainer;
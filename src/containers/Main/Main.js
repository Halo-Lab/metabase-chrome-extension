import React, { useState, useEffect } from 'react';
import classes from './Main.module.scss';
import CoinCard from '../../components/CoinCard';
import CoinService from '../../services/index';
import Header from '../../components/Header';
import TableHeader from '../../components/TableHeader';

const initialFavoritesState = {
  isActive: false,
  list: []
};
const CoinContainer = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(initialFavoritesState);
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = () => {
    CoinService.limit(0, 10, result => setData(result.data));
  };

  // const handleClick = name => {
  //   CoinService.findCoin(name, result => setData([result.data]))
  // }
  const sortFavorits = () => {
    if (favorites.isActive) {
      fetchCoins();
    } else {
      const names = favorites.list.join(',');
      CoinService.findCoins(names, result => setData(result['data']));
    }
    setFavorites({ ...favorites, isActive: !favorites.isActive });
  };

  const addToFavorits = id => {
    if (favorites.list.includes(id)) {
      const newFavoritesList = favorites.list.filter(item => item !== id);
      const names = newFavoritesList.join(',');
      setFavorites({ ...favorites, list: newFavoritesList });
      if (favorites.isActive) {
        CoinService.findCoins(names, result => setData(result['data']));
      }
    } else {
      favorites.list.push(id);
    }
  };

  return (
    <div className={classes.CoinContainer}>
      <Header />
      <TableHeader />
      {data.map((coin, index) => (
        <CoinCard value={coin} key={coin.id} addFavorits={addToFavorits} index={index + 1} />
      ))}
    </div>
  );
};

export default CoinContainer;

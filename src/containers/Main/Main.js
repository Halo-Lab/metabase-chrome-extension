import React, { useState, useEffect, Fragment } from 'react';
import classes from './Main.module.scss';
import CoinCard from '../../components/CoinCard';
import CoinService from '../../services/index';
import Header from '../../components/Header';
import TableHeader from '../../components/TableHeader';

const initialFavoritesState = {
  isActive: false,
  list: localStorage.getItem('favorites') ? localStorage.getItem('favorites').split(',') : []
};

const initialActiveCoins = 4;

const CoinContainer = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(initialFavoritesState);
  const [activeCoins, setActiveCoins] = useState(initialActiveCoins);

  useEffect(() => {
    fetchCoins();
  }, [activeCoins]);

  const fetchCoins = () => {
    CoinService.limit(0, activeCoins, result => {
      setData(
        result.data.map(item => {
          console.log({ ...item, isFavorite: favorites.list.includes(item.id) });
          return { ...item, isFavorite: favorites.list.includes(item.id) };
        })
      );
    });
  };

  const findCoin = name => {
    CoinService.findCoin(name, result => setData([result.data]));
  };
  const sortFavorits = () => {
    if (favorites.list.length === 0) {
      return;
    }
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
      localStorage.setItem('favorites', favorites.list);
      if (favorites.isActive) {
        CoinService.findCoins(names, result => setData(result['data']));
      }
    } else {
      favorites.list.push(id);
      localStorage.setItem('favorites', favorites.list);
    }
  };

  const showMoreCoinsClick = () => {
    const newValue = activeCoins + initialActiveCoins;
    setActiveCoins(newValue);
  };

  return (
    <div className={classes.container}>
      <Header findCoin={findCoin} getCoins={fetchCoins} sortFavorits={sortFavorits} />
      <TableHeader />
      <div className={classes.CoinContainer}>
        {data.map((coin, index) => (
          <CoinCard
            value={coin}
            key={coin.id}
            addFavorits={addToFavorits}
            isFavorite={coin.isFavorite}
            index={index + 1}
          />
        ))}
        <button onClick={showMoreCoinsClick} className={classes.button}>
          View More
        </button>
      </div>
    </div>
  );
};

export default CoinContainer;

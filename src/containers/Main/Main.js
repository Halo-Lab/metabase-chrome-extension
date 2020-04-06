import React, { useState, useEffect } from 'react';
import classes from './Main.module.scss';
import CoinCard from '../../components/CoinCard';
import CoinService from '../../services/index';
import Header from '../../components/Header';
import TableHeader from '../../components/TableHeader';
import Favorites from '../../components/Favorite';

const initialFavoritesState = {
  list: localStorage.getItem('favorites') ? localStorage.getItem('favorites').split(',') : [],
  data: []
};

const initialActiveCoins = 4;

const CoinContainer = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(initialFavoritesState);
  const [activeCoins, setActiveCoins] = useState(initialActiveCoins);

  useEffect(() => {
    fetchCoins();
    sortFavorits();
    localStorage.setItem('favorites', favorites.list);
  }, [activeCoins, favorites.list]);

  const fetchCoins = () => {
    CoinService.limit(0, activeCoins, result => {
      setData(
        result.data.map(item => {
          return { ...item, isFavorite: favorites.list.includes(item.id) };
        })
      );
    });
  };

  const findCoin = name => {
    CoinService.findCoin(name, result => setData([result.data]));
  };

  const sortFavorits = () => {
    if (favorites.list.length > 0) {
      const names = favorites.list.join(',');
      CoinService.findCoins(names, result => {
        const favoriteData = result.data.map(item => {
          return { ...item, isFavorite: favorites.list.includes(item.id) };
        });
        setFavorites({ ...favorites, data: favoriteData });
      });
    } else {
      setFavorites({ ...favorites, data: [] });
    }
  };

  const toogleFavorite = id => {
    if (favorites.list.includes(id)) {
      const newFavoritesList = favorites.list.filter(item => item !== id);
      setFavorites({ ...favorites, list: newFavoritesList });
    } else {
      const newFavoritesList = [...favorites.list, id];
      setFavorites({ ...favorites, list: newFavoritesList });
    }
  };

  const showMoreCoinsClick = () => {
    const newValue = activeCoins + initialActiveCoins;
    setActiveCoins(newValue);
  };

  return (
    <div className={classes.container}>
      <Header findCoin={findCoin} getCoins={fetchCoins} />
      {favorites.data.length > 0 ? (
        <Favorites data={favorites.data} toogleFavorite={toogleFavorite} />
      ) : null}
      <TableHeader />
      <div className={classes.CoinContainer}>
        {data.map((coin, index) => (
          <CoinCard
            value={coin}
            key={coin.id}
            addFavorits={toogleFavorite}
            isFavorite={coin.isFavorite}
            index={index + 1}
          />
        ))}
      </div>
      <button onClick={showMoreCoinsClick} className={classes.button}>
        View More
      </button>
    </div>
  );
};

export default CoinContainer;

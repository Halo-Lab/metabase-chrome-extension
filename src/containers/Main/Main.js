import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import classes from './Main.module.scss';
import CoinCard from '../../components/CoinCard';
import CoinService from '../../services/CoinService';
import Header from '../../components/Header';
import TableHeader from '../../components/TableHeader';
import Favorites from '../../components/Favorite';
import Tabs from '../../components/Tabs';

import Currency from '../../components/Currency';
import CurrencyService from '../../services/CurrencyService';

import isoCodes from '../../variables/isoCodes';
import Favorite from '../../components/Favorite';

const initialFavoritesState = {
  list: localStorage.getItem('favorites') ? localStorage.getItem('favorites').split(',') : [],
  data: []
};

const initialActiveCoins = 4;
const initialActiveCurrencies = 4;

const CoinContainer = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(initialFavoritesState);
  const [activeCoins, setActiveCoins] = useState(initialActiveCoins);
  const [activeCurrency, setActiveCurrency] = useState(initialActiveCoins);
  const [activeTab, setActiveTab] = useState(0);

  const [curData, setCurData] = useState([]);
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

  const findCurrency = name => {
    CurrencyService.findCoin(name, res => setCurData(res.rates))
  }

  const sortFavorits = () => {
    if (favorites.list.length > 0) {
      const names = favorites.list.join(',');
      let currencyNames = []
      for (let i of favorites.list) {
        if (Object.keys(isoCodes).includes(i)) {
          currencyNames.push(i)
        }
      }

      const namesC = currencyNames.join(',');

      CurrencyService.findCoin(namesC, result => {
// Yes

        console.log(result.rates)
        const favoriteData = { ...result.rates, isFavorite: favorites.list.includes(result.base) };
        setFavorites({ ...favorites, data: favoriteData });
      });
      

      CoinService.findCoins(names, result => {
        const favoriteData = result.data.map(item => {
          return { ...item, isFavorite: favorites.list.includes(item.id) };
        });
        setFavorites({ ...favorites, data: favoriteData });
      });

    } else {
      setFavorites({ ...favorites, data: [] });
    }

    console.log(favorites)

  };

  const toogleFavorite = name => {
    if (favorites.list.includes(name)) {
      const newFavoritesList = favorites.list.filter(item => item !== name);
      setFavorites({ ...favorites, list: newFavoritesList });
    } else {
      const newFavoritesList = [...favorites.list, name];

      setFavorites({ ...favorites, list: newFavoritesList });
    }
  };

  const showMoreCoinsClick = () => {
    if (activeTab) {
      const newValue = activeCurrency + initialActiveCurrencies;
      setActiveCurrency(newValue);
    } else {
      const newValue = activeCoins + initialActiveCoins;
      setActiveCoins(newValue);
    }
  };

  useEffect(() => {
    fetchCoins();
    sortFavorits();
    localStorage.setItem('favorites', favorites.list);
  }, [activeCoins, favorites.list]);

  const changeActiveTab = s => {
    setActiveTab(s);
  };

  const isActive = classNames(classes.tab, classes.tab__active);

  return (
    <div className={classes.container}>
      <Header findCoin={findCoin} getCoins={fetchCoins} activeTab={activeTab} findCurrency={findCurrency}/>
      {favorites.data.length > 0 ? (
        <Favorites data={favorites.data} toogleFavorite={toogleFavorite} />
      ) : null}
      <Tabs
        data={activeTab}
        onchange={e => {
          changeActiveTab(e);
        }}
      />
      <TableHeader />
      <div className={classes.CoinContainer}>
        <div className={activeTab === 0 ? isActive : classes.tab}>
          {data.map((coin, index) => {
            if (coin) {
              return (
                <CoinCard
                value={coin}
                key={coin.id}
                addFavorits={toogleFavorite}
                isFavorite={coin.isFavorite}
                index={index + 1}
              />
              )
            }
          })}
        </div>
        <div className={activeTab === 1 ? isActive : classes.tab}>
          <Currency findData={curData} addFavorits={toogleFavorite} count={activeCurrency} />
        </div>
      </div>
      <button onClick={showMoreCoinsClick} className={classes.button} type="button">
        View More
      </button>
    </div>
  );
};

export default CoinContainer;

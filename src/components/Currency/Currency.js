import React, { useState, useEffect } from 'react';
import CurrencyService from '../../services/CurrencyService';
import CurrencyItem from '../CurrencyItem';

const Currency = () => {
  const [data, setData] = useState(null);

  const getCurrency = async () => {
    const res = await CurrencyService.fetch('https://api.exchangerate.host/latest?base=UAH');
    setData(res.rates);
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return <CurrencyItem data={data} />;
};

export default Currency;

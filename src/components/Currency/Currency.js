import React, { useState, useEffect } from 'react';
import CurrencyService from '../../services/CurrencyService';
import CurrencyCard from '../CurrencyCard';

const Currency = () => {
  const [data, setData] = useState(null);

  const getCurrency = async () => {
    const res = await CurrencyService.baseValue('UAH');
    setData(res.rates);
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return <CurrencyCard data={data} />;
};

export default Currency;

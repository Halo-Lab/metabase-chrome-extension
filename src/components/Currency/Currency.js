import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CurrencyService from '../../services/CurrencyService';
import CurrencyCard from '../CurrencyCard';

import VARIABLES from '../../variables';

  const Currency = ({ count, addFavorits, findData}) => {
  const [data, setData] = useState(null);
  const [base, setBase] = useState(null);

  const activeCurrency = count;

  const getItems = async () => {
    const iso = VARIABLES.isoCodes;
    const arrayOfCurrency = Object.keys(iso);
    arrayOfCurrency.splice(activeCurrency);

    const currencies = await CurrencyService.limit(arrayOfCurrency);
    setData(currencies.rates);
    setBase(currencies.base);
  };

  useEffect(() => {
    getItems();
  }, [activeCurrency]);

  useEffect(() => {
    setData(findData);
  }, [findData])

  return <CurrencyCard data={data} addFavorits={addFavorits} base={base} />;
};

Currency.defaultProps = {
  count: 4
};

Currency.propTypes = {
  count: PropTypes.number
};

export default Currency;

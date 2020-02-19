import React from 'react';

import Header from '../components/Header';
import CoinContainer from './CoinContainer';

import '../style/index.scss';

const Index = () => {
  return (
    <div className="container">
      <Header />
      <CoinContainer />
    </div>
  )
}

export default Index;
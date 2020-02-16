import React from 'react';

import Header from '../components/Header';
import CoinCard from '../components/CoinCard';

import '../style/index.scss';

const Index = () => {
  return (
    <div className="container">
      <Header />
      <CoinCard />
    </div>
  )
}

export default Index;
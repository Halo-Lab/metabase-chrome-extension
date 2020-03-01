
export const transformToStringWithPoint = (cost, symbol) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',' + (symbol || ''));
}

export const cutValueAfterPoint = (price, type = 'price') => {
  const newPrice = Number(price);
  const numberAfterPoint = newPrice < 1 && type !== 'percent' ? 6 : 2;
  return newPrice.toFixed(numberAfterPoint);
}

const DAY_MILLISECONDS = 86400000;

export const chartPeriod = period => {
  switch (period) {
    case '12H': return {
      history: 'm15',
      time: DAY_MILLISECONDS / 2
    }
    case '1D': return {
      history: 'm30',
      time: DAY_MILLISECONDS
    }
    case '1W': return {
      history: 'h2',
      time: DAY_MILLISECONDS * 7
    }
    case '1M': return {
      history: 'h12',
      time: DAY_MILLISECONDS * 30
    }
    case '1Y': return {
      history: 'd1',
      time: DAY_MILLISECONDS * 365
    }
    default: return {
      history: 'm15',
      time: DAY_MILLISECONDS / 2
    }
  }
}
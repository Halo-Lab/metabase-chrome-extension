
export const transformToStringWithPoint = (cost, symbol) => {
  return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',' + (symbol || ''));
}

export const cutValueAfterPoint = (price, type = 'price') => {
  const newPrice = Number(price);
  const numberAfterPoint = newPrice < 1 && type !== 'percent' ? 6 : 2;
  return newPrice.toFixed(numberAfterPoint);
}


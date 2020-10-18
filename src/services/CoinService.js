const CoinService = {
  baseUrl: 'https://api.coincap.io/v2/',
  fetch(url, callback) {
    return fetch(url)
      .then(response => response.json())
      .then(callback)
      .catch(error => console.log('error', error));
  },
  findCoin(name, callback) {
    const url = `${this.baseUrl}assets/${name}`;
    console.log(url)
    return this.fetch(url, callback);
  },
  findCoins(names, callback) {
    const url = `${this.baseUrl}assets?ids=${names}`;
    return this.fetch(url, callback);
  },
  limit(offset = 0, limit, callback) {
    const url = `${this.baseUrl}assets?offset=${offset}&limit=${limit}`;
    return this.fetch(url, callback);
  },
  history(name, period, callback) {
    const url = `${this.baseUrl}assets/${name}/history?interval=${period}`;
    return this.fetch(url, callback);
  }
};

export default CoinService;

const CurrencyService = {
  baseUrl: 'https://api.exchangerate.host/latest?',
  baseUrlForCountriesInfo: `https://restcountries.eu/rest/v2/currency/`,
  base: 'UAH',
  fetch(url, callback) {
    return fetch(url)
      .then(response => response.json())
      .then(callback)
      .catch(error => console.log('error', error));
  },
  baseValue(name, callback) {
    const url = `${this.baseUrl}base=${name}`;
    return this.fetch(url, callback);
  },
  countries(name) {
    const url = `${this.baseUrlForCountriesInfo}${name}`;
    return this.fetch(url);
  },
  limit(names, callback) {
    const url = `${this.baseUrl}base=${this.base}&symbols=${names}`;
    return this.fetch(url, callback);
  },
  findCoin(name, callback) {
    const url = `${this.baseUrl}base=${this.base}&symbols=${name}`;
    console.log(url)
    return this.fetch(url, callback)
  }
};

export default CurrencyService;

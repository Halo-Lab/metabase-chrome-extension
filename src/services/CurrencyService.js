const CurrencyService = {
  baseUrl: 'https://api.exchangerate.host/latest?',
  baseUrlForCountriesInfo: `https://restcountries.eu/rest/v2/currency/`,
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
  }
};

export default CurrencyService;

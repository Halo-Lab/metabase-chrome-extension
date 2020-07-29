const CurrencyService = {
  baseUrl: 'https://api.exchangerate.host/latest/',
  fetch(url, callback) {
    return fetch(url)
      .then(response => response.json())
      .then(callback)
      .catch(error => console.log('error', error));
  },
  base(name, callback) {
    const url = `${this.baseUrl}base=${name}`;
    return this.fetch(url, callback);
  }
};

export default CurrencyService;

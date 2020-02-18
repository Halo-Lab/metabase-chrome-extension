function getData() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.coincap.io/v2/assets?limit=1", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result.data))
    .catch(error => console.log('error', error));
}

export default getData;
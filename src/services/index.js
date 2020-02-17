function getData() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("api.coincap.io/v2/assets", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export default getData;
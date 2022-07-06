const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlAPI, callback) {
  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', urlAPI, true)
  xhttp.onreadystatechange = function (event) {
    /** 
     * xhttp.readyState === 0 => no se ha inicializado
     * xhttp.readyState === 1 => loading
     * xhttp.readyState === 2 => se ejecuta send
     * xhttp.readyState === 3 => interactuando o trabajando con la solicitud
     * xhttp.readyState === 4 => llamada completada
     */
    if (xhttp.readyState === 4) { // check state of request
      if (xhttp.status === 200) { // check state of response
        callback(null, JSON.parse(xhttp.responseText)) // turn to json
      } else {
        const error = new Error('Error' + urlAPI)
        return callback(error, null)
      }
    }
  }
  xhttp.send()
}

// first call
fetchData(`${API}/products`,(error1, data1) => {
  if(error1) return console.error(error1)

  // second call
  fetchData(`${API}/products/${data1[0].id}`,(error2, data2) => {
    if(error2) return console.error(error2)

    // third call
    fetchData(`${API}/categories/${data2?.category.id}`, (error3, data3) => {
      if (error3) return console.error(error3)
      console.log(data1[0].id)
      console.log(data2.title)
      console.log(data3.name)
    })
  })
})
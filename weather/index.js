// require the request package
const request = require('request');

let apiKey = ;
let city = ' ';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// Pass in url and request returns a callback function with three arguments
request(url, function (err, response, body) {
    // check for an error in request
    if(err){
      console.log('error:', error);
    //   if there's no error, then log the contents of the response body
    } else {
    //   console.log('body:', body);
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}`;
    console.log(message)
    }
  });



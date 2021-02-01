const { response } = require('express');
const request=require('request');

const forecast=(lati,longi,location,callback)=>{
const url='http://api.weatherstack.com/current?access_key=cec798594b39d8c40ba7318a943dfedc&query='+lati+','+longi;

 request({url,json:true},(error,response)=>{
     if(error)
     {
         callback("Weather Service Unavailable",undefined);
     }
     else if(response.body.error)
     {
        callback('Unable to find location',undefined);
     }
     else
     {
         callback(undefined,
        response.body.location.name+', '+response.body.location.country,
        'Current Temperature is '+response.body.current.temperature+' , and Humidity is '+response.body.current.humidity+'!!');
     }
 })

}
module.exports=forecast;
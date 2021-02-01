
const expresslayouts=require('express-ejs-layouts');
const geocode=require('./playground/geocode.js')
const forecast=require('./playground/forecast.js')
const path=require('path');
const express=require('express');
const app=express();
app.use(express.static(path.join(__dirname,'public')));
app.use(expresslayouts);
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')
app.get('',(req,res)=>{
    res.render('index',{
        title:'Help',
        name:'Kira'
    })
})
 app.get('/weather',(req,res)=>{
     if(!req.query.address)
     {
         return res.send("Must Provide Address!!")
     }
    geocode(req.query.address,(error,{lati,longi,location}) =>{
        forecast(lati,longi,location,(error,locat ,data)=>{
            res.send({
                forecast: data,
                location: locat,
                title: 'Weather',
                name: 'Kira'
            })
        })
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Kira'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Kira'
    })
})
app.listen(3000,()=>{
    console.log('Server is on')
})
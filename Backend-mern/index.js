const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./Routes');

const app= express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE");
    next();
});



app.use(routes);

app.use((error,req,res,next)=>{
    if(res.headerSent){
       return next(error); 
    }
    res.status(error.code || 500);//internal server error
    res.json({message:error.message || "An unknown error occured!"});
});


mongoose.connect("mongodb+srv://zeba_mulla_20:zeba2__@emp-system-mern.uuwkpyl.mongodb.net/emp-system-mern?retryWrites=true&w=majority")
.then(()=>{

app.listen(5000);
})
.catch(err=>{
    console.log(err);
});




// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const devRoute = require('./routes/dev');
const companyRoute = require('./routes/company');
require('dotenv/config')



// INIT EXPRESS
const app = express();



//CONNECTION TO DB
mongoose.connect(
    process.env.DB_CONNECTION, {useNewUrlParser : true, useUnifiedTopology : true });

    

//CONFIG
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });




//ROUTES
app.use('/dev', devRoute);
app.use('/company', companyRoute);





//START APP
app.listen(3000);
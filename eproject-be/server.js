const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const employeeRoutes = require('./routes/employee');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const projectRoutes = require('./routes/project');

const app = express();

mongoose.connect(config.DATABASE_CONNECT_URL, err => {
    if(err) {
        console.log(err);
    } else {
        console.log('Connect database successful');
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);

app.use(`${config.API}/accounts`, employeeRoutes);
app.use(`${config.API}/projects`, projectRoutes);


app.listen(config.PORT, err => {
    console.log('Listen on port ' + config.PORT);
})
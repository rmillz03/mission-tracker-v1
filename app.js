if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');                       //logs requests directed to backend
const session = require('express-session');
const cookieParser = require('cookie-parser');          //reads cookie header data
const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/mainLayout')
app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false })) //need to allow pages to access form data


//----------- Sessions -----------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }  // 24hr in milliseconds
}));
app.use(cookieParser());


//----------- Routes -----------
const userRoute = require('./routes/userRoute');
app.use('/userRoute', userRoute);
const flightRoute = require('./routes/flightRoute');
app.use('/flightRoute', flightRoute);
const crewRoute = require('./routes/crewRoute');
app.use('/crewRoute', crewRoute);
const planeRoute = require('./routes/planeRoute');
//const { application } = require('express');
app.use('/planeRoute', planeRoute);


//----------- Get the Party Started! -----------
app.get('/', (req, res) => {
    res.redirect('/userRoute/login');
    //res.render('/users/login.ejs');
});
 
app.listen(port, () => console.log("Server is running..."));
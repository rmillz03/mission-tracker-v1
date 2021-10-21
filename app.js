if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');                       //logs requests directed to backend
const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/mainLayout')
app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false })) //need to allow pages to access form data

//----------- Routes -----------
const userRoute = require('./routes/userRoute');
app.use('/userRoute', userRoute);
// const flightRoute = require('./routes/flightRoute');
// app.use('/flightRoute', flightRoute);
// const crewRoute = require('./routes/crewRoute');
// app.use('/crewRoute', crewRoute);
// const planeRoute = require('./routes/planeRoute');
// app.use('/planeRoute', planeRoute);


//----------- Get the Party Started! -----------
app.get('/', (req, res) => {
    res.redirect('/userRoute/login');
    //res.render('/users/login.ejs');
});
 
app.listen(port, () => console.log("Server is running..."));
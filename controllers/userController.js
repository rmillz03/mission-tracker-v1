const session = require('express-session');
const { authenticate } = require('passport');
const passport = require('passport');
//const flash = require('connect-flash');
const User = require('../models/userModel');


// *****************************
//         LOGIN / LOGOUT
// *****************************
exports.login = (req, res) => {
    const errors = req.flash().error || "";
    console.log('Errors: ' + errors);
    res.render('users/login.ejs', { layout: 'layouts/loginLayout', errors: errors });
}

exports.submitLogin = (req, res) => {
    req.session.user = req.user[0].first_name;
    res.redirect('/userRoute/dashboard');
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/userRoute/login');
}

// *****************************
//         REGISTRATION
// *****************************
exports.reg = async (req, res, next) => {
    const errors = req.flash().error || "";
    res.render('users/register.ejs', { layout: 'layouts/loginLayout', errors: errors });
}

exports.submitReg = async (req, res, next) => {
    const body = req.body;

    let newUser = new User(
        body.firstName,
        body.lastName,
        body.email,
        body.password  
    );

    newUser = await newUser.save();

    res.redirect('/userRoute/login');
}

// *****************************
//         DASHBOARD
// *****************************

exports.dashboard = (req, res) => {
    res.render('users/dashboard.ejs', { firstName: req.session.user });
}


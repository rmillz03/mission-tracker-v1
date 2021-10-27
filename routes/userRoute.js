const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const passport = require('passport');
const session = require('express-session');

function ensureAuthenticated(req, res, next)
{
    if ( req.isAuthenticated() ) 
    { 
        return next(); 
    }
    
    res.redirect('/userRoute/login')
}

router
    .route("/login")
    .get(userController.login)
    .post(
        passport.authenticate('local', { failureRedirect: userController.login }),
        userController.submitLogin
        );

router
    .route("/register")
    .get(userController.reg)
    .post(userController.submitReg);

router
    .route("/dashboard")
    .get(
        ensureAuthenticated,
        userController.dashboard
    );

module.exports = router;

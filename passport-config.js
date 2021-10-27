const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

passport.use(new LocalStrategy({ usernameField: 'email' },
    async function (username, password, done) 
    {
        let [user, _] = await UserModel.findOne(username);
        
        //check user exists
        if (!user) 
        { 
            console.log("Incorrect username");
            return done(null, false); 
        }
        else
        {
            console.log("User exists...");
        }
        
        //verify password
        if (user[0].password !== password) 
        { 
            console.log('Incorrect password');
            return done(null, false); 
        }
        else
        {
            console.log("Password verified....");
        }

        //user was authenticated
        //req.session.user = user[0].first_name;
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user[0].idUser);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

passport.use(new LocalStrategy({ usernameField: 'email' },
    async function (username, password, done) 
    {
        let [user, _] = await UserModel.findOne(username);
        
        console.log(user);

        //check user exists
        if (!user[0]) 
        { 
            console.log("Incorrect username");
            return done(null, false, { message: 'invalid email address / email not found' }); 
        }
        else
        {
            console.log("User exists...");
        }
        
        //verify password
        if (user[0].password !== password) 
        { 
            console.log('Incorrect password');
            return done(null, false, { message: 'invalid password' }); 
        }
        else
        {
            console.log("Password verified....");
        }

        //user was authenticated
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user[0].idUser);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});
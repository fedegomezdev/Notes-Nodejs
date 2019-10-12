const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');


passport.use(new LocalStrategy ({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email : email});
    if(!user){ 
        return done(null, false , {message : 'Not user Found'})
    } else {
        const match = await user.MatchPassword(password); //es user en minuscula porque es de la instancia que creamos con User.findone
        if(match){
            return done(null, user);
        } else {
            return done(null, false , {message: 'Incorrect Password'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id , (err, user) => {  
        done(err, user);
    });
});
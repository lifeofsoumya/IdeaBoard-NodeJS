const users = require ('../model/user.js');
const bcrypt = require ('bcryptjs');
const localStrategy = require ('passport-local').Strategy;


module.exports = (passport) => {

    passport.user(new localStrategy({ usernameField : 'email'}, (email, password, done)=>{

    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

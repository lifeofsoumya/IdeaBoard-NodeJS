const users = require ('../model/user.js');
const bcrypt = require ('bcryptjs');
const localStrategy = require ('passport-local').Strategy;


module.exports = (passport) => {

    passport.user(new localStrategy({ usernameField : 'email'}, (email, password, done)=>{
        users.findOne({email:email},(err,data) => {
            if (err) throw err;
            if (!data) {
                return done(null,false, {message: "user Doesn't exist!"});
            }

            bcrypt.compare(password, data.password, (err, match)=>{
                if (err) throw err;
                if (match){
                    return done(null, data);}
                if(!match)  {
                    return done(null, false, {message: "password error!"});
                }            
            })
        })
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

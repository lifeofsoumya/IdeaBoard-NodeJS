const express = require('express');
const users = require('../model/user.js');
const router = express.Router();
var bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/signup", (req, res) => {
    res.render('signup', {csrfToken: req.csrfToken()});
});

router.get("/login", (req, res) => {
    res.render('login', {csrfToken: req.csrfToken()});
});

router.post("/signup", (req,res) =>{
    const {email, username, password, confirmpassword } = req.body;
//checks if all fields are filled
    if (!email || !username || !password || !confirmpassword){
        res.render('signup', {
            csrfToken: req.csrfToken(), 
            err: "All fields are required!"
        });
    }
//checks if passwords are matching
    else if ( password != confirmpassword ){
        res.render('signup', {
            csrfToken: req.csrfToken(), 
            err: "Password should be same!",
    });
}
//checks if diff person is having that email or username
    else{
        var userData = await users.findOne({ 
            $or : [ { email : email}, {username: username}] })
    };

//if userData is valid or true then tell that user exists
    
    if (userData){
        res.render('signup', {
            csrfToken: req.csrfToken(), 
            err: "User exists, try Logging in",
    });
    }

//else hash the password using bcrypt and save in db, redirect to login    
    else{

        var salt = await bcrypt.genSalt(12);
        var hash = await bcrypt.hash(password, salt);

        users({
            email:email, 
            username:username,
            password:hash
        }).save();

        res.redirect('/login');
    }
});





module.exports = router;
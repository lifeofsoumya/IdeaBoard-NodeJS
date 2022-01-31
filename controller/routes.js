const express = require('express');

const router = express.Router();

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

    if (!email || !username || !password || !confirmpassword){
        res.render('signup', {
            csrfToken: req.csrfToken(), 
            err: "All fields are required!"
        });
    }
    else if ( password != confirmpassword ){
        res.render('signup', {
            csrfToken: req.csrfToken(), 
            err: "Password should be same!",
    });
}
    else{

    }
});





module.exports = router;
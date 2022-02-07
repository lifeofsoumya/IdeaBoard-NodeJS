const express = require('express');
const mongoose = require('mongoose');
const mongoURI = require('./config/mongoURI');
const router = require('./controller/routes');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();


//connect to DB
mongoose.connect(
    mongoURI,
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreatedIndex: true},
    (err) => console.log("Connected!")
);
app.use(express.urlencoded({extended:true}));
app.use("/static", express.static(__dirname + "/static"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(cookieParser('randomKey'));
app.use(expressSession({
    secret: "randomKey",
    resave: true,
    maxAge: 24 * 60 * 60 * 1000,
}));


app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next)=>{
    res.locals.error = req.flash('error');
    next();
})
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`started server at ${port}`))

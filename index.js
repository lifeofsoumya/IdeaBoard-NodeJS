const express = require('express');
const mongoose = require('mongoose');
const mongoURI = require('./config/mongoURI');
const router = require('./controller/routes');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

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


app.use(router);
app.use(csrf());

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("started server at 3000"))

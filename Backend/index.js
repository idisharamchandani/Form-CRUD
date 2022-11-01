var express = require('express');
var mongoose = require("mongoose");
var cors = require('cors');
var app = express();
const helmet = require("helmet");
var users=require('./Controllers/users');
require("dotenv").config();

var port = process.env.PORT || 5000;
// const port = 5000;
var connect = mongoose.connect("mongodb://localhost:27017/users");

// app.use(cors({
//   origin: process.env.BASEURL,
//   methods:"GET,HEAD,PUT,PATCH,POST,DELETE"  
// }));
// // require("dotenv").config();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(express.json());
app.use(helmet());
// app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use("/",users);
// app.use("/",question);
// app.use("/",assignment);
// app.use("/",score);

app.get('/home', (req, res) => {
    res.send("Welcome to the Website")
  })
  app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
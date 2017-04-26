// import modules
var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// connect database
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected!");
});
db.on("error", function(err){
  console.log("DB ERROR :", err);
});

// model setting
var postSchema = mongoose.Schema({
  id : {type:String, required:true},
  releaseDate : {type:String, required:true},
  movieName : {type:String, required:true},
  tags : {type:String, required:true},
  actors : {type:String, required:true},
  createdAt : {type:Date, default:Date.now},
  updatedAt : Date
});

// view setting
app.set("view engine", 'ejs');

// set middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// set routes
app.get('/', function(req,res){
  res.render('home');
});

// start server
app.listen(3000, function(){
  console.log('Server On!');
});

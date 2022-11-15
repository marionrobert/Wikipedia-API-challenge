
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// create app instant using express
const app = express();

// setting view engine to EJS as our templating engine
app.set('view engine', 'ejs');

// use bodyParser to pass our requests
app.use(bodyParser.urlencoded({extended: true}));

// use public directory to store our static files (images, css code)
app.use(express.static("public"));

// connect app.js to the DB and create it if doesn't exist
// with property useNewUrlParser to get rid of the errors given by MongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

// create the schemas
const articlesSchema = {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
};

// create the model based on the schema
const Article = mongoose.model("Article", articlesSchema)

// get all articles
app.get("/articles", function(req, res){
  Article.find(function(err, foundArticles){
  // equals to Article.find({}, function(err, allArticles){
    if (!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});


// set app to listen on port 3000
app.listen(3000, function(){
  console.log("Server started on port 3000");
});

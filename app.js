
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
// mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/wikiDB");

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


// REQUESTS TARGETTING ALL ARTICLES
app.route("/articles")
  // get all articles
  .get(function(req, res){
    Article.find(function(err, foundArticles){
    // equals to Article.find({}, function(err, allArticles){
    if (!err){
      res.send(foundArticles);
      // res.render("index", {articles: foundArticles});
    } else {
      res.send(err);
    }
    });
  })
  // up, no ;, it's not the end of the main method cause these are chained methods

  // create one new article
  .post(function(req, res){
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err){
      if (!err) {
        res.send("Successfully added the new article.")
      } else {
        res.send(err);
      }
    });
  })

  // delete all articles
  .delete(function(req, res){
    // equals to Article.deleteMany({}, function(err){
    Article.deleteMany(function(err){
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });


// REQUESTS TARGETTING A SPECIFIC ARTICLE
app.route("/articles/:articleTitle")
  // get the specific article
  .get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No article matches your request.");
      }
    });
  })

  .put(function(req, res){
    Article.replaceOne(
      {title: req.params.articleTitle}, //conditions
      {title: req.body.title, content: req.body.content}, //updates
      {overwrite: true},
      function (err, results) {
        if (!err) {
          res.send("Successfully updated article.");
          console.log(results);
        }
      }
    );
  })

  .patch(function(req, res){
    Article.updateOne(
      {title: req.params.articleTitle}, //conditions = find the article
      {$set: req.body}, //with set flag, updates only the fields that have values in the request's body
      function(err){
        if (!err){
          res.send("Successfully updated article.");
          // res.send("Successfully updated article.")
        } else {
          res.send(err);
        }
      }
    )
  })
  
  .delete(function(req,res){
    Article.deleteOne(
      {title: req.params.articleTitle},
      function (err, result) {
        if (!err) {
          res.send("Article successfuly deleted")
        } else {
          res.send(err);
        };
      }
    );
  });



// set app to listen on port 3000
app.listen(3000, function(){
  console.log("Server started on port 3000");
});

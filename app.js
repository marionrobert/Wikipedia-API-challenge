const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// server code
const app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// connect app.js to the DB and create it if doesn't exist
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
}

// create the model based on the schema
const Article = mongoose.model("Article", articlesSchema)

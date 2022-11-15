const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// server code
const app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

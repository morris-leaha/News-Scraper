// ============== DEPENDENCIES ==============
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

// ============= EXPRESS CONFIG =============

var PORT = process.env.PORT || 8080;
var app = express();

// ============ CONFIG MIDDLEWARE ===========

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ============ CONFIG HANDLEBARS ===========

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// ============ CONNECT MONGO DB ============

mongoose.connect("mongodb://localhost/news-scraper")

// ================= ROUTES =================


// ============= LISTENER INFO ==============

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
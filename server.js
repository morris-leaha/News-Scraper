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

mongoose.connect("mongodb://localhost/news-scraper", { useNewUrlParser: true });

// ================= ROUTES =================

// SCRAPING ROUTE 
app.get("/scrape", function (req, res) {
    axios.get("https://www.buzzfeed.com/").then(function(response) {
    
    // Store data from response as shorthand selector
    var $ = cheerio.load(response.data);

        // Grab all h2 within div's with class of story-card
        $(".story-card h2").each(function(i, element) {
            // Create empty object to store scraping results
            var result = {};
            // Grab the title text & url of the <a> belonging to each h2 and set as a property of result object
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            // Create a new Article by passing result object 
            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                console.log(err);
            });
        });

        // Send a message to client 
        res.send("Articles have been scraped!");

    });
});

// ALL ARTICLES ROUTE
app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
        // Send all articles back to client 
        res.json(dbArticle);
    }).catch(function(err) {
        // If error, send message to client
        res.json(err);
    });
});

// POPULATE ARTICLE WITH NOTE ROUTE
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id }).populate("note").then(function(dbArticle) {
        // Send specific article back to client if able to successfully find id
        res.json(dbArticle);
    }).catch(function(err) {
        // If error, send message to client
        res.json(err);
    });
});

// SAVING/UPDATING ARTICLE NOTE ROUTE
app.post("/articles/:id", function(req, res) {
    // Create a new note by passing req.body
    db.Note.create(req.body).then(function(dbNote) {
        // Find an article with an id equal to req.params.id
        // Update the article with new note
        // Return updated 
        return db.Artcle.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(function(dbArticle) {
        // Send article back to client if successfully saved/updated
        res.json(dbArticle);
    }).catch(function(err) {
        // If error, send error to client
        res.json(err);
    });
});


// ============= LISTENER INFO ==============

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
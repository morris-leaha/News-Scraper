var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");


module.exports = function (app) {
    // SCRAPING ROUTE
    app.get("/scrape", function (req, res) {
        axios.get("https://www.washingtonpost.com/consumer-tech/?utm_term=.efd689cecdc2").then(function (response) {
    
            // Store data from response as shorthand selector
            var $ = cheerio.load(response.data);
    
    
            $(".story-body").each(function (i, element) {
                // Create empty object to store scraping results
                var result = {};
                // Grab the title text, url, & description of the article and set as a property of result object
                result.title = $(this).children(".story-headline").children("h3").children("a").text();
                result.link = $(this).children(".story-headline").children("h3").children("a").attr("href");
                result.summary = $(this).find("p").text();
    
                // Validation
                if (result.title && result.link && result.summary) {
                    // Create a new Article by passing result object 
                    db.Article.create(result).then(function (dbArticle) {
                        console.log(dbArticle);
                    }).catch(function (err) {
                        // console.log(err);
                    });
                };
            });
    
            // Send a message to client 
            res.json("Articles have been scraped!");

        });
    });
    
    // ALL ARTICLES ROUTE
    app.get("/articles", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            // Send all articles back to client 
            res.json(dbArticle);
        }).catch(function (err) {
            // If error, send message to client
            res.json(err);
        });
    });
    
    // POPULATE ARTICLE WITH NOTE ROUTE
    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("note").then(function (dbArticle) {
            // Send specific article back to client if able to successfully find id
            res.json(dbArticle);
        }).catch(function (err) {
            // If error, send message to client
            res.json(err);
        });
    });
    
    // SAVING/UPDATING ARTICLE NOTE ROUTE
    app.post("/notes/:id", function (req, res) {
        // Create a new note by passing req.body
        db.Note.create(req.body).then(function (dbNote) {
            // Find an article with an id equal to req.params.id
            // Update the article with new note
            // Return updated 
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then(function (dbArticle) {
            // Send article back to client if successfully saved/updated
            res.json(dbArticle);
        }).catch(function (err) {
            // If error, send error to client
            res.json(err);
        });
    });
};

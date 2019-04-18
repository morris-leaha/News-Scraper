var db = require("../models");

module.exports = function(app) {

    // HOMEPAGE ROUTE
    app.get("/", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            res.render("index", {articles : dbArticle});
        });
    });

    // SAVED ARTICLES ROUTE
    app.get("/saved", function (req, res) {
        res.render("saved");
    });
}
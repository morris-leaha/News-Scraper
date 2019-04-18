// ============== DEPENDENCIES ==============
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// ============= EXPRESS CONFIG =============

var PORT = process.env.PORT || 8080;
var app = express();

// ============ CONFIG MIDDLEWARE ===========

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ============ CONFIG HANDLEBARS ===========

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ============ CONNECT MONGO DB ============

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/news-scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ================= ROUTES =================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// ============= LISTENER INFO ==============

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
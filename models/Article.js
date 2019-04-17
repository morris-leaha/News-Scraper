var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    }, 
    link: {
        type: String, 
        required: true
    }, 
    note: {
        // Store the Note id
        type: Schema.Types.ObjectId,
        // Link the Note ObjectID to the Note model 
        ref: "Note"
    }
});

// Create model via mongoose's model method
// Store in variable to export 
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
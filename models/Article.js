var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        // Do not save duplicate entries
        unique: true,
        validate: [
            function(input) {
                return input.length >= 1;
            },
            "Title must be longer than 1 character"
        ]
    }, 
    link: {
        type: String, 
        required: true,
        validate: [
            function(input) {
                return input.length >= 1;
            },
            "Link must be longer than 1 character"
        ]
    }, 
    summary: {
        type: String, 
        required: true,
        validate: [
            function(input) {
                return input.length >= 1;
            },
            "Summary must be longer than 1 character"
        ]
    },
    saved: {
        type: Boolean,
        default: false
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
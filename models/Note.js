var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
    title: String, 
    body: String
});

// Create model via mongoose's model method
// Store in variable to export 
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
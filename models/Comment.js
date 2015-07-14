var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({

	commentBody : String,
	commentBy: String,
	createdAt : String

});

var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;
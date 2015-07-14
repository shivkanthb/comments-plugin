var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({

	commentBody : String,
	commentBy: String,
	createdAt : Date

});

var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;
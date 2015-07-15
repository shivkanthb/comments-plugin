var express = require('express');
var Comment = require('./models/Comment');
var app = express();
var http = require('http');
var path = require('path');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/commentSystem');

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('html', cons.swig);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use(function(req, res, next) {
    var auth;

    // check whether an autorization header was send    
    if (req.headers.authorization) {
      // only accepting basic auth, so:
      // * cut the starting "Basic " from the header
      // * decode the base64 encoded username:password
      // * split the string at the colon
      // -> should result in an array
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    // checks if:
    // * auth array exists 
    // * first value matches the expected user 
    // * second value the expected password
    if (!auth || auth[0] !== 'admin' || auth[1] !== 'admin') {
        // any of the tests failed
        // send an Basic Auth request (HTTP Code: 401 Unauthorized)
        res.statusCode = 401;
        // MyRealmName can be changed to anything, will be prompted to the user
        res.setHeader('WWW-Authenticate', 'Basic realm="Hello"');
        // this will displayed in the browser when authorization is cancelled
        res.end('Unauthorized');
    } else {
        // continue with processing, user was authenticated
        next();
    }
});


app.get('/', function(req,res){
	res.render('index.html');
});

app.get('/api/comments', function(req,res){
	Comment.find({}, function(err,comments){
		res.json(comments);

	});

});

app.post('/api/comments', function(req,res){
	var commentBody = req.body.commentBody;
	var commentBy = req.body.commentBy;
	var createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

	var comment = new Comment();
	comment.commentBody = commentBody;
	comment.commentBy = commentBy;
	comment.createdAt = createdAt;
	comment.save(function(err){
		res.json({message:"Comment saved successfully"}); 
	});
});

app.listen(port);
console.log("server running on port"+port);

var express = require('express');
var app = express.createServer();
var bookmarks = require('./bookmarks.js');


//register html 
app.register('.html', require('jqtpl'));


// allow forms to be posted
app.use(express.bodyParser());

app.get('/', function(req, res){
	res.send('<a href="/new">new</a>');
	bookmarks.getBookmarks(function(out) {
		console.log('PEAR');
		res.send(out);
	});
});




app.get('/new', function(req, res){
	res.render('newform.html', {
		locals: {
			title: 'create new bookmark'
		}
		
	});
});


app.post('/new', function(req, res){
	bookmarks.makeFile({
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tags,
		url: req.body.url
	});
});


app.listen(3000);

//http://vpn.uk.akqa.com
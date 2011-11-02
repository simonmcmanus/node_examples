var express = require('express');
var jqtpl = require('jqtpl');
var jquery = require('jquery');

var app  = module.exports = express.createServer();

app.set("view engine", "html");

app.register('.html', jqtpl);

app.get('/', function(req, res) {
	res.render('wrapper.html', {
		locals: {
			title:"Hello WDU!",
			content : "Love Node"
		}
	});
});

app.listen('8000');

console.log('Server running at http://127.0.0.1:8000/');
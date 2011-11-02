var app = require('express').createServer();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(8000);

console.log('Server running at http://127.0.0.1:8000/');
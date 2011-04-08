var http = require('http');
var config = require('./config.js');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(config.content);
}).listen(config.port, config.server);

console.log('Server running at http://'+config.server+':'+config.port+'/');
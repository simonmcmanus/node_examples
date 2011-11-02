var sys = require('sys');
   http = require('http');

var Client = require('mysql').Client,
    client = new Client();
    client.port = 3306;  
    client.user = 'root'; 
    client.password = ''; 
    client.connect();
    // use the correct database
    client.query('USE lists'); // set database t o be used. 

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	client.query('SELECT * FROM items', 
		function selectCb(err, results, fields) {
	    	if (err) {
				throw err;
	    	}
			for (var i in results){
				res.write(results[i].title+":"+results[i].title+"\n"); // Writes to the web browser the value of test then a : to seperate values
			}
		res.end(); // end the request.
		}
	);
}).listen(8000,"127.0.0.1");
console.log('server started at: http://127.0.0.1:8000');

/**



file = {
	title: '',
	tags: '',
	description: ''
}
**/



var defaultFolder = "./bookmarks/";

var fs = require('fs');


// required for hash 
require('joose');
require('joosex-namespace-depended');
require('hash');

exports.makeFile = function(file) {
	var filename = Hash.md5(file.url)+'.html';
	fs.writeFile(
		defaultFolder+filename,
	    file.html,
		function (err) {
	  		if (err) throw err;
	  		console.log('It\'s saved!');
		}
	);
	return filename;
};


exports.getTemplate = function(file, callback) {
	var template = fs.readFileSync(file, 'utf8');
	callback(template);
};



exports.getBookmarks = function(callback) {
	folder = defaultFolder;
	var out = [];
	fs.readdir(folder, function(a, files) {
		var c = files.length;
		var filesAdded = c -2; //dont include "." and ".."
		while(c--){
			var file = files[c][0];
			if(file != '.') {
				fs.readFile('bookmarks/'+files[c], 'utf8',  function(err, data) {
				 	if (err) throw err;
					out.push(data);
					filesAdded--;
					if(filesAdded<=0){
						callback(out);
					}
				});
			}
		}
	});
};







exports.doSearch = function(term) {
	
	process.chdir(__dirname);
	var util   = require('util'),
	    spawn = require('child_process').spawn;
	var ls = spawn( 'grep', ['a ','./bookmarks/' ] );
//	var ls = spawn( 'pwd');
//	var ls = spawn( 'ls', ['./bookmarks/*.html']);

	ls.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	ls.on('exit', function (code) {
	  console.log('child process exited with code ' + code);
	});

	console.log(term);

};
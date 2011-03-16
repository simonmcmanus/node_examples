/**



file = {
	title: '',
	tags: '',
	description: ''
}
**/



var defaultFolder = "./bookmarks/";

var fs = require('fs');

exports.makeFile = function(file) {
	fs.writeFile( 
		defaultFolder+'v.html', 
	    "<a href='"+file.url+"'>"+file.title+"</a>", 
		function (err) {
	  		if (err) throw err;
	  		console.log('It\'s saved!');
		});	
}



exports.getBookmarks = function(callback) {
	folder = defaultFolder;
	var out = [];
	fs.readdir(folder, function(a, files) {
		var c = files.length;
		while(c--){
			out.push(files[c]);
		}
		callback('sdfsdf');
	});
}
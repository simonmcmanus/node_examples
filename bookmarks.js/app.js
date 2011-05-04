
/*****************************
	Node Dependencies
*****************************/

var express = require( 'express' );
var app = express.createServer();
var bookmarks = require( './bookmarks.js' );
var jqtpl = require( 'jqtpl' ); //jquery templating


//register  jquery templating to render html files 
app.register( '.html', jqtpl );

// namespace
var ns = "/bookmarks/";

// allow forms to be posted
app.use( express.bodyParser() );

app.get( ns, function( req, res ) {
	
	bookmarks.getBookmarks( function( out ) {
		res.render( 'list.html', {
			locals: {
				items: out
			}
		});
	});
} );


app.get( ns + 'search/', function( req, res ){
	var searchResultsCallback = function( data ) {
		bookmarks.getBookmarks( function( out ) {
			res.render( 'list.html', {
				locals: {
					items: data
				}
			});
		});
	}
	bookmarks.doSearch( req.query.q, searchResultsCallback );
} );

app.get( ns+'new', function( req, res ){
	res.render( 'newform.html', {
		layout:false,
		locals: {
			title: 'create new bookmark'
		}
	});
});

app.post( ns+'new', function( req, res ){
	var obj = {
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tags,
		url: req.body.url,
		time: ""
	};
	bookmarks.getTemplate( './views/saveitem.html', function( template ) {
		jqtpl.template( "newbookmark", template ); // create newbookmark template
		obj.html = jqtpl.tmpl( "newbookmark", obj ); // pass values into newbookmark template to create html
		var file =  bookmarks.makeFile( obj );
		res.redirect( ns + file );	
	});
});



app.get( ns+'login', function( req, res ){
	res.render( 'login.html', {
		locals: {
			title: 'create new bookmark'
		}
	});
});


app.get( ns+'login', function( req, res ){
	res.render( 'login.html', {
		locals: {
			title: 'create new bookmark'
		}
	});
});





app.get( ns+':id', function( req, res ){
	res.render( '../bookmarks/'+req.params.id );
});

//download .js/.css/.* files in stuff
app.get( ns+'static/:file(*)', function( req, res ){
        var file = req.params.file;
        var folder = './static/' + file;
        res.download( folder );
});

app.listen( 3000 );
$('form#search input').keyup(function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	console.log(code, $(this).val());
	
	if(code == 13){
//		window.location = "/bookmarks/search/"+($(this).val());		
	}
});
$(document).ready(function(){
	/*
	$('.navbar .nav a').click(function( e ) {
		e.preventDefault();
		var div = $(this).attr('href') ;
		$("html,body").animate({
			scrollTop: $(div).position( ).top
		}, "slow");
	});
	*/
	$('body').scrollspy({ target: '.navbar' });
})
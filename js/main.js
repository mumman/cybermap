/*
//预加载
(function () {
	var current = 11;
	var loadClock=true;
	
	if(loadClock){
		setInterval(function(){
			current++;
			if(current<=97){
			$('#loading').html(current+'%'); 	
			}
		},50);	
	}

	$(window).load(function(){
		$('#loading').html(99+'%'); 
		loadClock=false;
		setTimeout(function(){
			$("#loading").fadeOut();
			$("#wrap").fadeIn(function(){
				var music = document.getElementById("music");
				music.play();
			});
		},300)
	});	
})();

	
*/

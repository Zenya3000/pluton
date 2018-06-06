$(function() {

	// Custom JS
	var cat = $('#cat'),
		up = $('#up'),
		down = $('#down'),
		left = $('#left'),
		right = $('#right'),
		record = $('#record'),
		stop = $('#stop'),
		play = $('#play');
	
	var buttons = document.getElementsByClassName('btn_style');
	var main_box = $('#main_box');

	var step = 40;
	var x = 0;
	var y = 0;
	var road = [];

	if($('#cat').position().left == 0){
		$('#left').prop('disabled', true);
	}
	if($('#cat').position().top == 0){
		$('#up').prop('disabled', true);
	}
	$('#play').prop('disabled', true);

	$('#record').click(function(){
		$(this).toggleClass("active");
		road = [];
		road.push({x,y,step});
		if($(this).hasClass('active')){
			
			$(this).prop('disabled', true)
			$('#play').prop('disabled', true)
		} 
	})
	$('#stop').click(function(){
		if($('#record').hasClass('active')){
			$('#record').prop('disabled', false)
			$('#record').removeClass('active');
		}
		if(road.length != 0){
			$('#play').prop('disabled', false);
		}
	})

	$('#play').click(function(){
		console.log(road);
		setTimeout(() => {
			for(var i = 0; i <= road.length -1; i++) {
				const item = road[i];
				(function(i, item) {
					setTimeout(function() {
						console.log(i);
						move(road[i]);
					}, i * 1000);
				})(i);
			}
		}, 1000);

	})

	function move(coords){
		console.log(coords)
		$(cat).css('left', coords.step * coords.x)
		$(cat).css('top', coords.step * coords.y)
	}

	$('.btn_style').click(function(){
		if(this.value == 'right'){
			x++;
			if(  main_box.width()  >  $(cat).width() + (step * x)){
				$(cat).css('left', (step * x));
				$('#left').prop('disabled', false);
				if($('#record').hasClass('active')){
					road.push({x,y,step});
				}
				if(main_box.width() - step <= $(cat).width() + step * x){
					$(this).prop('disabled', true);
				}
			}	else {
				$(this).prop('disabled', true);
			}
		}

		if(this.value == 'left'){
			if(  step  <  $(cat).position().left + (step * x) ){
				x--;
				$(cat).css('left', (step * x ));
				if($('#record').hasClass('active')){
					road.push({x,y,step});
				}
				$('#right').prop('disabled', false);
				if($(cat).position().left + (step * x) ==  (step)) {
					$('#left').prop('disabled', true);
				}
				
			}
		}


		if(this.value == 'down'){
			y++;
			if(  main_box.height() > $(cat).height() + (step * y)){
				$(cat).css('top', (step * y));
				$('#up').prop('disabled', false);
				if($('#record').hasClass('active')){
					road.push({x,y,step});
				}
				if(main_box.height() - step <= $(cat).height() + step * y){
					$(this).prop('disabled', true);
				}
			}	else {
				$(this).prop('disabled', true);
			}
		}
		if(this.value == 'up'){
			if(  step  <  $(cat).position().top + (step * y) ){
				y--;
				$(cat).css('top', (step * y ));
				$('#down').prop('disabled', false);
				if($('#record').hasClass('active')){
					road.push({x,y,step});
				}
				if($(cat).position().top + (step * y) ==  (step)) {
					$('#up').prop('disabled', true);
				}
				
			} else {
				$('#up').prop('disabled', true);
			}
		}
	})
});

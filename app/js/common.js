$(function() {

	// Custom JS
	var cat = $('#cat'),
		up = $('#up'),
		down = $('#down'),
		left = $('#left'),
		right = $('#right'),
		record = $('#record'),
		stop = $('#stop'),
		play = $('#play'),
		value_of_step = $('#value_of_step');

	var buttons = document.getElementsByClassName('btn_style');
	var main_box = $('#main_box');

	var step = 40;
	var x = 0;
	var y = 0;
	var road = [];
	var total = 0;
	var current = 0;

	$(value_of_step).keyup(function(){
		if(this.value > 0 || this.value != "" || typeof(this.value) == 'number'){
			step = this.value;
		} else {
			alert("Введите число больше >= 1. Иначе система работать не будет.")
		}
	})

	if($('#cat').position().left == 0){
		$(left).prop('disabled', true);
	}

	if($('#cat').position().top == 0){
		$(up).prop('disabled', true);
	}

	$(play).prop('disabled', true);

	$(record).click(function(){
		$(this).addClass("active");
		$(value_of_step).prop('disabled', true);
		road = [];
		road.push({x,y,step});
		$('.control_panel').css('border', '3px solid #ffc107');
		if($(this).hasClass('active')){
			$(this).prop('disabled', true)
			$(play).prop('disabled', true)
		} 
	})
	$(stop).click(function(){
		if($(record).hasClass('active')){
			$(record).prop('disabled', false)
			$(record).removeClass('active');
			$('.control_panel').css('border', '1px solid #eaeaea');
		}
		if(road.length != 0){
			$(play).prop('disabled', false);
		}
	})

	$(play).click(function(){
		for(var i = 0; i <= road.length -1; i++) {
			const item = road[i];
			(function(i, item) {
				setTimeout(function() {
					console.log(i);
					move(road[i]);
				}, i * 250);
			})(i);
		}
	})
	$('#reset').click(function(){
		$(cat).css('left', 0);
		$(cat).css('top', 0);
		road = [];
		total = 0;
		current = 0;
		x = 0;
		y = 0;
		$('#total').text(total);
		$('#current').text(current);
		$(play).prop('disabled', true);
		$(value_of_step).prop('disabled', false);

		if($(record).hasClass('active')){
			$(record).prop('disabled', false)
			$(record).removeClass('active');
			$('.control_panel').css('border', '1px solid #eaeaea');
		}
		if(road.length != 0){
			$(play).prop('disabled', false);
		}
	})

	function move(coords){
		console.log(coords)
		$(cat).css('left', coords.step * coords.x)
		$(cat).css('top', coords.step * coords.y)
		$('#current').text(coords.total);
	}

	$('.move').click(function(){

		if($(record).hasClass('active')){
			total++;
			$('#total').text(total);
		}


		if(this.value == 'right'){
			x++;
			if(main_box.width()  >  $(cat).width() + (step * x)){
				$(cat).css('left', (step * x));
				$(left).prop('disabled', false);
				if($(record).hasClass('active')){
					road.push({x,y,step,total});
				}
				if(main_box.width() - step <= $(cat).width() + step * x){
					$(this).prop('disabled', true);
				}
			}	else {
				$(this).prop('disabled', true);
			}
		}

		if(this.value == 'left'){
			if(step  <  $(cat).position().left + (step * x) ){
				x--;
				$(cat).css('left', (step * x ));
				if($(record).hasClass('active')){
					road.push({x,y,step,total});
				}
				$(right).prop('disabled', false);
				if($(cat).position().left + (step * x) ==  (step)) {
					$(left).prop('disabled', true);
				}
				
			}
		}


		if(this.value == 'down'){
			y++;
			if(main_box.height() > $(cat).height() + (step * y)){
				$(cat).css('top', (step * y));
				$(up).prop('disabled', false);
				if($(record).hasClass('active')){
					road.push({x,y,step,total});
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
				$(down).prop('disabled', false);
				if($(record).hasClass('active')){
					road.push({x,y,step,total});
				}
				if($(cat).position().top + (step * y) ==  (step)) {
					$(up).prop('disabled', true);
				}
				
			} else {
				$(up).prop('disabled', true);
			}
		}
	})
});

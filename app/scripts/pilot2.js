$(function() {

	// var target = '';

	// var taskNum = 0;
	// var taskStartTime = 0;
	// var taskPath = [];
	// var taskFlag = false;

	var blockPos = {};

	// Initialization
	// ------------------------------

	blockPos.x = $('#pilot2-block').offset().left;
	blockPos.y = $('#pilot2-block').offset().top;

	$(document).keydown(function(event){ 
		if (event.keyCode == 32) { 

			// if (taskNum >= 192) {
			// 	$('body').css('background', '#EEE');
			// } else {

			// 	$('#m-1').addClass('hidden');
			// 	$('.selected').removeClass('selected');

			// 	taskPath = [];
			// 	taskFlag = true;
			// 	taskStartTime = Date.now();
			// 	assignNewTask();
			// }
			
		}

		if (event.keyCode == 187) {
			$('.user-info').toggleClass('hidden');
		}
	});

	// Stroke Adjusment
	// ------------------------------

	$(document).mousemove(function(e) {

		var offsetX = e.pageX - blockPos.x;
		var offsetY = e.pageY - blockPos.y;
		
		var relateTop, relateRight, relateBottom, relateLeft;

		relateTop = (640 - offsetY)/640;
		relateRight = offsetX/640;
		relateBottom = offsetY/640;
		relateLeft = (640 - offsetX)/640;

		$('#pathTop').attr('stroke-opacity', relateTop);
		$('#pathRight').attr('stroke-opacity', relateRight);
		$('#pathBottom').attr('stroke-opacity', relateBottom);
		$('#pathLeft').attr('stroke-opacity', relateLeft);

		$('#pathTop').attr('stroke-width', relateTop*10);
		$('#pathRight').attr('stroke-width', relateRight*10);
		$('#pathBottom').attr('stroke-width', relateBottom*10);
		$('#pathLeft').attr('stroke-width', relateLeft*10);

	});

	// Path Record
	// ------------------------------

	// $(document).mousemove(function(e) {
	// 	if (taskFlag) {
 //      taskPath.push({
 //        x: e.pageX,
 //        y: e.pageY,
 //        t: Date.now() - taskStartTime
 //      });
 //    }
 //  });

	// function recordTaskData(name, task, path, time) {

	// 	$.ajax({
	// 		url: '/pilot1',
	// 		type: 'POST',
	// 		data: {
	// 			name: name,
	// 			task: task,
	// 			path: path,
	// 			time: time
	// 		},
	// 		error: function(xhr) {
	// 			alert('ajax request error');
	// 		},
	// 		success: function(response) {
	// 			console.log('success');
	// 		}
	// 	});

	// }

	// Task Assignment
	// ------------------------------

	// function assignNewTask() {
	// 	// target = randomTarget();
	// 	target = targets.pop();
	// 	$('.trigger-text').text(target);
	// }

	// function randomTarget(){
	// 	ri = Math.floor(Math.random()*targets.length);
	// 	return targets[ri];
	// }

	// Trigger Menu Selection
	// ------------------------------

	// var intend = '';
	// var timer = 0;
	// var flag = false;

	// function mouseoverHandler() {
	// 	return function () {
	// 		var $this = $(this);

	// 		$('#m-1').removeClass('hidden');

	// 		intend = $this.text();

	// 		if (!flag) {

	// 			flag = true;

	// 			timer = setTimeout( function(){
	// 				if (intend == $this.text()) {
	// 					console.log('select ' + $this.text());
	// 					if ($this.text() == target.slice(4,6)) {

	// 						// console.log(Date.now() - taskStartTime);
	// 						// console.log(taskPath);
	// 						$this.addClass('selected');
	// 						recordTaskData($('.user-info input').val(), target, JSON.stringify(taskPath), Date.now() - taskStartTime);

	// 						taskNum++;
	// 						taskFlag = false;

	// 						$('.progress').css('width', taskNum*100/192+'%');
	// 						$('.trigger-text').text('--');
	// 					}
	// 				}
	// 			}, 1000);

	// 		}
	// 	};
	// }

	// function mouseleaveHandler() {
	// 	return function () {
	// 		var $this = $(this);

	// 		intend = '';
	// 		clearTimeout(timer);
	// 		timer = 0;

	// 		flag = false;

	// 	};
	// }

	// $('.selection').on('mouseover', mouseoverHandler());
	// $('.selection').on('mouseleave', mouseleaveHandler());

	// Trigger 1st Menu
	// ------------------------------

	// $('.trigger-btn').on('mouseover', function () {
	// 	var $this = $(this);

	// 	if ($this.prop('hoverTimeout')) {
	// 		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
	// 	}

	// 	$this.prop('hoverIntent', setTimeout(function() {
	// 		if (taskFlag) {
	// 			$('#m-1').removeClass('hidden');
	// 		}
	// 	}, 1000));
	// });

	// $('#m-1').on('mouseleave', function () {
	// 	var $this = $(this);

	// 	if ($this.prop('hoverIntent')) {
	// 		$this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
	// 	}

	// 	$this.prop('hoverTimeout', setTimeout(function() {

	// 		$('#m-1').addClass('hidden');

	// 	}, 1000));
	// });

});
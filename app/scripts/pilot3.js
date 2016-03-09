$(function() {

	var taskFlag = 0;
	var blockPos = {};
	var initFlag = 0;

	var color = ['#E74C3C', '#2ECC71', '#3498DB', '#F1C40F'];
	var taskNum = 0;
	var taskPath = [];

	var lastPos = {};
	var curPos = {};

	var recognizer = new DollarRecognizer;

	// Initialization
	// ------------------------------

	blockPos.X = $('#pilot3-block').offset().left;
	blockPos.Y = $('#pilot3-block').offset().top;

	$(document).keydown(function(event){ 
		if (event.keyCode == 90) { 
			taskFlag = 1;
			$('#guidance').fadeIn();
		}

		if (event.keyCode == 88) {
			commitTask();
			$('#guidance').fadeOut();
		}

		if (event.keyCode == 187) {
			$('.user-info').toggleClass('hidden');
		}
	});

	// Commit Task
	// ------------------------------	

	function commitTask() {
		var result = recognizer.Recognize(taskPath);
		console.log(result);

		taskNum++;
		$('.progress').css('width', taskNum*100/10+'%');

		taskFlag = 0;
		initFlag = 0;
		taskPath = [];
		d3.selectAll('#recognize path').remove();
	}

	// Path Drawing
	// ------------------------------

	var line = d3.svg.line()
		.x(function(d) {
			return d.X;
		})
		.y(function(d) {
			return d.Y;
		})
		.interpolate('basis');

	var svg = d3.select('#recognize');

	$(document).mousemove(function(e) {

		curPos.X = e.pageX - blockPos.X;
		curPos.Y = e.pageY - blockPos.Y;

		if (!initFlag) {
			lastPos.X = curPos.X;
			lastPos.Y = curPos.Y;
			initFlag = 1;
		}		

		if (taskFlag) {
      taskPath.push({
        X: curPos.X,
        Y: curPos.Y,
      });

	  	svg.append('path')
				.attr({
					'd': line([lastPos, curPos]),
					'stroke': '#16A085',
					'stroke-width': '5px',
					'fill': 'none'
				});
		}

  	lastPos.X = curPos.X;
  	lastPos.Y = curPos.Y;

		var a = angle(320, 320, curPos.X, curPos.Y);

  	$('#guidance')
  		.css('left', e.pageX-100)
  		.css('top', e.pageY-100)
  		.css('-webkit-transform', 'rotate('+ a +'deg)');
	});

	function angle(cx, cy, ex, ey) {
		var dy = ey - cy;
		var dx = ex - cx;
		var theta = Math.atan2(dy, dx); // range (-PI, PI]
		theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
		//if (theta < 0) theta = 360 + theta; // range [0, 360)
		return theta;
	}

	// Path Record
	// ------------------------------

	// function recordTaskData(name, task, path, time) {

	// 	$.ajax({
	// 		url: '/pilot2',
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

});
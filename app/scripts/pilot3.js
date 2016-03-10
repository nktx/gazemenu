function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}

$(function() {

	var taskFlag = 0;
	var blockPos = {};
	var initFlag = 0;

	var color = ['#E74C3C', '#2ECC71', '#3498DB', '#F1C40F'];
	var taskNum = 0;
	var taskPath = [];
	var task = 'no-guidance';
	var taskStartTime = 0;

	var lastPos;
	var curPos;

	var xc = 0;
	var yc = 0;
	var tc = 0;

	var recognizer = new DollarRecognizer;

	// Initialization
	// ------------------------------

	blockPos.X = $('#pilot3-block').offset().left;
	blockPos.Y = $('#pilot3-block').offset().top;

	$(document).keydown(function(event){ 
		if (event.keyCode == 90 && taskNum < 10) { 
			taskFlag = 1;
			taskStartTime = Date.now();

			if (taskNum >= 5) {
				task = 'with-guidance';
				$('#guidance').fadeIn();
			}
		}

		if (event.keyCode == 88) {
			commitTask();
			$('#guidance').fadeOut();
		}

		if (event.keyCode == 188) {
			$('.user-info').toggleClass('hidden');
		}
	});

	// Commit Task
	// ------------------------------	

	function commitTask() {
		var result = recognizer.Recognize(taskPath);
		console.log(result);

		recordTaskData($('.user-info input').val(), task, JSON.stringify(taskPath), JSON.stringify(result.Path), result.Name, result.Score, result.Circle, result.Correct, Date.now() - taskStartTime);

		taskNum++;
		$('.progress').css('width', taskNum*100/10+'%');

		taskFlag = 0;
		initFlag = 0;
		taskPath = [];
		d3.selectAll('#target path').remove();

		xc = 0;
		yc = 0;
		tc = 0;
	}

	// Path Drawing and Dynamic Guiding
	// ------------------------------

	var pi = Math.PI;
	var target = d3.select('#target');
	var guidance = d3.select('#guidance');

	var line = d3.svg.line()
		.x(function(d) {
			return d.X;
		})
		.y(function(d) {
			return d.Y;
		})
		.interpolate('basis');

	var arc = d3.svg.arc()
    .innerRadius(function(d) {
			return d.R;
		})
    .outerRadius(function(d) {
			return d.R;
		})
    .startAngle(function(d) {
			return (d.A+90) * (pi/180);
		})
    .endAngle(function(d) {
			return (d.A+90) * (pi/180) + d.D/d.R;
		});

	$(document).mousemove(function(e) {

		curPos = new Point(e.pageX - blockPos.X, e.pageY - blockPos.Y);
		
		if (!initFlag) {
			lastPos = new Point(curPos.X, curPos.Y);
			initFlag = 1;
		}		

		if (taskFlag) {
      taskPath.push(curPos);

      xc += curPos.X;
			yc += curPos.Y;
			tc++;

	  	target.append('path')
				.attr({
					'd': line([lastPos, curPos]),
					'stroke': '#16A085',
					'stroke-width': '5px',
					'fill': 'none'
				});
		}

  	lastPos = new Point(curPos.X, curPos.Y);

  	if (tc >= 1) {

  		var a = angle((xc/tc +320)/2, (yc/tc +320)/2, curPos.X, curPos.Y);
			var r = distance((xc/tc +320)/2, (yc/tc +320)/2, curPos.X, curPos.Y);

			var offsetX = 300 - r * Math.cos(a * (pi/180));
			var offsetY = 300 - r * Math.sin(a * (pi/180));
			var guidanceLength = Math.min(100, Math.max(0, distance(taskPath[0].X, taskPath[0].Y, curPos.X, curPos.Y)-50));

			d3.select('#guidance path').remove();
			guidance.append('path')
							.attr({
								'd': arc({A: a, R: r, D: guidanceLength}),
								'stroke': '#16A085',
								'stroke-width': '15px',
								'stroke-opacity': '0.3',
								'fill': 'none',
								'transform': 'translate('+offsetX+','+offsetY+')'
							});

	  	$('#guidance')
	  		.css({
	  			'left': e.pageX-300,
					'top': e.pageY-300
				});
  	}
	});

	function angle(cx, cy, ex, ey) {
		var dy = ey - cy;
		var dx = ex - cx;
		var theta = Math.atan2(dy, dx);
		theta *= 180 / Math.PI;
		return theta;
	}

	function distance(x, y, x0, y0) {
		return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	}

	// Path Record
	// ------------------------------

	function recordTaskData(name, task, path, rpath, rname, rscore, rcircle, rcorrect, time) {

		$.ajax({
			url: '/pilot3',
			type: 'POST',
			data: {
				name: name,
				task: task,
				path: path,
				rpath: rpath,
				rname: rname,
				rscore: rscore,
				rcircle: rcircle,
				rcorrect: rcorrect,
				time: time
			},
			error: function(xhr) {
				alert('ajax request error');
			},
			success: function(response) {
				console.log('success');
			}
		});

	}

});
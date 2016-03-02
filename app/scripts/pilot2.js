$(function() {

	var readyFlag = 0;
	var taskFlag = 0;
	var commitFlag = 0;
	var blockPos = {};

	var taskNum = 0;
	var taskPath = [];
	var taskStartTime = 0;

	var targets = [
		'r', 'g', 'b', 'y',
		'r', 'g', 'b', 'y',
		'r', 'g', 'b', 'y',
		'r', 'g', 'b', 'y',
		'r', 'g', 'b', 'y'
	];
	var task = '';

	// Initialization
	// ------------------------------

	targets.sort(function(){return Math.round(Math.random());});

	blockPos.x = $('#pilot2-block').offset().left;
	blockPos.y = $('#pilot2-block').offset().top;

	$(document).keydown(function(event){ 
		if (event.keyCode == 90) { 
			readyFlag = 1;			
		}

		if (event.keyCode == 88) {
			if (commitFlag) {
				commitTask();
				resetTask();	
			}	
		}

		if (event.keyCode == 67) {
			resetTask();
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

		// console.log(offsetX);
		// console.log(offsetY);
		
		var relateTop, relateRight, relateBottom, relateLeft;

		relateTop = (450-distance(offsetX, offsetY, 320, 0))/450;
		relateRight = (450-distance(offsetX, offsetY, 640, 320))/450;
		relateBottom = (450-distance(offsetX, offsetY, 320, 640))/450;
		relateLeft = (450-distance(offsetX, offsetY, 0, 320))/450;

		$('#pathTop').attr('stroke-opacity', relateTop);
		$('#pathRight').attr('stroke-opacity', relateRight);
		$('#pathBottom').attr('stroke-opacity', relateBottom);
		$('#pathLeft').attr('stroke-opacity', relateLeft);

		$('#pathTop').attr('stroke-width', relateTop*10);
		$('#pathRight').attr('stroke-width', relateRight*10);
		$('#pathBottom').attr('stroke-width', relateBottom*10);
		$('#pathLeft').attr('stroke-width', relateLeft*10);

		$('#pathTop').attr('stroke-dashoffset', getDashOffset(relateTop, offsetX, offsetY));
		$('#pathRight').attr('stroke-dashoffset', getDashOffset(relateRight, offsetX, offsetY));
		$('#pathBottom').attr('stroke-dashoffset', getDashOffset(relateBottom, offsetX, offsetY));
		$('#pathLeft').attr('stroke-dashoffset', getDashOffset(relateLeft, offsetX, offsetY));

		if (taskFlag) {
      taskPath.push({
        x: offsetX,
        y: offsetY,
        t: Date.now() - taskStartTime
      });
    }

	});

	function distance(x, y, x0, y0) {
		return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	}

	function getDashOffset(relateNum, x, y) {
    if ((x >= 0) && (x <= 640) && (y >= 0) && (y <=640)) {
    	return 640-Math.sqrt(relateNum)*640;
    } else {
    	return 0;
    }
	}

	// Path Record
	// ------------------------------

	function recordTaskData(name, task, path, time) {

		$.ajax({
			url: '/pilot2',
			type: 'POST',
			data: {
				name: name,
				task: task,
				path: path,
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

	// Task Commit
	// ------------------------------

	function commitTask() {

		recordTaskData($('.user-info input').val(), task, JSON.stringify(taskPath), Date.now() - taskStartTime);

		taskNum++;
		taskPath = [];
		$('.progress').css('width', taskNum*100/20+'%');
	}

	// Task Assign & Reset
	// ------------------------------

	function assignNewTask() {
		if (taskFlag == 0) {
			// task = randomTarget();
			task = targets.pop();
			taskFlag = 1;
			taskStartTime = Date.now();
		}
	}

	function resetTask(){
		$('.trigger-area').removeClass('triggered r g b y');
		readyFlag = 0;
		taskFlag = 0;
		commitFlag = 0;
		task = '';
	}

	function randomTarget(){
		ri = Math.floor(Math.random()*targets.length);
		return targets[ri];
	}

	// Trigger Target
	// ------------------------------

	function mouseoverHandler() {
		return function () {
			var $this = $(this);

			if ((task == 'r') && $this.hasClass('trigger--top')) {
				$this.addClass('triggered r');
				commitFlag = 1;
			}

			if ((task == 'g') && $this.hasClass('trigger--right')) {
				$this.addClass('triggered g');
				commitFlag = 1;
			}

			if ((task == 'b') && $this.hasClass('trigger--bottom')) {
				$this.addClass('triggered b');
				commitFlag = 1;
			}

			if ((task == 'y') && $this.hasClass('trigger--left')) {
				$this.addClass('triggered y');
				commitFlag = 1;
			}

		};
	}

	function mouseleaveHandler() {
		return function () {
			var $this = $(this);	
			$this.removeClass('triggered r g b y');
			commitFlag = 0;
		};
	}

	$('.trigger--end').on('mouseover', mouseoverHandler());
	$('.trigger--end').on('mouseleave', mouseleaveHandler());

	// Trigger Start
	// ------------------------------

	$('.trigger--start').on('mouseover', function () {
		var $this = $(this);

		if ($this.prop('hoverTimeout')) {
			$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
		}

		$this.prop('hoverIntent', setTimeout(function() {
			if (readyFlag) {

				assignNewTask();
				$('.trigger--start').addClass('triggered ' + task);
			}
		}, 1000));
	});

});
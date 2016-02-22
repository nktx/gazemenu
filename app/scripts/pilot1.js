$(function() {

	var target = '';

	var targets = [
		'A-E-01',
		'A-E-02',
		'A-E-03',
		'A-E-04',
		'A-F-05',
		'A-F-06',
		'A-F-07',
		'A-F-08',
		'A-G-09',
		'A-G-10',
		'A-G-11',
		'A-G-12',
		'A-H-13',
		'A-H-14',
		'A-H-15',
		'A-H-16',
		'B-I-17',
		'B-I-18',
		'B-I-19',
		'B-I-20',
		'B-J-21',
		'B-J-22',
		'B-J-23',
		'B-J-24',
		'B-K-25',
		'B-K-26',
		'B-K-27',
		'B-K-28',
		'B-L-29',
		'B-L-30',
		'B-L-31',
		'B-L-32',
		'C-M-33',
		'C-M-34',
		'C-M-35',
		'C-M-36',
		'C-N-37',
		'C-N-38',
		'C-N-39',
		'C-N-40',
		'C-O-41',
		'C-O-42',
		'C-O-43',
		'C-O-44',
		'C-P-45',
		'C-P-46',
		'C-P-47',
		'C-P-48',
		'D-Q-49',
		'D-Q-50',
		'D-Q-51',
		'D-Q-52',
		'D-R-53',
		'D-R-54',
		'D-R-55',
		'D-R-56',
		'D-S-57',
		'D-S-58',
		'D-S-59',
		'D-S-60',
		'D-T-61',
		'D-T-62',
		'D-T-63',
		'D-T-64'
	];

	var taskNum = 0;
	var taskStartTime = 0;
	var taskPath = [];
	var taskFlag = false;

	// Initialization
	// ------------------------------

	$('#pilot1-block').height($(window).height()-100);

	$(document).keydown(function(event){ 
		if (event.keyCode == 32) { 
			if (taskNum == 0) {
				createNewDataFile();
			}

			taskFlag = true;
			taskStartTime = Date.now();
			$('#m-1').addClass('hidden');
			$('.selected').removeClass('selected');
			assignNewTask();
		}

		if (event.keyCode == 187) {
			$('.user-info').toggleClass('hidden');
		}
	});

	// Path Record
	// ------------------------------

	$(document).mousemove(function(e) {
		if (taskFlag) {
      taskPath.push({
          x: e.pageX,
          y: e.pageY
      });
    }
  });

	function createNewDataFile() {
		console.log('create data file');
	}

	// Task Assignment
	// ------------------------------

	function assignNewTask() {
		target = randomTarget();
		taskNum++;
		$('.trigger-text').text(target);
	}

	function randomTarget(){
		ri = Math.floor(Math.random()*targets.length);
		return targets[ri];
	}

	// Trigger Menu Selection
	// ------------------------------

	var intend = '';
	var timer = 0;
	var flag = false;

	function mouseoverHandler() {
		return function () {
			var $this = $(this);

			$('#m-1').removeClass('hidden');

			intend = $this.text();

			if (!flag) {

				flag = true;

				timer = setTimeout( function(){
					if (intend == $this.text()) {
						console.log('select ' + $this.text());
						if ($this.text() == target.slice(4,6)) {

							console.log(Date.now() - taskStartTime);
							console.log(taskPath);
							$this.addClass('selected');
							taskFlag = false;
						}
					}
				}, 3000);

			}
		};
	}

	function mouseleaveHandler() {
		return function () {
			var $this = $(this);

			intend = '';
			clearTimeout(timer);
			timer = 0;

			flag = false;

		};
	}

	$('.selection').on('mouseover', mouseoverHandler());
	$('.selection').on('mouseleave', mouseleaveHandler());

	// Trigger 1st Menu
	// ------------------------------

	$('.trigger-btn').on('mouseover', function () {
		var $this = $(this);

		if ($this.prop('hoverTimeout')) {
			$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
		}

		$this.prop('hoverIntent', setTimeout(function() {
			$('#m-1').removeClass('hidden');
		}, 1000));
	});

	$('#m-1').on('mouseleave', function () {
		var $this = $(this);

		if ($this.prop('hoverIntent')) {
			$this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
		}

		$this.prop('hoverTimeout', setTimeout(function() {

			$('#m-1').addClass('hidden');

		}, 1000));
	});

});
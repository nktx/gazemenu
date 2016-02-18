$(function() {

	$('#pilot1-block').height($(window).height());


	/** Trigger Menu Selection
	------------------------------**/

	var intend = '';
	var timer = 0;

	function mouseoverHandler() {
		return function () {
			var $this = $(this);

			intend = $this.text();

			timer = setTimeout( function(){
				if (intend == $this.text()) {
					console.log('select ' + $this.text());
				}
			}, 3000);
		};
	}

	function mouseleaveHandler() {
		return function () {
			var $this = $(this);

			intend = '';
			clearTimeout(timer);
			timer = 0;

		};
	}

	$('.selection').on('mouseover', mouseoverHandler());
	$('.selection').on('mouseleave', mouseleaveHandler());


	/** Trigger 1st Menu
	------------------------------**/

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

			if (timer != 0) {
				$('#m-1').addClass('hidden');
			}
			
		}, 3000));
	});

});
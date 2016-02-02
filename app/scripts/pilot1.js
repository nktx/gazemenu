$(function() {

	function mouseoverHandler(target, delayTime) {
		return function () {
			var $this = $(this);

			if ($this.prop('hoverTimeout')) {
				$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
			}

			$this.prop('hoverIntent', setTimeout(function() {
				target.removeClass('hidden');
			}, delayTime));
		};
	}

	function mouseleaveHandler(target, delayTime) {
		return function () {
			var $this = $(this);

			if ($this.prop('hoverIntent')) {
				$this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
			}

			$this.prop('hoverTimeout', setTimeout(function() {
				target.addClass('hidden');
			}, delayTime));
		};
	}

	$('.trigger-btn').on('mouseover', mouseoverHandler($('#m-1'), 1000));
	$('#m-1').on('mouseleave', mouseleaveHandler($('#m-1'), 1000));

});
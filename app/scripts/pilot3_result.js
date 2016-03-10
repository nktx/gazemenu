$(function() {

	var line = d3.svg.line()
			.x(function(d) {
				return d.X-100;
			})
			.y(function(d) {
				return d.Y;
			})
			.interpolate('basis');

	var ng = d3.select('#no-guidance');
	var wg = d3.select('#with-guidance');

	var ngnum = 0;
	var wgnum = 0;
	var ngscore = [];
	var wgscore = [];

	function drawResult(result){
		result.forEach(function (data){
			if (data.task == 'no-guidance') {
				ngscore.push(parseFloat(data.rcircle));

				if (data.rcorrect == 'true') {
					ngnum++;
				}

				ng.append('path')
				.attr({
					'd': line(data.path),
					'stroke': '#34495e',
					'stroke-width': '1px',
					'fill': 'none'
				});
			}

			if (data.task == 'with-guidance') {
				wgscore.push(parseFloat(data.rcircle));

				if (data.rcorrect == 'true') {
					wgnum++;
				}

				wg.append('path')
				.attr({
					'd': line(data.path),
					'stroke': '#34495e',
					'stroke-width': '1px',
					'fill': 'none'
				});
			}
		});

		var nr = average(ngscore);
		var wr = average(wgscore);

		$('#ngnum').append('<span class="title">[correct task]</span>'+ ngnum + ' / ' + nr.t);
		$('#wgnum').append('<span class="title">[correct task]</span>'+ wgnum + ' / ' + wr.t);
		$('#ngscore').append('<span class="title">[mean]</span>'+ nr.mean);
		$('#wgscore').append('<span class="title">[mean]</span>'+ wr.mean);
		$('#ngscore').append('<br><span class="title">[std]</span>'+ nr.deviation);
		$('#wgscore').append('<br><span class="title">[std]</span>'+ wr.deviation);
	}

	$.get('/pilot3_data', function(data){
	  drawResult(data);
	});

	function average(a) {
		var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
		r.t = t;
		for(var m, s = 0, l = t; l--; s += a[l]);
		for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
		return r.deviation = Math.sqrt(r.variance = s / t), r;
	}

});
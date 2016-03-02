$(function() {


var line = d3.svg.line()
		.x(function(d) {
			return d.x;
		})
		.y(function(d) {
			return d.y;
		})
		.interpolate('basis');

var svg = d3.select('svg');

function drawResult(result){
	result.forEach(function (data){
		if (data.task == 'r') {
			svg.append('path')
			.attr({
				'd': line(data.path),
				'stroke': '#e74c3c',
				'stroke-width': '1px',
				'fill': 'none'
			});
		}

		if (data.task == 'g') {
			svg.append('path')
			.attr({
				'd': line(data.path),
				'stroke': '#2ecc71',
				'stroke-width': '1px',
				'fill': 'none'
			});
		}

		if (data.task == 'b') {
			svg.append('path')
			.attr({
				'd': line(data.path),
				'stroke': '#3498db',
				'stroke-width': '1px',
				'fill': 'none'
			});
		}

		if (data.task == 'a') {
			svg.append('path')
			.attr({
				'd': line(data.path),
				'stroke': '#f1c40f',
				'stroke-width': '1px',
				'fill': 'none'
			});
		}
		

	});
}

$.get('/pilot2_data', function(result){
  drawResult(result);
});


// svg.append('path')
// 	.attr({
// 		'd': line(data2),
// 		'stroke': '#000',
// 		'stroke-width': '1px',
// 		'fill': 'none'
// 	});
});
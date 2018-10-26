(function weatherUpdate() {
setTimeout(function() {
	$.ajax({
		url: 'weather.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			var out = '<tr><th scope="col">City</th><th scope="col">Conditions</th><th scope="col">Icon</th><th scope="col">Temp</th><th scope="col">Wind</th><th scope="col">Wind Direction</th><th scope="col">Wind Chill Factor</th></tr>';
			$.each(response.weatherStatus, function(index){
				out += '<tr><td>' +
				response.weatherStatus[index].city.name + '</td><td>' +
				response.weatherStatus[index].weather.conditions + '</td><td>' +
				'<img src="' + response.weatherStatus[index].weather.icon + '" height="31" width="35">' + '</td><td>' +
				response.weatherStatus[index].weather.temperature + '\u00B0' + 'C</td><td>' +
				response.weatherStatus[index].weather.wind.speed + 'mph</td><td>' +
				response.weatherStatus[index].weather.wind.direction + '</td><td>' +
				response.weatherStatus[index].weather.wind.chillFactor +
				'</td></tr>';
			});
			$('#weather tbody').html(out);
			weatherUpdate();
		},
		error: function(){
			$('#errorInfo').html('error $.ajax !!');
		}
	});
}, 300);
})();
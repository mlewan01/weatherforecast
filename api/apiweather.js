$(document).ready(function(){
	console.log(windSpeed(5.1));
	$('#countries').change(function(){
		dataClear();
		$('#weather').hide();
		$('#error').html('');
		$('#error').hide();
		var temp = $(this).val();
		if( temp != 'please select'){
			if(temp == 'N. Ireland'){
				temp = 'nireland';
			}
			temp = temp.toLowerCase();
			temp += '.html';
			$('#cities').load('cities/' + temp );
			
		}
	});
	$('#cities').change(function(){
		var tem = $(this).val();
		if( tem != 'select cuntry'){
			weatherAPIcall(tem);
		}
	});
});

/* 
 *	makes api call in order to retrive the weather data in json format
 *	formats them and updates the HTML
 */
function weatherAPIcall(city){
	// my api key:
	var key = '777316724ab3023b4f93e8cb4e1fa7f9';
	
	var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',uk&APPID=' + key;
	
	$.ajax({
		url: apiCall,
		type: 'GET',
		dataType: 'json',
		success: function(response){
			$('#error').html('');
			$('#error').hide();
			$('#city').html(response.name);
			$('#date').html(myDate(response.dt));
			$('#cond').html(response.weather[0].main);
			$('#temp').html(temperature(response.main.temp)+'\u00B0' + 'C');
			$('#sped').html(windSpeed(response.wind.speed)+' mph');
			var windDeg = response.wind.deg;
			$('#dire').html(windDirection(windDeg));
			$('#icon').html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='weather image'>");
			$('#weather').show();
		},
		error: function(xhr, error){
			//console.log('error...');
			$('#error').show();
			//$('#errorInfo').show();
			$('#error').html('error during ajax call...');
		}
	});
}
/*
 *	formats wind direction in degrees to textual representation
 */
function windDirection(wd){
	var wind = 'test';
	if(wd > -1 && wd < 361){
		if(wd>355 || wd<5){
			wind = 'Northerly';
		}else if(wd>5 && wd<85){
			wind = 'North Easterly';
		}else if(wd>85 && wd<95){
			wind = 'Easterly';
		}else if(wd>95 && wd<175){
			wind = 'South Easterly';
		}else if(wd>175 && wd<185){
			wind = 'Southerly';
		}else if(wd>185 && wd<265){
			wind = 'South Westerly';
		}else if(wd>265 && wd<275){
			wind = 'Westerly';
		}else if(wd>275 && wd<356){
			wind = 'North Westerly';
		}
	}
	return wind;
}
/*
 *	converts temperature in Kelvins to Celcius
 */
function temperature(kelvin){
	var celcius = kelvin - 273.15;
	return Math.round(celcius);
}
/*
 *	converts wind speed in mps to mph
 */
function windSpeed(wind){
	console.log('wind: '+wind);
	var sped = wind * 2.2369;
	console.log('wind2: '+sped);
	//return Math.round(sped);
	return sped.toFixed(2);
}
/*
 *	converts and formats date i Unix Timestamp format
 *	standard date format. 
 */
function myDate(unixTime){
	var date = new Date(unixTime * 1000);
	var d = date.getDate();
	var m = date.getMonth()+1;
	var y = date.getFullYear();
	return d +' - '+ m +' - '+ y;
}
function dataClear(){
	$('#error').html('');
	$('#error').hide();
	$('#city').html('');
	$('#date').html('');
	$('#cond').html('');
	$('#temp').html('');
	$('#sped').html('');
	$('#dire').html('');
	$('#icon').html('');
	$('#weather').hide();
}
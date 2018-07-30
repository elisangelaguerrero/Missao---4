'use strict';


const baseurl='https://api.weatherbit.io/v2.0/forecast/daily';
const apikey='782c751ea75c4a6d8d335dfd41f0e677';
const weekdays = {
	0: 'Dom',
	1: 'Seg',
	2: 'Ter',
	3: 'Qua',
	4: 'Qui',
	5: 'Sex',
	6: 'Sab'
}
// const baseurl='https://api.weatherbit.io/v2.0/forecast/daily?city=Recife&key=782c751ea75c4a6d8d335dfd41f0e677'
getForecast('Recife');

$('#search').click(function(event) {
	event.preventDefault();
	const newCity = $('#city').val();
	getForecast(newCity);
});

function getForecast(city) {
	$('#loader').css('display', '');
	$('#forecast').css('display', 'none');

	clearFields();

	$.ajax({
		url: baseurl,
		data:{
			key: apikey,
			city: city,
			lang: 'pt'
		},
		success:function(result) {
			$('#loader').css('display', 'none');
			$('#forecast').css('display', '');			$('#city-name').text(result.city_name);
			const forecast = result.data;
			const today = forecast[0];
			displayToday(today);
			const nextDays = forecast.slice(1);
			displayNextDays(nextDays);
		},
		error: function(error) {
			console.log(error.responseText);
		}
	});
}

function clearFields(){
	$('#next-days').empty();
}

function displayToday(today) {
	const temperature = Math.round(today.temp);
	const windSpeed = today.wind_spd;
	const humidity = today.rh;
	const weather = today.weather.description;
	const icon = today.weather.icon;
	const iconurl = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

	console.log(iconurl);
	
	$('#current-temperature').text(temperature);
	$('#current-weather').text(weather);
	$('#current-wind').text(windSpeed);
	$('#current-humidity').text(humidity);
	$('#weather-icon').attr('src', iconurl);

}

function displayNextDays(nextDays) {

	for(let i=0; i< nextDays.length; i=i+1) {

		const day = nextDays[i];
		const min = Math.round(day.min_temp);
		const max = Math.round(day.max_temp);
		const date = new Date(day.valid_date);
		const weekday = weekdays[date.getUTCDay()];

		const card = $(
					`<div class="day-card">
	                    <div class="date">${date.getUTCDate()}/${date.getUTCMonth()+1}</div>
	                    <div class="weekday">${weekday}</div>
	                    <div class="temperatures">
	                        <span class="max">${max}°</span>
	                        <span class="min">${min}°</span>
	                    </div>
	                </div>)`);
		
		card.appendTo('#next-days');


	}
}
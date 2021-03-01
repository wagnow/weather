/*Global variables. They hold important urls to be used by functions*/
var baseUrl = window.location.href;
var bingUrl = 'http://www.bing.com';

/*Calls server side controller function to get background image from Bing's API*/
function getBackGroundImage(){
	$.ajax({
		url: baseUrl+'weather/getBackGroundImage',
	success: function(result){
		imageUrl = bingUrl + result;
		$('body').css('background','url('+imageUrl+')');
	}	
	});
};

/*Gets user's current location and displays their city name when the page is loaded*/
function getUserCoord(){
	var latitude;
	var longitude;
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude   = position.coords.latitude;
        longitude  = position.coords.longitude;
		$.ajax({
			url: 'https://nominatim.openstreetmap.org/reverse?format=json',
			data: {"lat": latitude,"lon":longitude},
		success: function(result){
			var city  = result.address.city;
			var state = result.address.state;
			var distance = 0;
			var input = $('input');
			input.val(city+','+state);
			getWeather();
		}	
		});	
    });
};

/*Gets all the weather information acoording to the user's searched city name 
 *and display it on the screen*/
function getWeather(){
	var city = $.trim($('input').val()).split(' ');
	$.ajax({
		url: baseUrl+'weather/getWeather',
		type: 'post',
		data: {'city':city},
	success: function(result){
		var json  = JSON.parse(result);
		var today;
		var tomorrow;
		var afterTomorrow;
		var imgt1 = json.current_observation.condition.code;
		var imgt2 = json.forecasts[1].code;
		var imgt3 = json.forecasts[2].code;
		var tempToday = json.current_observation.condition.temperature;
		
		for(var i=0;i<48;i++){
			if(i<7){
				imgt1 = ((imgt1 == i)?13:imgt1);
				imgt2 = ((imgt2 == i)?13:imgt2);
				imgt3 = ((imgt3 == i)?13:imgt3);				
			}
			else if(i>=8 && i<=18){
				imgt1 = ((imgt1 == i)?23:imgt1);
				imgt2 = ((imgt2 == i)?23:imgt2);
				imgt3 = ((imgt3 == i)?23:imgt3);				
			}
			else if(i>=19 && i<=24){
				imgt1 = ((imgt1 == i)?6:imgt1);
				imgt2 = ((imgt2 == i)?6:imgt2);
				imgt3 = ((imgt3 == i)?6:imgt3);				
			}
			else if(i>=25 && i<=30){
				imgt1 = ((imgt1 == i)?12:imgt1);
				imgt2 = ((imgt2 == i)?12:imgt2);
				imgt3 = ((imgt3 == i)?12:imgt3);				
			}
			else if(i>=31 && i<=36){
				imgt1 = ((imgt1 == i)?2:imgt1);
				imgt2 = ((imgt2 == i)?2:imgt2);
				imgt3 = ((imgt3 == i)?2:imgt3);				
			}
			else if(i>=37 && i<=44){
				imgt1 = ((imgt1 == i)?15:imgt1);
				imgt2 = ((imgt2 == i)?15:imgt2);
				imgt3 = ((imgt3 == i)?15:imgt3);				
			}
			else{
				imgt1 = ((imgt1 == i)?18:imgt1);
				imgt2 = ((imgt2 == i)?18:imgt2);
				imgt3 = ((imgt3 == i)?18:imgt3);				
			}
		}
		
		today = "<h4>HOJE</h4>";
		today+= "<h4 id=\"t1\">"+tempToday+"<code>&deg;</code><span class=\"unit\" onclick=\"switchDegree()\">C</span></h4>";
		today+= "<h4>"+json.current_observation.condition.text+"</h4>";
		today+= "<span>Vento: "+json.current_observation.wind.speed+"Km/h</span><br/>";
		today+= "<span>Humidade: "+json.current_observation.atmosphere.humidity+"%</span><br/>";
		today+= "<span>Pressão: "+json.current_observation.atmosphere.pressure+"hPA</span>";
		$('#c2').html(today);
		tomorrow = "<h6>AMANHÃ</h6>";
		tomorrow+= "<h6 id=\"t2\">"+json.forecasts[1].high+"<code>&deg;</code><span class=\"unit\" onclick=\"switchDegree()\">C</span></h6>";
		tomorrow+= "<h6>"+json.forecasts[1].text+"</h6>";
		$('#c4').html(tomorrow);
		afterTomorrow = "<h6>DEPOIS DE AMANHÃ</h6>";
		afterTomorrow+= "<h6 id=\"t3\">"+json.forecasts[2].high+"<code>&deg;</code><span class=\"unit\" onclick=\"switchDegree()\">C</span></h6>";
		afterTomorrow+= "<h6>"+json.forecasts[2].text+"</h6>";
		$('#c6').html(afterTomorrow);
		$('#c1').html('<img src="'+baseUrl+'assets/img/'+imgt1+'.svg" height=100%; width=60%;/>');
		$('#c3').html('<img src="'+baseUrl+'assets/img/'+imgt2+'.svg" height=60%; width=40%;/>');
		$('#c5').html('<img src="'+baseUrl+'assets/img/'+imgt3+'.svg" height=60%; width=40%;/>');

		if(tempToday < 15){
			$('.conteiner').css('background-image','linear-gradient(to right, rgba(102,102,255,0.2), rgba(102,102,255,0.8))');
		}
		else if(tempToday > 35){
			$('.conteiner').css('background-image','linear-gradient(to right, rgba(255,102,102,0.2), rgba(255,102,102,0.8))');
		}
		else{
			$('.conteiner').css('background-image','linear-gradient(to right, rgba(255,255,102,0.2), rgba(255,255,102,0.8))');
		}
		
	}	
	});
};

/*Switches temperature from Celcius to Fahrenheit and vice versa*/
function switchDegree(){
	var tempToday = parseFloat($('.unit').parent()[0].childNodes[0].data);
	var tempTomorrow = parseFloat($('.unit').parent()[1].childNodes[0].data);
	var tempAftertomorrow = parseFloat($('.unit').parent()[2].childNodes[0].data);
	var degree = "";
	if ($('.unit').html() == "C"){
			tempToday = unitConverter(tempToday,"C");
			tempTomorrow = unitConverter(tempTomorrow,"C");
			tempAftertomorrow = unitConverter(tempAftertomorrow,"C");
			degree = "F";
	}
	else{
			tempToday = unitConverter(tempToday,"F");
			tempTomorrow = unitConverter(tempTomorrow,"F");
			tempAftertomorrow = unitConverter(tempAftertomorrow,"F");
			degree = "C";		

	}	
		$('#t1').html('<h4>'+tempToday+'<code>&deg;</code><span class=\"unit\" onclick=\"switchDegree()\">'+degree+'</span></h4>');
		$('#t2').html('<h6>'+tempTomorrow+'<code>&deg;</code><span class=\"unit\" onclick=\"switchDegree()\">'+degree+'</span></h6>');
		$('#t3').html('<h6>'+tempAftertomorrow+'<code>&deg;</code><span class=\"unit\" onclick=\"switchDegree()\">'+degree+'</span></h6>');	
}

/*Math function to convert temperature units*/
function unitConverter(unit, type){
	var result;
	if(type == "C"){
		result = (unit*9/5)+32;
	}
	else{
		result = (unit-32)*5/9;
	}
	return result.toFixed(0);
}

/*Main function carried at page load*/
$(document).ready(function(){
	getUserCoord();	
	getBackGroundImage();
	/*Check if the key pressed inside the input text was the Enter key 
	*so the application knows it's time to load the weather information
	*/
	$('input').keydown(function(k){
		if(k.which == 13){
			getWeather();
		}
	});
});
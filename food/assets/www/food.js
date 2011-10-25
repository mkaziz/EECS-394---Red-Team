var loclatitude;
var loclongitude;

function GPSonSuccess(position) {
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
						'Longitude: '          + position.coords.longitude             + '<br />' +
						'Altitude: '           + position.coords.altitude              + '<br />' +
						'Accuracy: '           + position.coords.accuracy              + '<br />' +
						'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
						'Heading: '            + position.coords.heading               + '<br />' +
						'Speed: '              + position.coords.speed                 + '<br />' +
						'Timestamp: '          + new Date(position.timestamp)          + '<br />';
	loclatitude=position.coords.latitude;
	loclongitude=position.coords.longitude;
}

function GPSonError(error) {
	alert(	'code: '    + error.code    + '\n' +
			'message: ' + error.message + '\n');
}
var locdistance = function(x,y){
	return Math.sqrt((x-loclatitude)*(x-loclatitude)+(y-loclongitude)*(y-loclongitude));
}

function autoselect(){
	document.getElementById("foodcourt4").selected=true;
}
var loclatitude;
var loclongitude;

var courtinfo=new Array(
	42.061,-87.675,"http://nucuisine.com/retail/lisas.html",
	42.058,-87.676,"http://nucuisine.com/retail/tech_express.html",
	42.057,-87.678,"http://nucuisine.com/retail/greatroom.html",
	42.057,-87.673,"http://nucuisine.com/retail/einstein.html",
	42.053,-87.672,"http://nucuisine.com/retail/norris.html",
	42.053,-87.674,"http://nucuisine.com/retail/plaza.html",
	42.053,-87.678,"http://nucuisine.com/retail/foster.html",
	42.051,-87.675,"http://nucuisine.com/retail/crowe.html",
	42.052,-87.681,"http://nucuisine.com/retail/frans.html",
	42.050,-87.675,"http://nucuisine.com/retail/hinman.html");

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
	autoselect();
}

function GPSonError(error) {
	alert(	'code: '    + error.code    + '\n' +
			'message: ' + error.message + '\n');
}
var locdistance = function(x,y){
	return Math.sqrt((x-loclatitude)*(x-loclatitude)+(y-loclongitude)*(y-loclongitude));
}

function autoselect(){
	var i;
	var tempdistance=locdistance(courtinfo[0],courtinfo[1]);
	var tempindex=0;
	for(i=0;i<document.getElementById('foodcourtselect').length;i++){
		if(locdistance(courtinfo[3*i],courtinfo[3*i+1])<=tempdistance)
			tempindex=i;
	}
	document.getElementById("foodcourtselect").selectedIndex=tempindex;
	alert("The nearest food court is "+document.getElementById("foodcourtselect").options[tempindex].text);
	document.getElementById('geolocation').innerHTML= "The nearest food court is "+document.getElementById("foodcourtselect").options[tempindex].text;
}
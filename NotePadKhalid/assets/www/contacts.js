// Add Contact Functions

function fetchContacts() {
	navigator.contacts.find(["id","name"], createContactsList, errorCB, null);
}

function callbackSuccess(contacts) {
	alert("Found " + contacts.length + " contacts.");
}

/**
 * Creates a str with all the notes in <li> elements, and sets that
 * as the HTML of the appropriate <ul> element. 
 * NOTE: <ul> element must be refreshed to apply jQuery Mobile markup
 */
function createContactsList(contacts) {
	var len = contacts.length;
	var outputStr = "";

	for (var i=0; i<len; i++){
		outputStr += "<li data-icon='plus'><a href = 'index.html' rel='external'>" //onclick='openNotePage("+results.rows.item(i).note_id+"); return false;'>" + 
					 + contacts[i].name.givenName + " " + contacts[i].name.familyName
					 + "</a></li>";
	}

	$("#listOfContacts").html(outputStr);
	$("#listOfContacts").listview("refresh");
}

// GENERIC FUNCTIONS

/**
 * Generic success callback function
 */
function successCB() {
	alert("Function executed successfully");
}


/**
 * Generic error callback function
 */
function errorCB(err) {
	alert("error");
	alert("Error: "+err.code+" msg: "+err.message);
}

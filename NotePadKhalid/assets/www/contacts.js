// Add Contact Functions

function fetchContacts() {
	navigator.contacts.find(["id","name"], callbackSuccess, errorCB, null);
}

function callbackSuccess(contacts) {
	alert("Found " + contacts.length + " contacts.");
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
	alert("Error: "+err.code+" msg: "+err.message);
}

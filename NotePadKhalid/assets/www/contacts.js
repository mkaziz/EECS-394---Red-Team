// GENERIC FUNCTIONS

/**
 * Generic success callback function, used for SQL interfacing
 */
function successCB() {
	alert("Note successfully saved");
}


/**
 * Generic error callback function, used for SQL interfacing
 */
function errorCB(err) {
	alert("Error processing SQL: "+err.code+" msg: "+err.message);
}

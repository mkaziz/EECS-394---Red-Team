
// FUNCTIONS THAT DEAL WITH THE PHONEGAP DEVICE LOADING.

//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	//var db = window.openDatabase("notes", "1.0", "Notes Demo", 2000000);
	//db.transaction(saveNote, errorCB, successCB);
}

// -------------------------------------------------- //


// FUNCTIONS USED FOR SAVING NOTES - USED IN note.html

function onNoteLoad() {
	
	var db = window.openDatabase("notes", "1.0", "Notes Demo", 2000000);
	//db.transaction(checkDb, errorCB, successCB);
	try {
		db.transaction(loadNote);
	}
	catch(e) {}
}

function loadNote(tx) {
	var noteId = getQueryVariable("noteid");
	
	try {
		tx.executeSql('CREATE TABLE IF NOT EXISTS notes (note_id integer primary key, name varchar(200) unique, data text, save_time date default CURRENT_TIMESTAMP)');
		tx.executeSql('SELECT * FROM notes where note_id = ' + noteId, [], openNote, errorCB);
	} catch (e) {
		alert(e.message());
	}   
 }
 
 function openNote(tx, results) {
	$("#name").val(results.rows.item(0).name);
	$("#data").val(results.rows.item(0).data);
	//alert("Row = " + i + " ID = " + results.rows.item(0).note_id + " Name =  " + results.rows.item(i).name + " Data =  " + results.rows.item(i).data + " time = " + results.rows.item(i).save_time);
		 
 }
 
/**
 * Called when the Save button is pressed. Creates the db handle and 
 * calls the function that will do the transaction with the db.
 */
function onSave() {
	var db = window.openDatabase("notes", "1.0", "Notes Demo", 2000000);
	//db.transaction(checkDb, errorCB, successCB);
	db.transaction(checkDb);
}

/**
 * Checks input data to make sure the note name isn't empty.
 * Also queries the db to see whether a previous note with the same name
 * exists. The success CB function for this query handles is another
 * transaction handling function.
 */
function checkDb(tx) {
	
	var noteName = $("#name").val();
	
	if (noteName == "") {
		alert("You must enter a name for your note!");
		throw new exception();
	}
	
	try {
		//tx.executeSql('DROP TABLE IF EXISTS notes');
		tx.executeSql('CREATE TABLE IF NOT EXISTS notes (note_id integer primary key, name varchar(200) unique, data text, save_time date default CURRENT_TIMESTAMP)');
		tx.executeSql('SELECT COUNT(*) AS count FROM notes WHERE name = "'+ noteName +'"', [], saveNote, errorCB);
	 } catch (e) {
		alert(e.message());
	 }
}

/**
 * Success CB function for the count(*) query. Depending on the result
 * of that, either an insert or an update into the the db is done.
 */
function saveNote(tx, results) {
	
	var numberOfRecords = results.rows.item(0).count;		
	var noteName = $("#name").val();
	var noteData = $("#data").val();
	
	if (numberOfRecords == 0)
		tx.executeSql('INSERT INTO notes (name, data) VALUES ("'+noteName+'","'+noteData+'")');
	else if (numberOfRecords == 1)
		tx.executeSql('UPDATE notes SET data = "'+ noteData +'", save_time = DateTime("now") WHERE name = "'+ noteName +'"');
	else
		alert("DB Error: More than one Note exists with this name.");
	
	//tx.executeSql('SELECT * FROM notes', [], querySuccess, errorCB);
	alert("Note saved");
}


/**
 * Debugging function. alert()'s every row returned by the query when used
 * as a CB function.
 */
function querySuccess(tx, results) { 
	var len = results.rows.length;

	for (var i=0; i<len; i++){
		alert("Row = " + i + " ID = " + results.rows.item(i).note_id + " Name =  " + results.rows.item(i).name + " Data =  " + results.rows.item(i).data + " time = " + results.rows.item(i).save_time);
	}
}


// FUNCTIONS FOR LOADING LIST OF NOTES - USED IN load.html

/** 
 * Called when the Load page is loaded. Creates the db handle and 
 * calls the function that will do the transaction with the db.
 */ 
function onLoad() {       
	var db = window.openDatabase("notes", "1.0", "Notes Demo", 2000000);
	//db.transaction(checkDb, errorCB, successCB);
	db.transaction(loadNotesList);
}

/**
 * Executes the SQL statements that fetches a list of all notes from
 * the database. If the transaction is successful, it calls the 
 * success callback function.
 */
function loadNotesList(tx) {
	try {
		tx.executeSql('CREATE TABLE IF NOT EXISTS notes (note_id integer primary key, name varchar(200) unique, data text, save_time date default CURRENT_TIMESTAMP)');
		tx.executeSql('SELECT * FROM notes', [], addNotesToList, errorCB);
	} catch (e) {
		alert(e.message());
	}   
 }


/**
 * Creates a str with all the notes in <li> elements, and sets that
 * as the HTML of the appropriate <ul> element. 
 * NOTE: <ul> element must be refreshed to apply jQuery Mobile markup
 */
function addNotesToList(tx,results) {
	var len = results.rows.length;
	var outputStr = "";
	
	for (var i=0; i<len; i++){
		outputStr += //<div+ results.rows.item(i).note_id + " - " 
					"<li><a href = 'index.html' onclick='openNotePage("+results.rows.item(i).note_id+"); return false;' rel='external'>" + 
					results.rows.item(i).name + 
					" - " +	results.rows.item(i).save_time + 
					"</a></li>";
	}
	
	$("#listOfNotes").html(outputStr);
	$("#listOfNotes").listview("refresh");
}

function openNotePage(noteId) {
	//document.location.href = "note.html";	
	document.location.href = "note.html?noteid="+noteId;
}

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

/**
 * Generic function to parse query string and return the value of 
 * a given parameter. I didn't write this function - somebody had
 * posted it on StackOverflow.
 */
function getQueryVariable(variable) {
	
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return unescape(pair[1]);
		}
	}
	throw new exception();
}


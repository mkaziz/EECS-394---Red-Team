// Add Contact Functions

function fetchContacts() {
	navigator.contacts.find(["id","name"], createContactsList, errorCB, null);
}

function addContact(contactId, givenName, familyName) {
	
	var confirmation = confirm("Do you want to add " 
								+ givenName + " " + familyName
								+ " to your list of secret contacts?");
	/*
	if (!confirmation)
		return;
		
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	
	db.transaction(
        function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS secretContacts (contactId integer primary key, givenName varchar(200), familyName varchar(200), save_time date default CURRENT_TIMESTAMP)');
            tx.executeSql("INSERT INTO secretContacts (contactId, firstName, lastName) values ("+contactId+","+givenName+","+familyName+")");
        }
    );
    */
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
		
		var givenName = contacts[i].name.givenName;
		var familyName = contacts[i].name.familyName;
		var contactId = contacts[i].name.id;
			
		outputStr += "<li><a onclick='addContact(\""+contactId+"\",\""+givenName+"\",\""+familyName+"\"); return false;'"
					 + " rel='external'>"
					 + givenName + " " + familyName
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

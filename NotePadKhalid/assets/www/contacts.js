// Add Contact Functions

function fetchContacts() {
	navigator.contacts.find(["id","name"], createContactsList, errorCB, null);
}

function addContact(contactId, givenName, familyName) {
	
	var confirmation = confirm("Do you want to add " 
								+ givenName + " " + familyName
								+ " to your list of secret contacts?");
	
	if (!confirmation)
		return;
		
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	
	db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS secretContacts (contactId integer primary key, givenName varchar(200), familyName varchar(200), add_time date default CURRENT_TIMESTAMP)');
            tx.executeSql('SELECT count(*) AS count FROM secretContacts where contactId = '+contactId,
							[],
							function(tx, results) {
								var numberOfRecords = results.rows.item(0).count;
								
								if (numberOfRecords > 0) {
									alert(givenName+ " " + familyName + " is already in the secret contacts list");
								}
								else {
									tx.executeSql("INSERT INTO secretContacts (contactId, givenName, familyName) "
												  + "select "+contactId+",'"+givenName+"','"+familyName+"' WHERE NOT EXISTS "
												  + "(select * from secretContacts where contactId = "+contactId+")"
												  , [], function() {alert("Contact successfully added!")}, errorCB);
								}
								
							}, errorCB);
            //tx.executeSql('SELECT * FROM secretContacts', [], querySuccess, errorCB);
        }
    );
    
}

/**
 * Debugging function. alert()'s every row returned by the query when used
 * as a CB function.
 */
function querySuccess(tx, results) { 
	
	var len = results.rows.length;
	
	for (var i=0; i<len; i++){
		alert("Row = " + i + " ID = " + results.rows.item(i).contactId + " Name =  " + results.rows.item(i).givenName + " Data =  " + results.rows.item(i).familyName + " time = " + results.rows.item(i).add_time);
	}
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
		var contactId = contacts[i].id;
			
		outputStr += "<li data-icon='plus'>"
					 + "<a onclick='addContact(\""+contactId+"\",\""+givenName+"\",\""+familyName+"\"); return false;'"
					 + " rel='external' data-icon='plus'>"
					 + givenName + " " + familyName
					 + "</a></li>";
	}

	$("#listOfContacts").html(outputStr);
	$("#listOfContacts").listview("refresh");
}

// DELETE CALL LOG

function deleteCallLog() {
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);

	
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS secretContacts (contactId integer primary key, givenName varchar(200), familyName varchar(200), add_time date default CURRENT_TIMESTAMP)');
			tx.executeSql('SELECT * FROM secretContacts', [], 
			function(tx, results) {
				//alert("searched internal db: " + results.rows.length);
				navigator.contacts.find(["id","name", "phoneNumbers"], 
				function(contacts) {
					var contactsMap = [];													
					
					var len = contacts.length;
					//alert("searched external db: "+ len);
					for (var i=0; i<len; i++){
						contactsMap[contacts[i].id]=contacts[i];
						//alert(contacts[i].name.givenName);
					}
					
					len = results.rows.length;
					for (var i=0; i<len; i++){
						//alert(results.rows.item(i).familyName);
						var currContactId = results.rows.item(i).contactId;
						if (contactsMap[currContactId] != null) {
							var numbersCount = contactsMap[currContactId].phoneNumbers.length;
							//alert(numbersCount);
							for (var j=0; j<numbersCount; j++){
								//alert(contactsMap[currContactId].phoneNumbers[j].value);
								window.plugins.deleteCalls.del(contactsMap[currContactId].phoneNumbers[j].value,
																function(r){
																	//alert("deleted " +r.callsDel+" records");
																}, 
																function(){alert("failure")});
															}
						
						}	
					}
				}, 
				errorCB, 
				null);
			}, errorCB);
		});
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

// Add Contact Functions

function fetchContacts() {
	navigator.contacts.find(["id","name"], createContactsList, errorCB, null);
}

var addinternal = {
	addNumberField: function() {
		if ( typeof addinternal.addNumberField.counter == 'undefined' ) {
			addinternal.addNumberField.counter = 2;
		}
		else {
			addinternal.addNumberField.counter++;
		}
		var idNum = addinternal.addNumberField.counter;
		var appendText = '<div data-role="fieldcontain"><label for="number'+idNum+'">Phone Number:</label><input type="tel" id="number'+idNum+'" value=""/></div>';
		$("#phonenumbers").append(appendText).trigger("create");	
	},
	
	onSubmit: function () {
		var name = $.trim($("#name").val()); 		
		
		if (name == "") {
			alert("You must enter a name to identify the contact");
			return;
		}
		
		if (utils.confirmation(name) == false)
			return;
		
		var numbers = [];
		for (var currIdNum = 1; $("#number"+currIdNum).length != 0; currIdNum++) {
			if ($("#number"+currIdNum).val() == "")
				continue;
			numbers.push($("#number"+currIdNum).val());
			//alert(numbers[currIdNum-1]);
		}
		
		var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
		db.transaction(
			function(tx) {
				//tx.executeSql('DROP TABLE IF EXISTS contacts');
				//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
				//tx.executeSql('DROP TABLE IF EXISTS numbers');
				tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
				tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
				tx.executeSql('SELECT count(*) AS count FROM contacts where name = "'+name+'"',
							[],
							function(tx, results) {
								var numberOfRecords = results.rows.item(0).count;
								
								if (numberOfRecords > 0) {
									alert("Cannot create new contact: " + name + " is already in the list.");
									return;
								}
								
								tx.executeSql("INSERT INTO contacts (name) values"
											  + "('"+name+"')"
											  , [], function (tx, results) {
														for (num in numbers) {
															//alert("INSERT INTO numbers (contactId, number) values ("+results.insertId+","+numbers[num]+")");
															tx.executeSql("INSERT INTO numbers (contactId, number) values ("+results.insertId+","+numbers[num]+")");
														}
														for (var currIdNum = 1; $("#number"+currIdNum).length != 0; currIdNum++) {
															$("#number"+currIdNum).val("");
														}
														$("#name").val("");
														alert("Contact successfully saved!");
														
													}, errorCB);
								}, errorCB);
							
		});
	}
}
function addContact(contactId, givenName, familyName) {
	
	if (utils.confirmation(givenName) == false)
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

var deleteCallLogs = {
	
	del: function () {
		var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
		
		db.transaction(        
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
				tx.executeSql('SELECT * FROM numbers', [], 
					function(tx, results) {
						//alert(results.rows.item(0).number);
						var len = results.rows.length;
						for (var i=0; i<len; i++){
							window.plugins.deleteCalls.del(results.rows.item(i).number,
																function(r){
																	alert(r.callsDel+" records found and deleted");
																}, 
																function(){alert("Unable to delete calls")});
							
						}
					
					}, errorCB);
			}
			
		);
	}
	
}

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
function errorCB(tx, err) {
	alert("Error: "+err.code+" msg: "+err.message);
}

var utils = {
	
	confirmation : function (name) {
		var confirmed = confirm("Do you want to add " 
								+ name
								+ " to your list of secret contacts?");
	
		if (confirmed)
			return true;
		else 
			return false;
	}
	
}

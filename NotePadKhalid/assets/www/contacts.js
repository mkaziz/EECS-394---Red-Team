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
														
			var num = $("#number"+currIdNum).val().replace(/\D/g,"");
			//if (numbers[num].length < 9 || numbers[num].length > 15) {
				//alert();
			//	throw "Error: numbers must be between 9 and 15 digits in size";
			//}
			numbers.push(num);
			
			
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
															//alert(numbers[num]);
															//alert("INSERT INTO numbers (contactId, number) values ("+results.insertId+","+numbers[num]+")");
															tx.executeSql("INSERT INTO numbers (contactId, number) values ("+results.insertId+","+numbers[num]+")",[],null,errorCB);
														}
														addinternal.addNumberField.counter = 2;
														var appendText = '<div data-role="fieldcontain"><label for="number1">Phone Number:</label><input type="tel" id="number1" value=""/></div>';
														$("#phonenumbers").html(appendText).trigger("create");
														$("#name").val("");
														alert("Contact successfully saved!");
														
													}, errorCB);
								}, errorCB);
							
		});
	}
}

var addexternal = {
	
	fetchContacts: function () {
		//alert("Called fetchContacts ...");
		navigator.contacts.find(["id","name", "phoneNumbers"], addexternal.createContactsList, errorCB, null);
	},
	
	/**
	* Creates a str with all the notes in <li> elements, and sets that
	* as the HTML of the appropriate <ul> element. 
	* NOTE: <ul> element must be refreshed to apply jQuery Mobile markup
	*/
	createContactsList: function(contacts) {
		$.mobile.showPageLoadingMsg();
		//alert("Creating list ...");
		var len = contacts.length;
		var outputStr = "";

		//alert ("starting outer loop ...");
		for (var i=0; i<len; i++){
			
			if (contacts[i].name == null)
				continue;
			
			if (contacts[i].name.givenName == null)
				contacts[i].name.givenName = "";
			if (contacts[i].name.familyName == null)
				contacts[i].name.familyName = "";
			
			var name = $.trim(contacts[i].name.givenName+" "+contacts[i].name.familyName);
			if (name == "") 
				continue;
			/*
			if (i > 232) {
				alert(name);
				alert(contacts[i].phoneNumbers.length);
				alert(contacts[i].phoneNumbers[0].value);
			}
			*/
			var phoneNums = [];
			//alert ("starting inner loop ...");
			
			if (contacts[i].phoneNumbers == null)
				continue;

			for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
				if (contacts[i].phoneNumbers[j].value == null)
					continue;
				phoneNums[j] = contacts[i].phoneNumbers[j].value;
			}
			/*
			if (i > 232) {
				alert(phoneNums.length);
			}
			*/
			if (phoneNums.length == 0)
				continue;
			
			//alert('<a onclick=\'addContact("'+name+'","'+phoneNums.toString()+'"); return false;\'');	
			outputStr += "<li data-icon='plus'><a onclick='addexternal.addContact(\""
						 +name+'","'
						 +phoneNums.toString()
						 + "\"); return false;' rel='external' data-icon='plus'>"
						 + name
						 + "</a></li>";
			/*			 
			if (i > 232) {
				alert(outputStr);
			}
			*/
			$("#listOfContacts").html(i);
		}
		//alert(outputStr);
		$.mobile.hidePageLoadingMsg();

		$("#listOfContacts").html(outputStr);
		$("#listOfContacts").listview("refresh");
	},
	
	addContact: function(name, numbers) {
		
		if (name == "") {
			alert("Adding contacts without names is not supported yet.");
			return;
		}
		
		if (utils.confirmation(name) == false)
			return;
		
		var rawNums = numbers.split(',');
		var preparedNums = [];
		
		for (var i = 0; i < rawNums.length; i++) {
			preparedNums.push(rawNums[i].replace(/\D/g,""));
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
														for (num in preparedNums) {
															//alert(preparedNums[num]);
															//alert("INSERT INTO numbers (contactId, number) values ("+results.insertId+","+preparedNumbers[num]+")");
															tx.executeSql("INSERT INTO numbers (contactId, number) values ("+results.insertId+","+preparedNums[num]+")",[],null,errorCB);
														}
														alert("Contact successfully saved!");
														
													}, errorCB);
								}, errorCB);
							
		});
		
		
	}
	
}


// DELETE CALL LOG

var del = {
	
	deleteCallLogs: function () {
		var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
		
		db.transaction(        
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
				tx.executeSql('SELECT * FROM numbers', [], 
					function(tx, results) {
						//alert(results.rows.item(0).number);
						var len = results.rows.length;
						var numbersToDel = [];
						for (var i=0; i<len; i++){
							//alert(results.rows.item(i).number);
							numbersToDel.push(results.rows.item(i).number);
						}
							
						window.plugins.deleteCalls.del(numbersToDel,
									function(r){
										alert(r.callsDel+" records found and deleted");
									}, 
									function(){alert("Unable to delete calls")});

					
					}, errorCB);
			}
			
		);
	}
	
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

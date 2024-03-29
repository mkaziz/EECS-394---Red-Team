//Fetch all contacts inside the secret database already
function FindContacts(){

	$.mobile.showPageLoadingMsg();
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
			tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
			tx.executeSql('SELECT * FROM contacts, numbers WHERE contacts.contactId = numbers.contactId ORDER BY contacts.name', [], 
				function(tx, results) {
					//alert("we are here!"+results.rows.item(0).givenName);
					var output = "";
					//alert("we are in FindContacts!");
					for (var i = 0; i < results.rows.length; i++){
						var Name 		= results.rows.item(i).name;
						var contactId 	= results.rows.item(i).contactId;
						var Numbers		= results.rows.item(i).number;
						//var number		= results.rows.item(i).numbers[0];
						//alert(contactId + ", " + Name);
						if((i==0) || ((i>0) && (results.rows.item(i).contactId != results.rows.item(i-1).contactId)))
						{
							output +=	"<div data-role=\"collapsible\">" +
									"<h3>" + Name + "</h3>" +
									"<ul data-role=\"listview\" data-inset=\"true\">" + 
										"<fieldset class=\"ui-grid-a\">" +
											"<div class=\"ui-block-a\">" +
												"<button type=\"submit\" data-icon=\"gear\"	 data-theme=\"c\" onclick=\"storeinfo(" + Name + ");\">Modify</button>" +
											"</div>" +
											"<div class=\"ui-block-b\">" +
												"<button type=\"submit\" data-icon=\"delete\" data-theme=\"b\" onclick=\"DeleteContacts('" + contactId + "','" + Name + "');\">Delete</button>" +
											"</div>" +
										"</fieldset>";
						}
						
						// check whether it is the only number!
						//1: it is the only one
						//2: there are several
						var onlyone;
						
						if(i == 0){
							if(results.rows.length != 1){
								onlyone = (results.rows.item(0).contactId != results.rows.item(1).contactId);
							}
							else{
								onlyone = true;
							}
						}
						
						else if(i == results.rows.length - 1){
							onlyone = (results.rows.item(i).contactId != results.rows.item(i-1).contactId);
						}
						
						else{
							onlyone = (results.rows.item(i).contactId != results.rows.item(i-1).contactId) && (results.rows.item(i).contactId != results.rows.item(i+1).contactId);
						}
						
						output += "<li>" +
										"<a href=\"tel:" + Numbers + "\">Call: "+ Numbers + "</a><a data-role='button' data-icon='delete' data-theme=\"a\" onclick=\"DeleteNumber(" + contactId + "," + Numbers + "," + onlyone + ");\">del</a>" +
									"</li>" +
									"<li>" +
										"<a href=\"sms:" + Numbers + "\">Send text to: "+ Numbers + "</a>" +
									"</li>";
						
						if((i+1 == results.rows.length) || ((i+1 < results.rows.length) && (results.rows.item(i).contactId != results.rows.item(i+1).contactId)))
						{
							output += "</ul></div>";
						}
					}
					
					if(results.rows.length){
						$("#secretlist").html(output).trigger("create");
					}
					
					else
					{
						$("#secretlist").html("<center>Oops, You don't have any Secret Contacts!</center>").trigger("create");
					}
					
					$.mobile.hidePageLoadingMsg();
				}, errorCB);
		});
		FindUnknownContact();
}

//modify fields of existing contacts
function ModifyContacts(contactId,Name){
	var r = confirm("Delete "+ Name + "!");
	if (r == true){
		DeleteContacts(contactId,Name);
		FindContacts();
		alert("OK! " + Name + " deleted!");
	}
}

//storing mod contact info
function storeinfo(name) {
	localStorage.setItem("name", name);  
	localStorage["name"] = name;
	window.location.href = "modcontacts.html";
}

//delete contacts already existing in secret database
function DeleteContacts(contactId,Name){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	var r = confirm("Delete "+ Name + "!");
	if (r == true)
	{
		db.transaction(
     	function(tx) {
       		//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
			tx.executeSql('DELETE FROM contacts WHERE contactId=?', [contactId], [], errorCB);
		});
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
			tx.executeSql('DELETE FROM numbers WHERE contactId=?', [contactId], [], errorCB);
		});
		FindContacts();
		alert("OK! " + Name + " deleted!");
	}
	else
	{
		alert("No action taken!");
	}
}

//delete just the number involved with a contact
function DeleteNumber(contactId,Number,onlyone){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	var r = confirm("Delete "+ Number + "!");
	if (r == true)
	{
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
			tx.executeSql('DELETE FROM numbers WHERE number=?', [Number], [], errorCB);
		});
		if(onlyone){
			alert(onlyone);
			db.transaction(
	     	function(tx) {
	       		//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
				tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
				tx.executeSql('DELETE FROM contacts WHERE contactId=?', [contactId], [], errorCB);
			});
		}
		FindContacts();
		alert("OK! " + Number + " deleted!");
	}
	else
	{
		alert("No action taken!");
	}
}

function FindUnknownContact() {
	var options = new ContactFindOptions();
	options.filter="Unknown"; 
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, UnknownContactPush, [], options);
}

function UnknownContactPush(contacts) {
	if (contacts.length == 0) {
		// unknown contact not found, create it
		var contact = navigator.contacts.create({"displayName": "Unknown"});
		
		var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);	
		db.transaction(        
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
				tx.executeSql('SELECT * FROM numbers', [], 
					function(tx, results) {
						//alert(results.rows.item(0).number);
						var len = results.rows.length;
						var numbersToDel = [];
						var temp;
						for (var i=0; i<len; i++){
							//alert(results.rows.item(i).number);
							temp = new ContactField('work', results.rows.item(i).number, false);
							numbersToDel.push(temp);
						}

						contact.phoneNumbers = [];
						contact.phoneNumbers = numbersToDel;
						contact.save();


					}, errorCB);
			}

		);
        
	}
	else{
		var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);	
		db.transaction(        
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
				tx.executeSql('SELECT * FROM numbers', [], 
					function(tx, results) {
						//alert(results.rows.item(0).number);
						var len = results.rows.length;
						var numbersToDel = [];
						var temp;
						for (var i=0; i<len; i++){
							//alert(results.rows.item(i).number);
							temp = new ContactField('work', results.rows.item(i).number, false);
							numbersToDel.push(temp);
						}
					
						contacts[0].phoneNumbers = [];
						contacts[0].phoneNumbers = numbersToDel;
						contacts[0].save();

				
					}, errorCB);
			}
		
		);
	}
}

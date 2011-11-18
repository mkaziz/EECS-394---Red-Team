function FindContacts(){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);

	db.transaction(
        function(tx) {
         //tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS secretContacts (contactId integer primary key, givenName varchar(200), familyName varchar(200), add_time date default CURRENT_TIMESTAMP)');
			tx.executeSql('SELECT * FROM secretContacts', [],
			function(tx, results) {
				var output = "";
				for (var i = 0; i < results.rows.length; i++){
					var givenName = results.rows.item(i).givenName;
					var familyName = results.rows.item(i).familyName;
					var contactId = results.rows.item(i).contactId;
					//var number = results.rows.item(i).numbers;
					eachname= givenName + " " + familyName;
					
					output += "<div data-role=\"collapsible\">" +
    								"<h3>" + eachname + "</h3>" +
    									"<ul data-role='listview' data-inset='true'>" +
     										"<li><a href='tel:" + "number" + "' rel=external>Call</a></li>" +
     										"<li><a href='sms:" + "number" + "' id='target' rel=external>Send Text</a></li>" +
     										"<li><a onclick='ModifyContacts(\"" + contactId + "\",\"" + givenName + "\",\"" + familyName + "\");' rel=external>"+ "Delete" + "</a></li>" +
										"</ul>" +
							"</div>";
			}
			$("#content").html("");
			$(output).appendTo( "#content" );
			$('#pageId').page('destroy').page(); 
			

		}, errorCB);
	});
}



//modify fields of existing contacts
function ModifyContacts(contactId,Name){
	var r = confirm("Delete "+ Name + "!");
	if (r == true){
		DeleteContacts(contactId,Name);
		FindContacts();
		alert("OK! " + Name + " Deleted!");
	}
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
		alert("OK! " + Name + " Deleted!");
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
		alert("OK! " + Number + " Deleted!");
	}
	else
	{
		alert("No action taken!");
	}
}
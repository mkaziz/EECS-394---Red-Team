function FindContacts(){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS secretContacts (contactId integer primary key, givenName varchar(200), familyName varchar(200), add_time date default CURRENT_TIMESTAMP)');
			tx.executeSql('SELECT * FROM secretContacts', [], 
				function(tx, results) {
					//alert("we are here!"+results.rows.item(0).givenName);
					var output = "";
					for (var i = 0; i < results.rows.length; i++){
						var givenName 	= results.rows.item(i).givenName;
						var familyName 	= results.rows.item(i).familyName;
						var contactId 	= results.rows.item(i).contactId;
						var number		= results.rows.item(i).numbers;
						eachname= givenName + " " + familyName;
						output += "<div data-role='collapsible'>" +
   										"<h3>" + eachname + "</h3>" +
   											"<ul data-role='listview' data-inset='true'>" +
    												"<li><a href='tel:" + number + "' rel=external>Call</a></li>" +
    												"<li><a href='sms:" + number + "' id='target' rel=external>Send In Text</a></li>" +
    												"<li><a onclick='ModifyContacts(\"" + contactId + "\",\"" + givenName + "\",\"" + familyName + "\");' rel=external>"+ "Delete" + "</a></li>" +
											"</ul>" +
									"</div>";
					}
					document.getElementById("content").innerHTML = output;
				}, errorCB);
		});
}

function ModifyContacts(contactId,givenName,familyName){
	var r = confirm("Delete "+ givenName + " " + familyName + "!");
	if (r == true){
		DeleteContacts(contactId,givenName,familyName);
		FindContacts();
		alert("OK! " + givenName + " " + familyName + " Deleted!");
	}
	else
	{
		alert("No action taken!");
	}
}

function DeleteContacts(contactId,givenName,familyName){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS secretContacts (contactId integer primary key, givenName varchar(200), familyName varchar(200), add_time date default CURRENT_TIMESTAMP)');
			tx.executeSql('DELETE FROM secretContacts WHERE givenName=?', [givenName], [], errorCB);
		});
}
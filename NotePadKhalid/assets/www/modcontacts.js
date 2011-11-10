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
						//var number		= results.rows.item(i).numbers[0];

						output += 	"<li>" +
										"<a data-role='button' href=\"tel: 5554\" rel=external>" + 
											  givenName + " " + familyName + 
										"</a>" +
										"<a data-role='button' data-icon='delete' data-theme=\"a\" onclick='ModifyContacts(\"" + contactId + "\",\"" + givenName + "\",\"" + familyName + "\");' rel=external>" + 
										"</a>" +
										
										
									"</li>"
									;
					}
					$("#secretlist").html(output);
					$("#secretlist").listview("refresh");
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
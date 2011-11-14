function FindContacts(){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
			tx.executeSql('SELECT * FROM contacts', [], 
				function(tx, results) {
					//alert("we are here!"+results.rows.item(0).givenName);
					var output = "";
					for (var i = 0; i < results.rows.length; i++){
						var Name 		= results.rows.item(i).name;
						var contactId 	= results.rows.item(i).contactId;
						//var number		= results.rows.item(i).numbers[0];

						output += 	"<li>" +
										"<a data-role='button' href=\"tel: 5554\" rel=external>" + 
											  Name + 
										"</a>" +
										"<a data-role='button' data-icon='delete' data-theme=\"a\" onclick='ModifyContacts(\"" + contactId + "\",\"" + Name + "\");' rel=external>" + 
										"</a>" +
										
										
									"</li>"
									;
					}
					$("#secretlist").html(output);
					$("#secretlist").listview("refresh");
				}, errorCB);
		});
}

function ModifyContacts(contactId,Name){
	var r = confirm("Delete "+ Name + "!");
	if (r == true){
		DeleteContacts(contactId,Name);
		FindContacts();
		alert("OK! " + Name + " Deleted!");
	}
}

function DeleteContacts(contactId,Name){
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
	
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
			tx.executeSql('DELETE FROM contacts WHERE contactId=?', [contactId], [], errorCB);
		});
}

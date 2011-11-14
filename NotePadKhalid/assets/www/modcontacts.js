function FindContacts(){
	alert("we are in FindContacts!");
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
			tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
			tx.executeSql('SELECT * FROM contacts', [], 
				function(tx, results) {
					//alert("we are here!"+results.rows.item(0).givenName);
					var output = "";
					for (var i = 0; i < results.rows.length; i++){
						var Name 		= results.rows.item(i).name;
						var contactId 	= results.rows.item(i).contactId;
						//var number		= results.rows.item(i).numbers[0];
						alert(contactId + ", " + Name);
		//				output += 	"<li>" +
		//								"<a data-role='button' href=\"tel: 5554\" rel=external>" + 
		//									  Name + 
		//								"</a>" +
		//								"<a data-role='button' data-icon='delete' data-theme=\"a\" onclick='ModifyContacts(\"" + contactId + "\",\"" + Name + "\");' rel=external>" + 
		//								"</a>";
						output +=	"<div data-role=\"collapsible\">" +
									"<h3>" + Name + "</h3>" +
									"<ul data-role=\"listview\" data-inset=\"true\">" + 
										"<fieldset class=\"ui-grid-a\">" +
											"<div class=\"ui-block-a\">" +
												"<button type=\"submit\" data-icon=\"gear\"	 data-theme=\"c\" onclick=\"alert('click');\">Modify</button>" +
											"</div>" +
											"<div class=\"ui-block-b\">" +
												"<button type=\"submit\" data-icon=\"delete\" data-theme=\"b\" onclick=\"alert('click');\">Delete</button>" +
											"</div>" +
										"</fieldset>";
						tx.executeSql('SELECT * FROM numbers WHERE contactId=?'
							, [contactId], function(tx, results) {
								alert("output");
								for (var j = 0; j < results.rows.length; j++){
									var Numbers	= results.rows.item(i).number;
									alert(contactId + ", " + Numbers);
									output += "<li>" +
													"<a href=\"tel:" + Numbers + "\">CALL</a><a data-role='button' data-icon='delete' data-theme="a" onclick="alert('click');">del</a>" +
												"</li>";
								}
								alert(output);
							}, errorCB);
						output += "</ul></div>";
						alert(output);
					}
			//		$("#secretlist").html(output);
			//		$("#secretlist").listview("refresh");
					$("#secretlist").html(output).trigger("create");
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

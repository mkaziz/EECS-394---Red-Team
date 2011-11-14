function FindContacts(){
	
	var db = window.openDatabase("secrets", "1.0", "Secret Contacts", 500000);
		db.transaction(
        function(tx) {
        	//tx.executeSql('DROP TABLE IF EXISTS secretContacts');
			tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (contactId integer primary key, name varchar(200),  unique(name))');
			tx.executeSql('CREATE TABLE IF NOT EXISTS numbers (contactId integer not null, number integer not null, foreign key(contactId) references contacts(contactId))');
			tx.executeSql('SELECT * FROM contacts, numbers WHERE contacts.contactId = numbers.contactId', [], 
				function(tx, results) {
					//alert("we are here!"+results.rows.item(0).givenName);
					var output = "";
					alert("we are in FindContacts!");
					for (var i = 0; i < results.rows.length; i++){
						var Name 		= results.rows.item(i).name;
						var contactId 	= results.rows.item(i).contactId;
						var Numbers		= results.rows.item(i).number;
						//var number		= results.rows.item(i).numbers[0];
						alert(contactId + ", " + Name);
						if((i>0) && (results.rows.item(i).contactId != results.rows.item(i-1).contactId))
						{
							output +=	"<div data-role=\"collapsible\">" +
									"<h3>" + Name + "</h3>" +
									"<ul data-role=\"listview\" data-inset=\"true\">" + 
										"<fieldset class=\"ui-grid-a\">" +
											"<div class=\"ui-block-a\">" +
												"<button type=\"submit\" data-icon=\"gear\"	 data-theme=\"c\" onclick=\"alert('click');\">Modify</button>" +
											"</div>" +
											"<div class=\"ui-block-b\">" +
												"<button type=\"submit\" data-icon=\"delete\" data-theme=\"b\" onclick=\"DeleteContacts(" + contactId + ", " + Name + ");\">Delete</button>" +
											"</div>" +
										"</fieldset>";
						}
						else if(i==0)
						{
							output +=	"<div data-role=\"collapsible\">" +
									"<h3>" + Name + "</h3>" +
									"<ul data-role=\"listview\" data-inset=\"true\">" + 
										"<fieldset class=\"ui-grid-a\">" +
											"<div class=\"ui-block-a\">" +
												"<button type=\"submit\" data-icon=\"gear\"	 data-theme=\"c\" onclick=\"alert('click');\">Modify</button>" +
											"</div>" +
											"<div class=\"ui-block-b\">" +
												"<button type=\"submit\" data-icon=\"delete\" data-theme=\"b\" onclick=\"DeleteContacts(" + contactId + ", " + Name + ");\">Delete</button>" +
											"</div>" +
										"</fieldset>";
						}
						output += "<li>" +
										"<a href=\"tel:" + Numbers + "\">CALL:"+ Numbers + "</a><a data-role='button' data-icon='delete' data-theme=\"a\" onclick=\"DeleteNumber(" + Numbers + ");\">del</a>" +
									"</li>";
		//				tx.executeSql('SELECT * FROM numbers WHERE contactId=?'
		//					, [results.rows.item(i).contactId], function(tx, results) {
		//						alert(results.rows.item(0).number);
		//						for (var j = 0; j < results.rows.length; j++){
		//							var Numbers	= results.rows.item(i).number;
		//							alert(contactId + ", " + Numbers);
		//							output += "<li>" +
		//											"<a href=\"tel:" + Numbers + "\">CALL</a><a data-role='button' data-icon='delete' data-theme=\"a\" onclick=\"alert('click');\">del</a>" +
		//										"</li>";
		//						}
		//						alert(output);
		//					}, errorCB);
						if((i+1 < results.rows.length) && (results.rows.item(i).contactId != results.rows.item(i+1).contactId))
						{
							output += "</ul></div>";
						}
						else if(i+1 == results.rows.length)
						{
							output += "</ul></div>";
						}
					//	alert(output);
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

function DeleteNumber(Number){
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
		FindContacts();
		alert("OK! " + Number + " Deleted!");
	}
	else
	{
		alert("No action taken!");
	}
}
//Fetch all contacts inside the secret database already
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
												"<button type=\"submit\" data-icon=\"gear\"	 data-theme=\"c\" onclick=\"alert('click');\">Modify</button>" +
											"</div>" +
											"<div class=\"ui-block-b\">" +
												"<button type=\"submit\" data-icon=\"delete\" data-theme=\"b\" onclick=\"DeleteContacts('" + contactId + "','" + Name + "');\">Delete</button>" +
											"</div>" +
										"</fieldset>";
						}
						var onlyone;// check whether it is the only number! 1: it is the onlyone, 2: there are several
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
										"<a href=\"tel:" + Numbers + "\">CALL:"+ Numbers + "</a><a data-role='button' data-icon='delete' data-theme=\"a\" onclick=\"DeleteNumber(" + contactId + "," + Numbers + "," + onlyone + ");\">del</a>" +
									"</li>";
						if((i+1 == results.rows.length) || ((i+1 < results.rows.length) && (results.rows.item(i).contactId != results.rows.item(i+1).contactId)))
						{
							output += "</ul></div>";
						}
					//	alert(output);
					}
			//		$("#secretlist").html(output);
			//		$("#secretlist").listview("refresh");
					
					if(results.rows.length){
						$("#secretlist").html(output).trigger("create");
					}
					else
					{
						$("#secretlist").html("<center>Oops, it's empty!</center>").trigger("create");
					}
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
function FindOnSuccess(contacts) {
	var len = contacts.length;
	var output = "";
	
	// debug use
	contacts[0].name.givenName="Haotian";
	contacts[0].name.familyName="Liu";
	contacts[0].id=123;
	contacts.length=1;
	
	for (var i = 0; i < contacts.length; i++){

		var givenName 	= contacts[i].name.givenName;
		var familyName 	= contacts[i].name.familyName;
		var contactId 	= contacts[i].id;
			
		output += 	"<li data-icon='gear'>" +
						"<a data-role='button' onclick='ModifyContacts(\"" + contactId + "\",\"" + givenName + "\",\"" + familyName + "\");' rel=external>" + 
							  givenName + " " + familyName + 
						"</a></li>"
					;
	}
	
	$("#secretlist").html(output);
	$("#secretlist").listview("refresh");
}

function FindOnError(contactError) {
    alert('FindOnError!');
}

function FindContacts(){
	var options = new ContactFindOptions();
	options.filter = "Liu"; 
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, FindOnSuccess, FindOnError, options);
}

function ModifyContacts(contactId,givenName,familyName){
	var r = confirm("Delete "+ givenName + " " + familyName + "!");
	if (r == true){
		alert("OK! " + givenName + " " + familyName + " Deleted!");
		DeleteContacts(contactId,givenName,familyName);
	}
	else
	{
		alert("No action taken!");
	}
}

function DeleteContacts(contactId,givenName,familyName){
	alert("Delete Contacts!");
}
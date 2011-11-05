document.addEventListener("deviceready", Findcontacts, false);

function FindOnSuccess(contacts) {
	for (var i=0; i<contacts.length; i++) {
		console.log("Display Name = " + contacts[i].displayName);
	}
	DisplayContacts(contacts);
}

function FindOnError(contactError) {
    alert('onError!');
}

function FindContacts(){
	var options = new ContactFindOptions();
	options.filter="L"; 
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, FindOnSuccess, FindOnError, options);
}

function DisplayContacts(contacts){
	var len = contacts.length;
	var output = "";

	for (var i=0; i<contacts.length; i++){
		
		contacts[i].name.givenName="Haotian";
		contacts[i].name.familyName="Liu";

		var givenName 	= contacts[i].name.givenName;
		var familyName 	= contacts[i].name.familyName;
		var contactId 	= contacts[i].id;
			
		output += "<li data-icon='plus'>"
					 + "<a onclick='SaveContacts(\""+contactId+"\",\""+givenName+"\",\""+familyName+"\");'"
					 + " rel='external' data-icon='plus'>"
					 + givenName + " " + familyName
					 + "</a></li>";
	}
	
	document.getElementById('secretlist').innerHTML=output;
	$("#secretlist").listview("refresh");
}

function SaveContacts(contactId,givenName,familyName){
	var contact = navigator.contacts.create();
	
	var name = new ContactName();
	name.familyName 	= familyName;
	name.givenName 		= "test";
	contact.name 		= name;
	
	var phoneNumbers = [0];
	phoneNumbers[0] = new ContactField('home', '212-555-1234', true);
	contact.phoneNumbers = phoneNumbers;

	var r=confirm("Move it to your PHONE CONTACTS!");
	if (r==true){
		contact.save(SaveOnSuccess,SaveOnError);
		alert("OK! Saved "+givenName+" "+familyName);
	}
	else
	{
		alert("You pressed Cancel!");
	}
}

function SaveOnSuccess(contact) {
    alert("Save Success");
};

function SaveOnError(contactError) {
    alert("Error = " + contactError.code);
};
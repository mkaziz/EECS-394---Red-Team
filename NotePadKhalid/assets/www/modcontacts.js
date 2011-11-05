document.addEventListener("deviceready", Findcontacts, false);

function FindonSuccess(contacts) {
	for (var i=0; i<contacts.length; i++) {
		console.log("Display Name = " + contacts[i].displayName);
	}
	Displaycontacts(contacts);
}

function FindonError(contactError) {
    alert('onError!');
}

function Findcontacts(){
	var options = new ContactFindOptions();
	options.filter="Liu"; 
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, FindonSuccess, FindonError, options);
}

function Displaycontacts(contacts){
	var len = contacts.length;
	var output = "";

	for (var i=0; i<contacts.length; i++){
		
		contacts[i].name.givenName="Haotian";
		contacts[i].name.familyName="Liu";

		var givenName 	= contacts[i].name.givenName;
		var familyName 	= contacts[i].name.familyName;
		var contactId 	= contacts[i].id;
			
		output += "<li data-icon='plus'>"
					 + "<a onclick='Savecontacts(\""+contactId+"\",\""+givenName+"\",\""+familyName+"\");'"
					 + " rel='external' data-icon='plus'>"
					 + givenName + " " + familyName
					 + "</a></li>";
	}
	
	document.getElementById('secretlist').innerHTML=output;
	$("#secretlist").listview("refresh");
}

function Savecontacts(contactId,givenName,familyName){
	var r=confirm("Move it to your PHONE CONTACTS!");
	if (r==true){
		alert("You pressed OK!"+contactId+givenName+familyName);
	}
	else
	{
		alert("You pressed Cancel!");
	}
}
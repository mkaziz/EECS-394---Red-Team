//this function allows the user to set a password
function setpassword(pass)  
{  
	if (pass == "" || pass == null) {
		alert('Please enter a value for the password.');
		return;
	}
	else if(pass == "0/0") {
		alert('Your password cannot be the reset value.');
		return;
	}
	else {
		localStorage.setItem("mypassword", pass);  
		localStorage["mypassword"] = pass;  
		alert('Your password has been set to ' + localStorage.getItem("mypassword"));
		window.location.href = "index.html"; 
		} 
} 
    

//matches calculator entry with expected password
function rightpassword() { 
	clearpassword();
	//check if a password exists
	if (nopassword()) {
		if (document.calculator.ans.value == localStorage.getItem("mypassword"))
			window.location.href = "home.html";
	}
	else
		window.location.href = "passwordsetter.html"; //if a password doesn't exists, set one
}

//checks if the user has set a password yet
function nopassword() {
	if(localStorage.getItem("mypassword") == "NULL") {
		return 0;	
	}
	return 1;

}

//clears the current password when you type 0/0
function clearpassword() {
	if (document.calculator.ans.value == "0/0") {
		localStorage.clear(); 
		window.location.href = "passwordsetter.html"; 
		}
}
    function setpassword(pass)  
    {  
    //allows the user to set a password
    if(pass=="") {
    	alert('Please enter a value for the password.');
    	return;
    }
    else {
        localStorage.setItem("mypassword", pass);  
    	localStorage["mypassword"] = pass;  
    	alert('Your password has been set to ' + localStorage.getItem("mypassword"));
    	window.location.href = "index.html"; 
    	} 
    } 
    
    
function rightpassword() {
//matches calculator entry with expected password 
	clearpassword();
	if (nopassword()) { //check if a password exists
		if (document.calculator.ans.value == localStorage.getItem("mypassword"))
			window.location.href = "home.html";
	}
	else
		window.location.href = "passwordsetter.html"; //if a password doesn't exists, set one
}

function nopassword() {
//checks if the user has set a password yet
	if(localStorage.getItem("mypassword")=="NULL") {
		return 0;	
	}
	return 1;

}

function clearpassword() {
	if (document.calculator.ans.value == "0/0") {
		localStorage.clear(); 
		window.location.href = "passwordsetter.html"; 
		}
}
    function setpassword()  
    {  
    //allows the user to set a password
        localStorage.setItem("mypassword", "123");  
    	localStorage["mypassword"] = "123";  
    	alert('Your password has been set to' + localStorage.getItem("mypassword"));  
    } 


function rightpassword() {
//matches calculator entry with expected password 
	
	if (nopassword()) { //check if a password exists
		if (document.calculator.ans.value == localStorage.getItem("mypassword"))
			window.location.href = "home.html";
	}
	else
		setpassword(); //if a password doesn't exists, set one
}

function nopassword() {
//checks if the user has set a password yet
	if(localStorage.getItem("mypassword")=="NULL") {
		return 0;	
	}
	return 1;

}
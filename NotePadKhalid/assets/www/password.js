 function rightpassword() {
	//matches calculator entry with expected password

password appState = ((password)getApplicationContext());
String checky = appState.getpassword();

alert ('Can you see %s', checky);

		if (document.calculator.ans.value == "1")
			window.location.href = "home.html";
}
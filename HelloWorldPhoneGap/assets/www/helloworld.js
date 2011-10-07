// Khalid's functions

function calculator(oper, num1, num2) {

var result;

if (oper == 'add') {
	result = num1 + num2;
}
else if (oper == 'sub') {
	result = num1 - num2;
}
else if (oper == 'mult') {
	result = num1 * num2;
}
else if (oper == 'div') {

	if (num2 == 0)
		return "num2 cannot be 0 in a div operation"
	
	result = num1 / num2;
}
else if (oper == "mod") {
}
else {
}

return result;

}

// Cassie's functions

// Dhruv's functions

function returnText(text)
{
	return ("The parameter passed to this function says " + text + ".");
}

function calculator2(oper, num1, num2)
{

var result;

if (oper == 'add')
	result = (1/num1) + (1/num2);
else if (oper == 'mult')
	result = (1/num1) * (1/num2);
else if (oper == 'sumsq')
	result = (num1*num1) + (num2*num2);
else if (oper == 'div')
{
if (num1 == 0 || num2 == 0)
	return "Can't do this, can't have 0 in the denominator!"
else
	result = (1/num1) / (1/num2);
}

return result;

}

// Haotian's functions

// PY's functions

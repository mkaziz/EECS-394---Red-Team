describe("Hello World Universe", function() {
	it("Bonjour", function() {
		expect(helloWorld()).toEqual("Hello World!");
	});

});
/*
describe("Hello world Universe", function() {
	it("Bonjour", function() {
		expect(helloworldUni(1)).toEqual("Bonjour!");
	});
	it("NiHao", function() {
		expect(helloworldUni(2)).toEqual("NiHao!");
	});	
	it("Wrong Option", function() {
		expect(helloworldUni(-1)).toEqual("wrong option");
	});
});


describe("Calculator", function() {
	it("regular multiplication", function() {
		expect(calculator('mult',1,2)).toEqual(2);
	});
	it("multiplication by zero", function() {
		expect(calculator('mult',0,10)).toEqual(0);
	});
	it("multiplication of decimals", function() {
		expect(calculator('mult',11.1,3)).toEqual(33.3);
	});
	it("divide by factor", function() {
		expect(calculator('div',33,3)).toEqual(11);
	});	
	it("divide by zero", function() {
		expect(calculator('div',10,0)).toEqual("num2 cannot be 0 in a div operation");
	});
	it("division of negative factor", function() {
		expect(calculator('div',-99,99)).toEqual(-1);
	});
	it("division by non-factor", function() {
		expect(parseFloat(calculator('div',22,7).toFixed(2))).toEqual(3.14);
	});
	it("regular addition", function() {
		expect(calculator('add',10,7)).toEqual(17);
	});
	it("addition of negative", function() {
		expect(calculator('add',-11,4)).toEqual(-7);
	});
	it("addition of zero", function() {
		expect(calculator('add',0,-2)).toEqual(-2);
	});
	it("regular subtraction", function() {
		expect(calculator('sub',10,7)).toEqual(3);
	});
	it("subtraction of one negative", function() {
		expect(calculator('sub',22,-7)).toEqual(29);
	});
	it("subtraction of two negatives", function() {
		expect(calculator('sub',-22,-7)).toEqual(-15);
	});
	it("subtraction of zero", function() {
		expect(calculator('sub',0,7)).toEqual(-7);
	});

});

describe("returnText", function()
{
	it("testing", function() {
		expect(returnText("Chicago")).toEqual("The parameter passed to this function says Chicago.");
	});
});

describe("calculator2", function()
{
	it("(1/3)/(1/0)=0", function() {
		expect(calculator2('div', 0, 0)).toEqual("Can't do this, can't have 0 in the denominator!");
	});
	it("(2*2)+(3*3)=13", function() {
		expect(calculator2('sumsq', 2, 3)).toEqual(13);
	});
	it("(1/2)*(1/4)=(1/8)", function() {
		expect(calculator2('mult', 2, 4)).toEqual(1/8);
	});
});

describe ("AddingIsFun", function() {

	it("1+2=3",function() {
		expect(calculator('add',1,2)).toEqual(3);
	});
	it("1+3=4",function() {
		expect(calculator('add',1,3)).toEqual(4);
	});
	it("1+4=5",function() {
		expect(calculator('add',1,4)).toEqual(5);
	});
	

});

describe("Factorial", function() {
	it("factorial of 5", function() {
		expect(factorial(5)).toEqual(120);
	});
});
*/

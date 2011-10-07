describe("Hello world", function() {
	it("says hello", function() {
		expect(helloWorld()).toEqual("Hello world!");
	});
});

describe("Calculator", function() {
	it("1x2=10", function() {
		expect(calculator('mult',1,2)).toEqual(2);
	});
	it("0x10=10", function() {
		expect(calculator('mult',0,10)).toEqual(0);
	});
	it("10/0=undef", function() {
		expect(calculator('div',10,0)).toEqual("num2 cannot be 0 in a div operation");
	});
});

describe("returnText", function()
{
	it("testing", function() {
		expect(returnText("Chicago")).toEqual("The parameter passed to this function says Chicago.");
	});
});

describe("Calculator2", function()
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

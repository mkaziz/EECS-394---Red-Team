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

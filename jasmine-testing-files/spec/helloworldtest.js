describe("Hello world French", function() {
	it("says Bonjour!", function() {
		expect(helloWorldFrench()).toEqual("Bonjour!");
	});
});

describe("Hello world Chinese", function() {
	it("says NiHao!", function() {
		expect(helloWorldChinese()).toEqual("NiHao!");
	});
});

describe("Hello world Japanese", function() {
	it("says Konnichiwa!", function() {
		expect(helloWorldJapanese()).toEqual("Konnichiwa!");
	});
});

describe("Hello world German", function() {
	it("says Hallo!", function() {
		expect(helloWorldGerman()).toEqual("Hallo!");
	});
});


describe("Hello world Finnish", function() {
	it("says Hei!", function() {
		expect(helloWorldFinnish()).toEqual("Hei!");
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



HelloWorldTest = TestCase("HelloWorld");

HelloWorldTest.prototype.setUp = function() {
}
HelloWorldTest.prototype.test = function() {
	assertEquals("Hello World!", helloWorld());
}


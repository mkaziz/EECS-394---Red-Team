
var deleteCalls = function() {};

/**
  * @param number The number we want deleted
  * @param successCallback The callback which will be called when directory listing is successful
  * @param failureCallback The callback which will be called when directory listing encouters an error
	*/
deleteCalls.prototype.del = function(number, successCallback, failureCallback) {

 return   PhoneGap.exec(successCallback,    	//Success callback from the plugin
						failureCallback,     	//Error callback from the plugin
						'deleteCalls',			//Tell PhoneGap to run "DirectoryListingPlugin" Plugin
						'deleteNumber',         //Tell plugin, which action we want to perform
						[number]);       		//Passing list of args to the plugin
};
 
PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin("deleteCalls", new deleteCalls());
});

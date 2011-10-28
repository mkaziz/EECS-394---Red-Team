    
    var CallLog = function() {};
    CallLog.prototype.all = function(params, successCallback, failureCallback) 
    {
        return PhoneGap.exec(successCallback, failureCallback, 'CallLog', 'all', [params]);
    };

    PhoneGap.addConstructor( function() {
          PhoneGap.addPlugin("calllog", new CallLog());
          PluginManager.addService("CallLog","com.fusioncharts.phonegap.plugin.CallLog");
    });


	var CallLog = function() {};
CallLog.prototype.all = function(params, successCallback, failureCallback) 
{
    /* @param   successCallback
     * @param   failureCallback
     * @param   plugin name
     * @param   action
     * @param   JSONArray of parameters
     */ 
    return PhoneGap.exec(successCallback, failureCallback, 'CallLog', 'all', [params]);
};

PhoneGap.addConstructor( function() {
      //Register the javascript plugin with PhoneGap
      PhoneGap.addPlugin("calllog", new CallLog());

      //Register the native class of plugin with PhoneGap
      PluginManager.addService("CallLog","com.fusioncharts.phonegap.plugin.CallLog");
});
	
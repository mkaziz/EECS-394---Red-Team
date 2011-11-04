/**
 * 
 */
package edu.northwestern.contactsplugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.widget.Toast;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import com.phonegap.api.PluginResult.Status;
//-+import com.phonegap.api.PluginResult.Status;
/**
 * @author khalid
 *
 */
public class ContactsDeletePlugin extends Plugin {
	
	public static String ACTION = "deleteNumber";

	/* (non-Javadoc)
	 * @see com.phonegap.api.Plugin#execute(java.lang.String, org.json.JSONArray, java.lang.String)
	 */
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		PluginResult result = null;
		if (ACTION.equals(action)) {
			try {
				JSONObject resultJson= new JSONObject();
				String numToDel = data.getString(0);
				
				String callsDel = deleteCalls(numToDel);
				
				if (callsDel != null) {
					resultJson.put("callsDel",callsDel);
					result = new PluginResult(Status.OK, resultJson);
				}
				else
					result = new PluginResult(Status.ERROR);
				
				
			} catch (JSONException jsonEx) {
				result = new PluginResult(Status.JSON_EXCEPTION);
			}
		}
		else {
			result = new PluginResult(Status.INVALID_ACTION);
		}
		return result;
	}
	
	public String deleteCalls(String numberToDel) {

		   try{
			   numberToDel = numberToDel.replaceAll( "[^\\d]", "" );

			   Integer numDel = ctx.getContentResolver().delete(android.provider.CallLog.Calls.CONTENT_URI, 
		    		   	"number='"+numberToDel+"'", null);
			   return numDel.toString();
		   }catch(Exception ex){
			   return null;
			   //Toast.makeText(getApplicationContext(), "Error: " + ex.getMessage(),Toast.LENGTH_SHORT).show(); 
		   }
	}

}

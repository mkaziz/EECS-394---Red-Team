package com.redteam.notepad;

import com.phonegap.DroidGap;
import android.os.Bundle;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.SystemClock;


public class NotePadActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        //Code to call alarm manager
        Intent callplugin;
        PendingIntent callerase; //declare a pending intent
        callerase = PendingIntent.getActivity(NotePadActivity.this, 0, new Intent(Intent.ACTION_DIAL), PendingIntent.FLAG_UPDATE_CURRENT );
        AlarmManager erase = (AlarmManager)getSystemService(ALARM_SERVICE); //create new alarm
        erase.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP,
                        AlarmManager.ELAPSED_REALTIME, AlarmManager.INTERVAL_FIFTEEN_MINUTES, callerase); //it goes off every 15min. calling the pending intent. 

    }
    
    
    @Override
    public void onBackPressed() {
         //do nothing
    	return;
    	}

}

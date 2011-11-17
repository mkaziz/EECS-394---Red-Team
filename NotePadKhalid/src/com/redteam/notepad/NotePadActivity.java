package com.redteam.notepad;

import com.phonegap.DroidGap;
import android.os.Bundle;

public class NotePadActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
<<<<<<< HEAD
=======
        super.loadUrl("file:///android_asset/www/modcontacts.html");
>>>>>>> ac2d5f913369fd41bed9d8523506eb1256fe0873
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
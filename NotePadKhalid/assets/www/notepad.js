
    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function saveNote(tx) {
        try {
	        tx.executeSql('DROP TABLE IF EXISTS notes');
	        tx.executeSql('CREATE TABLE IF NOT EXISTS notes (note_id integer primary key, name varchar(200) unique, data text, save_time date default CURRENT_TIMESTAMP)');
	        tx.executeSql('INSERT INTO notes (name, data) VALUES ("First Note","test text for note")');
        	tx.executeSql('SELECT * FROM notes', [], querySuccess, errorCB);
	     } catch (e) {
	     	alert(e.message());
	     }
    }

    function querySuccess(tx, results) {
        
        var len = results.rows.length;

        for (var i=0; i<len; i++){
            alert("Row = " + i + " ID = " + results.rows.item(i).note_id + " Name =  " + results.rows.item(i).name + " time = " + results.rows.item(i).save_time);
        }
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code+" msg: "+err.message);
    }
    
    function successCB() {
        alert("Note successfully saved");
    }

    function onDeviceReady() {
        //var db = window.openDatabase("notes", "1.0", "Notes Demo", 2000000);
        //db.transaction(saveNote, errorCB, successCB);
    }
    
    function onSave() {
        var db = window.openDatabase("notes", "1.0", "Notes Demo", 2000000);
        db.transaction(saveNote, errorCB, successCB);
    }

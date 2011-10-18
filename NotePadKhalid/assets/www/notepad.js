
    // Wait for PhoneGap to load
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    function checkDb(tx) {
		var noteName = $("#name").val();
		
		if (noteName == "") {
			alert("You must enter a name for your note!");
			throw new exception();
		}
		
        try {
	        //tx.executeSql('DROP TABLE IF EXISTS notes');
	        tx.executeSql('CREATE TABLE IF NOT EXISTS notes (note_id integer primary key, name varchar(200) unique, data text, save_time date default CURRENT_TIMESTAMP)');
	        tx.executeSql('SELECT COUNT(*) AS count FROM notes WHERE name = "'+ noteName +'"', [], saveNote, errorCB);
	     } catch (e) {
	     	alert(e.message());
	     }
    }
    
    function saveNote(tx, results) {
		
		var numberOfRecords = results.rows.item(0).count;		
		var noteName = $("#name").val();
		var noteData = $("#data").val();
		
		if (numberOfRecords == 0)
			tx.executeSql('INSERT INTO notes (name, data) VALUES ("'+noteName+'","'+noteData+'")');
		else if (numberOfRecords == 1)
			tx.executeSql('UPDATE notes SET data = "'+ noteData +'", save_time = DateTime("now") WHERE name = "'+ noteName +'"');
		else
			alert("DB Error: More than one Note exists with this name.");
		
		tx.executeSql('SELECT * FROM notes', [], querySuccess, errorCB);
		alert("Note saved");
    }

    function querySuccess(tx, results) { 
        var len = results.rows.length;

        for (var i=0; i<len; i++){
            alert("Row = " + i + " ID = " + results.rows.item(i).note_id + " Name =  " + results.rows.item(i).name + " Data =  " + results.rows.item(i).data + " time = " + results.rows.item(i).save_time);
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
        //db.transaction(checkDb, errorCB, successCB);
        db.transaction(checkDb);
    }

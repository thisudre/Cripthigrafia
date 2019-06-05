var db

window.onload = function()
{
    // abrir ou criar DB
    var request = window.indexedDB.open('keys', 1)

    request.onerror = function() {
        console.log('Database failed to open');
      };
      
      // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function() {
        console.log('Database opened successfully');

        // Store the opened database object in the db variable. This is used a lot below
        db = request.result;
    }
}
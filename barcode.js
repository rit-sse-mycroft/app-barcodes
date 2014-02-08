var mycroft = require('mycroft');
var client = mycroft.Mycroft('barcode', './app.json', 'localhost', 1847);

// Handler for APP_DEPENDENCY
client.on('APP_DEPENDENCY', function(data){
  client.up();
  promptMessage();
});

client.connect();
client.sendManifest();

//Prompts for a barcode
function promptMessage() {
  prompt.start();
  prompt.get(['barcode'], function(err, result) {
    if (!err) {
      var message = {
        spoken_text: result.barcode
      };
      // Broadcast the input.
      client.broadcast({barcode: result.barcode});
      promptMessage();
    }
  });
}


var mycroft = require('mycroft');
var client = mycroft.Mycroft('barcode', './app.json', 'localhost', 1847);
var verified = false;

client.on('APP_DEPENDENCY', function(data){
  promptMessage();
});

client.connect();
client.sendManifest();

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


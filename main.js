const client = require('discord-rich-presence')('427180394811752449');
const itunes = require('./lib/itunes');
const {ipcMain} = require('electron');
const menubar = require('menubar');
var track = "";
var interval = 0;

var mb = menubar();
mb.setOption('width', 300);

mb.on('ready', function ready () {
  console.log('app ready');
});

ipcMain.on('start', (event, arg) => {
  console.log('starting');
  sender = event.sender;

  start(sender);

});

ipcMain.on('stop', (event, arg) => {
  console.log('stopping');
  sender = event.sender;

  clearInterval(interval);

});

function start(sender) {
  interval = setInterval(function() {
    sender.send('update', updateTrack());

  }, 1000);

}

function updateTrack() {


  itunes.getCurrentTrack(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      track = res;
      playerPosition = 0;

      client.updatePresence({
        state: track.artist,
        details: track.name,
        // startTimestamp: Date.now(),
        // endTimestamp: Date.now() + (secondsLeft * 1000),
        largeImageKey: 'itunes_large',
        smallImageKey: 'itunes_small',
        instance: true,
      });


    }
  });
  console.log(track);
  return track;


}

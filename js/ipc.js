const {ipcRenderer} = require('electron');

startMonitor();

function startMonitor() {
  ipcRenderer.send('start', true);
  var button = document.getElementById("mainBtn");
  button.classList.remove("btn-primary");
  button.classList.add("btn-secondary");
  button.innerHTML = "Stop"
  button.onclick = stopMonitor;

}

function stopMonitor() {
  ipcRenderer.send('stop', true);
  var button = document.getElementById("mainBtn");
  button.classList.add("btn-primary");
  button.classList.remove("btn-secondary");
  button.innerHTML = "Start"
  button.onclick = startMonitor;
  document.getElementById('track_artist').innerHTML = 'Artist';
  document.getElementById('track_name').innerHTML = 'Track';

}

ipcRenderer.on('update', (event, track) => {
  document.getElementById('track_artist').innerHTML = track.artist;
  document.getElementById('track_name').innerHTML = track.name;
});

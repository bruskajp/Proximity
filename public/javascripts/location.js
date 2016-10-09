var reciever = {
  lat: null,
  long: null,
  convertedLat: null,
  convertedLong: null
};

function getLocation() {
  if (navigator.geolocation) {
    var params = {timeout: 30000};
    navigator.geolocation.getCurrentPosition(recieveLocation, locationError, params);
  } else {
    alert('Geolocation not available.');
  }
}

function recieveLocation(position) {
  reciever.lat = position.coords.latitude;
  reciever.long = position.coords.longitude;
  reciever.convertedLat = Math.floor(reciever.lat*10);
  reciever.convertedLong = Math.floor(reciever.long*10);
}

function locationError(err) {
  if(err.code == 1) {
    alert("Error: Access is denied!");
  } else if( err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}

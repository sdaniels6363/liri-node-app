// Load Requirements
var axios = require("axios");
var moment = require("moment");
var dotenv = require("dotenv").config();

// Load API Keys
var keys = require("./keys.js");

// load into variables for readability.
var spotifyId = keys.spotify.id;
var spotifySecret = keys.spotify.secret;
var omdbKey = keys.omdb.key;
var bandsId = keys.bandInTown.appId;


function specialCharsBandsInTown(artist) {
  // checks for special characters in the artist name
  if (artist.includes("/")) {
    artist = artist.split("/"); // split on symbol
    artist = artist.join("%252F"); // rejoin on the required text via API
  }
  if (artist.includes("?")) {
    artist = artist.split("?");// split on symbol
    artist = artist.join("%253F");// rejoin on the required text via API
  }
  if (artist.includes("*")) {
    artist = artist.split("*");// split on symbol
    artist = artist.join("%252A");// rejoin on the required text via API
  }
  if (artist.includes('"')) {
    artist = artist.split('"');// split on symbol
    artist = artist.join("%27C");// rejoin on the required text via API
  }
  if (artist.includes(" ")) {
    artist = artist.split(" ");
    artist = artist.join("%20");
  }
  return artist;
}

function bandsInTownEvents(artist) {

  axios.get(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${bandsId}`).then(function (response) {

    var events = response.data // load to variable for readability

    console.log(`Upcoming events for ${artist}\n("-------------------------------------------")n`)

    for (i = 0; i < events.length; i++) {
      var event = events[i];

      var country = event.venue.country;
      var city = event.venue.city;
      var name = event.venue.name;
      var region = event.venue.region;
      var eventDate = moment(event.datetime).format("MM/DD/YYYY")

      if (region) {
        var venue = `Event No: ${i+1}\nVenue Name: ${name}\nVenue Location: ${city}, ${region}, ${country}\nEvent Date: ${eventDate}`
      } else { // depending on location region isn't populated.
        var venue = `Event No: ${i+1}\nVenue Name: ${name}\nVenue Location: ${city}, ${country}\nEvent Date: ${eventDate}`
      }
      console.log(venue);
      console.log("-------------------------------------------")
    }

  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  })
}

function spotifySong(song){
  axios.get("")
}


var command = process.argv[2]; // this will either be concert-this, spotify-this-song, movie-this, or do-what-it-says

switch (command) {
  case "concert-this":
    artistName = specialCharsBandsInTown(process.argv.slice(3));
    bandsInTownEvents(artistName);
    break;
  case "spotify-this-song":
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;

}
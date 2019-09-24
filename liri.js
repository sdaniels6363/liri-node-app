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
  var artistName = specialCharsBandsInTown(artist);

  axios.get(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=${bandsId}`).then(function (response) {

    var events = response.data // load to variable for readability

    console.log(`\nUpcoming events for ${artist}\n-------------------------------------------`)

    for (i = 0; i < events.length; i++) {
      var event = events[i];

      var country = event.venue.country;
      var city = event.venue.city;
      var name = event.venue.name;
      var region = event.venue.region;
      var eventDate = moment(event.datetime).format("MM/DD/YYYY")

      // check if value is undefined
      var venue = `Event Number: ${i+1}\nVenue Name: ${name}\nVenue Location: `
      
      if (city){
        venue = venue + `${city}, `
      }
      if (region){
        venue = venue + `${region}, `
      }
      if (country){
        venue = venue + `${country}\n`
      }

      var venue = venue + `Event Date: ${eventDate}`

    
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
var userInput = process.argv.slice(3).join(" ");
switch (command) {
  case "concert-this":
    bandsInTownEvents(userInput);
    break;
  case "spotify-this-song":
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;

}
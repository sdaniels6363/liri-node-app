// Load Requirements
var axios = require("axios");
var moment = require("moment");
var dotenv = require("dotenv").config();

// Load API Keys
var omdbAPI = process.env.OMDB_KEY;
var bandsInTownAPI = process.env.BANDS_KEY;
var spotifyId = process.env.SPOTIFY_ID;
var spotifyKey = process.env.SPOTIFY_KEY;


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


function bandsInTownArtist(artist) {

  var artistName = specialCharsBandsInTown(artist);

  axios.get(`https://rest.bandsintown.com/artists/${artistName}`).then(function (response) {
    console.log(response.data);
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

function bandsInTownEvents(artist) {
  var artistName = specialCharsBandsInTown(artist);

  axios.get(`https://rest.bandsintown.com/artists/${artistName}/events`).then(function (response) {
    console.log(response.data);
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
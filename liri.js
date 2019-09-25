// Load Requirements
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');

// Load API Keys
require('dotenv').config();
var keys = require("./keys.js");

// load into variables for readability.
var omdbKey = keys.omdb.key;
var bandsId = keys.bandInTown.appId;

// Load Spotify keys
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

function specialCharsBandsInTown(artist) {
  // checks for special characters in the artist name
  if (artist.includes("/")) {
    artist = artist.split("/").join("%252F"); // split on symbol & rejoin using the required text via API
  }
  if (artist.includes("?")) {
    artist = artist.split("?").join("%253F");// split on symbol & rejoin using the required text via API
  }
  if (artist.includes("*")) {
    artist = artist.split("*").join("%252A");// split on symbol & rejoin using the required text via API
  }
  if (artist.includes('"')) {
    artist = artist.split('"').join("%27C");// split on symbol & rejoin using the required text via API
  }
  if (artist.includes(" ")) {
    artist = artist.split(" ").join("%20"); // split on space & rejoin using the required text via API
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
      var venue = `Event Number: ${i + 1}\nVenue Name: ${name}\nVenue Location: `

      if (city) {
        venue = venue + `${city}, `
      }
      if (region) {
        venue = venue + `${region}, `
      }
      if (country) {
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

function spotifySong(song) {

  if (!song) { // if no song is defined, default to "The Sign" by Ace of Base.
    spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE').then(function (data) {
    console.log(`
Artist: ${data.artists[0].name}
Song Name: ${data.name}
Album: ${data.album.name}
Preview URL: ${data.preview_url}       
    `)
  });

  } else { // if song is defined, find that song.
    spotify.search({
      type: 'track',
      query: song
    }, function (err, data) {
      if (err) {
        return console.log(`Error occured: ${err}`);
      }

      var songs = data.tracks.items;

      for (i = 0; i < songs.length; i++) {
        var song = songs[i];

        console.log(`
Artist: ${song.artists[0].name}
Song Name: ${song.name}
Album: ${song.album.name}
Preview URL: ${song.preview_url}
              `)
      }
    });
  };
}


function movieThis(movie) {
  if (!movie){ // if no movie is defined, pull Mr. Nobody
    movie = "Mr. Nobody"
  }

  var url = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movie}`

  axios.get(url).then(function(response){
    
    var data = response.data;

    console.log(`
Title: ${data.Title}
Release Year: ${data.Year}
IMDB Rating: ${data.Ratings[0].Value}
Rotten Tomatoes Rating: ${data.Ratings[1].Value}
Country/Countries Produced in: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}
    `)
  })
}

function doWhatItSays(whatItSays) {
  fs.readFile(whatItSays, 'utf8', function(err, contents){
    
    contents = contents.split('\n') // first split on new line

    for (i = 0; i < contents.length;i++){
      line = contents[i].split(",");
      command = line[0];
      query = line[1];
      switch (command) {
        case "concert-this":
          bandsInTownEvents(query);
          break;
        case "spotify-this-song":
          spotifySong(query);
          break;
        case "movie-this":
          movieThis(query);
          break;
    }

  }
});
}

// script execution below


var command = process.argv[2]; // this will either be concert-this, spotify-this-song, movie-this, or do-what-it-says
var userInput = process.argv.slice(3).join(" ");
switch (command) {
  case "concert-this":
    bandsInTownEvents(userInput);
    break;
  case "spotify-this-song":
    spotifySong(userInput);
    break;
  case "movie-this":
    movieThis(userInput);
    break;
  case "do-what-it-says":
    doWhatItSays(userInput);
    break;

}
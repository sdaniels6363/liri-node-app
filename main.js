// Load Requirements
var axios = require("axios");
var moment = require("moment");
var dotenv = require("dotenv").config();

// Load API Keys
var omdbAPI = process.env.OMDB_KEY;
var bandsInTownAPI = process.env.BANDS_KEY;
var spotifyId = process.env.SPOTIFY_ID;
var spotifyKey = process.env.SPOTIFY_KEY;



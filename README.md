# liri-node-app
### Language Interpretation and Recognition Interface - Boot Camp Assignment 8 - Node.js

Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
Give a high-level overview of how the app is organized
Give start-to-finish instructions on how to run the app
Include screenshots, gifs or videos of the app functioning
Contain a link to a deployed version of the app
Clearly list the technologies used in the app
State your role in the app development


The purpose of the LIRI bot is to search for songs via Spotifiy, upcoming concerts via Bands in Town, or movie details from the Open Movie Data Base (OMDB).   

The app makes use of the node.js package axios, in order to make API calls to the APIs for Spotify, Bands in Town, and OMDB.  My version of this program will use three functions, one for each API call.  Then an additional function making use of a switch statement, that will determine which API call to use, based on the selector chosen by the user.

#### Instructions

###### Prerequisites

In order to use this application you'll need to have the following dependencies installed:
* git - [Link](https://git-scm.com/)
* node - [Link](https://nodejs.org/en/)

You'll also need to get your own API keys for the following:
* Spotify
* Bands in Town
* OMDB

###### Installation

Once the above dependencies are installed.

To use this application, you'll need to first clone the repo.

```git clone https://github.com/sdaniels6363/liri-node-app.git```


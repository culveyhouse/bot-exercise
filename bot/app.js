/**
This app.js is the bot controller that I originally used as part of the
MS Bot Builder Tutorial
**/

var restify = require('restify');
var builder = require('botbuilder');
var firebase = require("firebase");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDwI6O-ms0X-cKmNQyoZd4YQ7UfUKyP1Dc",
	authDomain: "whozoo-exercise.firebaseapp.com",
	databaseURL: "https://whozoo-exercise.firebaseio.com",
	projectId: "whozoo-exercise",
	storageBucket: "whozoo-exercise.appspot.com",
	messagingSenderId: "1040893303436"
};
firebase.initializeApp(config);


// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
	session.send("You said: %s", session.message.text);
});



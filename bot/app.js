/**
  * This app.js is the bot controller for my whozoo-exercise.
  * It functions as a server with console feedback, but also:
  *
  * 1. Listens for chat messages in the MS Bot Emulator
  * 2.
  */

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
var firebase_config = {
	apiKey: "AIzaSyDwI6O-ms0X-cKmNQyoZd4YQ7UfUKyP1Dc",
	authDomain: "whozoo-exercise.firebaseapp.com",
	databaseURL: "https://whozoo-exercise.firebaseio.com",
	projectId: "whozoo-exercise",
	storageBucket: "whozoo-exercise.appspot.com",
	messagingSenderId: "1040893303436"
};
firebase.initializeApp(firebase_config);

var database = firebase.database();

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and log useful data into the Bot emulator console
var bot = new builder.UniversalBot(connector, function (session) {
	writeMessage(
		session.message.address.id,
		session.message.user,
		session.message.text,
		session.message.timestamp,
		session.message.sourceEvent.clientActivityId
	);
	// session.send("You said: " + session.message.text); DLC ZZZ REMOVE
});

// Write chat messages to Firebase along with message id, from, timestamp,
// and an additional clientActivityId for additional sorting capability
function writeMessage(messageId, from, text, time, clientActivityId) {
	firebase.database().ref('message/' + messageId).set({
		from: from,
		messageDetail: text,
		timestamp : time,
		clientActivityId : clientActivityId,
	});
}


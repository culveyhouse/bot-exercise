/**
  * This app.js is the bot controller for my whozoo-exercise.
  * It functions as a server with console feedback, but also:
  *
  * 1. Listens for chat messages in the MS Bot Emulator
  * 2. Writes a user message to a Firebase /message tree
  * 3. Listens in /message_response for a response by Firebase to the user message
  */

var restify = require('restify');
var builder = require('botbuilder');
var firebase = require('firebase');

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
// Prepare a Firebase reference in the data tree for listening function
var ref = database.ref('message_response/');

// Listen for messages from users
server.post('/api/messages', connector.listen());

// This is the primary function.  1. Listen for messages from the user, 2. Write to Firebase,
// and 3. Listen for a new message_response entry in firebase.
var bot = new builder.UniversalBot(connector, function (session) {
	writeMessage(
		session.message.address.id,
		session.message.user,
		session.message.text,
		session.message.timestamp,
		session.message.sourceEvent.clientActivityId
	);
	listenForResponse(session.message.address.id, session);
});

// writeMessage() writes chat messages to Firebase along with message id, from, timestamp,
// and an additional clientActivityId for additional sorting capability
function writeMessage(messageId, from, text, time, clientActivityId) {
	firebase.database().ref('message/' + messageId).set({
		from: from,
		messageDetail: text,
		timestamp : time,
		clientActivityId : clientActivityId,
	});
}

// listenForResponse() adds a listener to the Firebase message_response/ tree (set above),
// then waits for a child added with the specific key (messageId) created in the first
// write to /message tree
function listenForResponse(messageId, session) {
	ref.orderByKey().equalTo(messageId).on("child_added", function(snapshot) {
		console.log('Found message response: ' + snapshot.key + ': ' + snapshot.val().messageResponse)
		session.send(snapshot.val().messageResponse); // This outputs the Firebase message response to the chat window
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code);
	});
}

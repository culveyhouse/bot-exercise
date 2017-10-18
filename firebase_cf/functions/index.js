/** This is the controller/exporter for Firebase cloud functions
  * used in my whozoo-exercise. This file was run with the
  * "$ firebase deploy --only functions" command, but it will likely not
  * need to be run again, except for updates or debugging.
  *
  * Therefore, there is no need to install npm or node modules in this
  * directory, and the package.json and package_lock.json for this directory
  * may be ignored.
  */

const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// replyToChat listens for new messages added to /message/:pushId/ and
// creates a new response record in /message_response tree with the same id key.
// This is a separate data set since we may want to add more response parameters later.
exports.replyToChat = functions.database.ref('/message/{pushId}')
	.onCreate(event => {
	// Grab the snapshot (all data) of what was written to the Realtime Database.
	const snapshot = event.data;
	const messageDetail = "Firebase read and reported the message: " + snapshot.val().messageDetail;
	const messageId = event.params.pushId;
	message_response = {
		"messageResponse" : messageDetail
	}
	// Using set since it creates a promise and we need to write a new record
	return admin.database().ref('/message_response/' + messageId).set(message_response);
});

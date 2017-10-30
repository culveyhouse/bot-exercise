# Whozoo-Exercise

## Synopsis

This small repository contains the Node.js app and supporting files that I wrote for my whozoo-exercise project. The project uses several technologies to emulate a chat bot in a serverless stack. The tools I used for this exercise are listed below. 

This chat bot uses serverless solutions to listen for a user's chat message, then posts the message to a Firebase Realtime Database. A Firebase Cloud Function on the same account then listens for new records and posts simple "echo" responses in the database. Meanwhile, the local bot listens for these Firebase responses and pulls the appropriate response, and finally displays it to the user in the bot emulator. 

## Built With

* [Node.js](https://nodejs.org/en/docs/) - The primary runtime used
* [MS Bot Builder SDK for Node.js](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-overview#get-started) - The bot builder used to develop the simple bot in this exercise
* [Bot Framework Channel Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator) - A desktop application for rapid development and debugging of this bot
* [Firebase Realtime Database](https://firebase.google.com/docs/database/) and [Cloud Functions](https://firebase.google.com/docs/functions/) (hosted by Google) - The serverless NoSQL database used in this example
* [Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started) - The Node.js module which allows development and deployment of Firebase Cloud Functions

## Express Installation and Bot Initialization
If you wish to expedite the installation of all necessary npm modules in order to run this bot project, you may simply navigate into the /bot directory and run: 
```
npm install
node app.js
```
This installs all dependencies used in the development of this bot.  Note that there is also a /firebase_cf folder in this repo. This is included only for reference, and you will likely not need to interact with it nor install any of its separate Node.js dependencies. 

## Verbose Installation and Bot Initialization
To install each Node.js package individually to monitor or customize each step, follow these 8 items in order: 

### Clone or download Git repository
1. Create a folder named bot-exercise before cloning this repo, or simply clone/download this repo and let the repo create it: [bot-exercise](https://github.com/culveyhouse/bot-exercise)
2. The only folder that you will need to interact with is the bot folder. 

### Firebase SDK
3. Next, install Firebase SDK through the Node.js command:
```
npm install firebase --save
npm install -g firebase-tools
```
Note: You will most likely not need firebase-tools, but this is included just in case. 

### Node.js and Bot Builder SDK
4. Depending upon your OS, you must install Node.js per the instructions for your Windows, MacOS, and Unix/Linux: [Node.js Downloads](https://nodejs.org/en/download/) 
5. After installing Node.js, use these [MS Bot Builder instructions](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart#prerequisites) under "Prerequisites" to change your current directory to this project's /bot folder, then initialize the Node package manager (npm) in that /bot folder:  
6. Install Restify, as per the instructions in that same page:
```
npm install --save restify
```
7. Now install the Bot Builder SDK per the instructions on that same page. 
8. Finally, you should now be able to execute this command inside the /bot folder, which will start running the bot locally:
```
node app.js
```

## MS Bot Framework Channel Emulator
1. In order to interact with this bot, an emulator must be used, as the bot is hosted locally. Go to this download site to install the Emulator for your particular OS: [Bot Framework Channel Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
2. Once installed, open the emulator and connect it to this local endpoint: http://localhost:3978/api/messages
3. Once successfully connected, simply type in a message into the chat window. The bot takes your message, posts the message to a Firebase database, then a cloud function detects the new record and stores a simple "echo" type of reply. 
4. The bot will then listen for this Firebase reply, and print the result in the chat window. For example, if you typed "Well hello there.", the final response should be: "Firebase read and reported the message: Well hello there."

Note: The bot emulator was only tested on Windows 10. If you are running the bot emulator on MacOS or Linux, the bot emulator must be run locally on the same machine as the running bot project. If you would like to try running the bot emulator remotely from another machine, please contact Daniel Culveyhouse (below) to coordinate further troubleshooting, and we will add that documentation to this README.md file.

## Troubleshooting and Known Errors 

1. If while installing the npm modules in Windows 10, you receive the exception:
```
"Cannot find module './build/Release/DTraceProviderBindings'"
```
You can resolve this dependency by running: 
```
npm install dtrace-provider --save
```

## Authors

* **Daniel Culveyhouse** (dculvey@gmail.com)

## Acknowledgments

* Much of the code in this project was based on example code available for Google Firebase and MS Bot Builder SDK.
* Thanks to Robert Layzell for assembling the project specifications, and for putting these various technologies to use. 
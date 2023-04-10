import express from "express"
import os 	from 'os-utils';

import cron from "node-cron"
import bodyParser from "body-parser"
import * as dotenv from 'dotenv'
import { route } from "./src/routes/mail.route.js"
// import { imapMailListener, fetchNewMails } from "./src/common/utils/imap-mail-listener.js"
import ImapConnection from "./src/common/utils/imap-connection.util.js"
// import { simpleImapAsync } from "./src/common/utils/listener-connection.util.js"
// import { getMessageImapAsync } from "./src/common/utils/imap-connection.util.js"


dotenv.config()
const app = express();

// simpleImapAsync.stop(); // stop listening
// simpleImapAsync.start(); // start listening
// getMessageImapAsync.start(); // start listening

// listenToFirstEmail();
const firstGmail = new ImapConnection({
  host: process.env.GMAIL_HOST_SERVICE,
  username: process.env.FIRST_GMAIL_ADDRESS, 
  password: process.env.FIRST_GMAIL_APP_PASSWORD, 
  mailBox: "INBOX", 
  searchFilter: ['UNSEEN']
});
const secondGmail = new ImapConnection({
  host: process.env.GMAIL_HOST_SERVICE,
  username: process.env.SECOND_GMAIL_ADDRESS, 
  password: process.env.SECOND_GMAIL_APP_PASSWORD, 
  mailBox: "INBOX", 
  searchFilter: ['UNSEEN']
});


os.cpuUsage(function(v){
	console.log( 'CPU Usage (%): ' + v );
});

os.cpuFree(function(v){
	console.log( 'CPU Free:' + v );
});

app.use(bodyParser.json())
app.use(`/api/v${process.env.API_VERSION}`, route);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  console.log(`listening on "https://localhost:${process.env.PORT}/api/v${process.env.API_VERSION}/"`);
});

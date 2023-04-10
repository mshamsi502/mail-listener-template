// import SimpleImapAsync  from './my-imap-listener.util.js';
// // import {
// //   getMessages,
// // } from "../../controllers/gmail-api.controller.js"


// export const simpleImapAsync = new SimpleImapAsync({
//   username: process.env.GMAIL_ADDRESS, // Will be deprecated on May 30, 2022
//   password: process.env.GMAIL_APP_PASSWORD, // Will be deprecated on May 30, 2022
//   host:  process.env.GMAIL_HOST_SERVICE,
//   port: 993, // imap port
//   tls: true,
//   connTimeout: 100000000, // Default by node-imap
//   authTimeout: 50000000, // Default by node-imap,
//   debug: console.log, // Or your custom function with only one incoming argument. Default: null
//   tlsOptions: { rejectUnauthorized: false },
//   mailbox: "INBOX", // mailbox to monitor
//   searchFilter: ['UNSEEN', ['SINCE', new Date()]], // the search filter being used after an IDLE notification has been retrieved
//   // searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
//   // searchFilter: ["LABELED"], // the search filter being used after an IDLE notification has been retrieved
//   markSeen: true, // all fetched email will be marked as seen and not fetched next time
//   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
//   mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
//   attachments: false, // download attachments as they are encountered to the project directory
// });

// simpleImapAsync.start(); // start listening


// simpleImapAsync.on("server:connected", () => {
//   console.log("imapConnected");
// });

// simpleImapAsync.on("server:disconnected", () => {
//   console.log("imapDisconnected");
// });

// simpleImapAsync.on("error", err => {
//   console.log("err : " , err);
// });

// simpleImapAsync.on("message", message => {
  
//   console.log("message : ", message);
// });


// // stop listening
// simpleImapAsync.stop();
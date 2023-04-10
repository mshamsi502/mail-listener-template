import SimpleImapAsync  from './my-imap-listener.util.js';

export default class ImapConnection {
  constructor({
    host: host,
    username: username,
    password: password,
    mailBox: mailBox,
    searchFilter: searchFilter
  }) {
    const options = 
      {
        username: username,
        password: password,
        host:  host,
        port: 993, // imap port
        tls: true,
        connTimeout: 100000000, // Default by node-imap
        authTimeout: 50000000, // Default by node-imap,
        debug: console.log, // Or your custom function with only one incoming argument. Default: null
        tlsOptions: { rejectUnauthorized: false },
        mailbox: mailBox, // ["INBOX"]
        searchFilter: searchFilter, // ['ALL'],
        markSeen: true, // all fetched email will be marked as seen and not fetched next time
        fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
        mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
        attachments: false, // download attachments as they are encountered to the project directory
    }
    const simpleImap = new SimpleImapAsync(options);

    simpleImap.start(); // start listening
 

    }
  }
  

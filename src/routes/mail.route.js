import { Router } from "express"
import {
    getUser,
    getDrafts,
    readMail,
    getMessages,
} from "../services/gmail-provider/gmail-api.service.js"
import { loginEmail, sendMail } from "../controllers/mail-api.controller.js"
import { redirectLinkGoogleApp } from "../services/gmail-provider/gmail-auth.service.js"
import { redirectLinkHotmailApp } from "../services/hotmail-provider/hotmail-auth.service.js"
import { redirectLinkYahooApp } from "../services/yahoo-provider/yahoo-auth.service.js"

export const route = Router()

route.get( "/", async (req, res, next) => {
    res.send("Welcome to Gmail API with NodeJS");
    next;
  })
route.post('/mail/login', loginEmail)
route.post('/mail/google/redirectLink', redirectLinkGoogleApp)
route.post('/mail/hotmail/redirectLink', redirectLinkHotmailApp)
route.get('/mail/yahoo/redirectLink', redirectLinkYahooApp)
// route.get('/mail/login', loginEmail)
// route.post('/mail/google/redirectLink', redirectLinkGoogleApp)
route.get('/mail/user/:email', getUser)
route.post('/mail/send/second', sendMail);
route.post('/mail/messages', getMessages);
route.get('/mail/drafts/:email', getDrafts);
route.get('/mail/read/:messageId', readMail);


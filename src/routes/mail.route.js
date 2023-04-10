import { Router } from "express"
import {
    getUser,
    sendMail,
    getDrafts,
    readMail,
    getMessages,
} from "../controllers/second-gmail-api.controller.js"
import {
    firstSendMail,
} from "../controllers/first-gmail-api.controller.js"
import {
    loginEmail,
    redirectLinkGoogleApp,
} from "../controllers/mail-api.controller.js"

export const route = Router()

route.post( "/", async (req, res, next) => {
    console.log("body : ", req)
    res.send("Welcome to Gmail API with NodeJS");
    next;
  })
route.get('/mail/login', loginEmail)
route.post('/mail/google/redirectLink', redirectLinkGoogleApp)
route.get('/mail/user/:email', getUser)
route.post('/mail/send/second', sendMail);
route.post('/mail/send/first', firstSendMail);
route.post('/mail/messages', getMessages);
route.get('/mail/drafts/:email', getDrafts);
route.get('/mail/read/:messageId', readMail);


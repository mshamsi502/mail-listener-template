import { Router } from "express"
import {
    getUser,
    sendMail,
    getDrafts,
    readMail,
    getMessages,
} from "../services/gmail-provider/gmail-api.service.js"
import { loginEmail } from "../controllers/mail-api.controller.js"
import { redirectLinkGoogleApp } from "../services/gmail-provider/gmail-auth.service.js"

export const route = Router()

route.post( "/", async (req, res, next) => {
    console.log("body : ", req)
    res.send("Welcome to Gmail API with NodeJS");
    next;
  })
route.get('/mail/login/:provider', loginEmail)
route.post('/mail/google/redirectLink', redirectLinkGoogleApp)
// route.get('/mail/login', loginEmail)
// route.post('/mail/google/redirectLink', redirectLinkGoogleApp)
route.get('/mail/user/:email', getUser)
route.post('/mail/send/second', sendMail);
route.post('/mail/messages', getMessages);
route.get('/mail/drafts/:email', getDrafts);
route.get('/mail/read/:messageId', readMail);


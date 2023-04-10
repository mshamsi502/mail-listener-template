import { Router } from "express"
import {
    getUser,
    sendMail,
    getDrafts,
    readMail,
    getMessages,
} from "../controllers/gmail-api.controller.js"

export const route = Router()

route.post( "/", async (req, res, next) => {
    console.log("body : ", req)
    res.send("Welcome to Gmail API with NodeJS");
    next;
  })
route.get('/mail/user/:email', getUser)
route.post('/mail/send', sendMail);
route.post('/mail/messages', getMessages);
route.get('/mail/drafts/:email', getDrafts);
route.get('/mail/read/:messageId', readMail);


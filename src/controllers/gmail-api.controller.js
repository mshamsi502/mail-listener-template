import axios from "axios"
import nodemailer from "nodemailer"
import { google } from "googleapis"
import * as dotenv from 'dotenv'
import { generateConfig } from "../common/utils/generate-config.js"
import { gmailAuth } from "../common/const/gmail-api.const.js"

dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function sendMail(req, res, next) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          ...gmailAuth,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: `Siddhant <${process.env.GMAIL_ADDRESS}>`,
        to : req.body.to,
        subject : req.body.subject,
        text: req.body.text,
      };
      const result = await transport.sendMail(mailOptions);
      res.send(result);
      next;
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

export async function getUser(req, res) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

export async function getDrafts(req, res) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

export async function readMail(req, res) {
    try {
        //  for get messageId in Gmail website:
        //      open a message on chrome => F12 => Console => type:
        //          document.querySelector('[data-legacy-thread-id]').getAttribute('data-legacy-thread-id')     
      const url = `https://gmail.googleapis.com/gmail/v1/users/${process.env.GMAIL_ADDRESS}/messages/${req.params.messageId}`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
  
      let data = await response.data;
  
      res.json(data);
    } catch (error) {
      res.send(error);
    }
  }

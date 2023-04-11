import axios from "axios"
import nodemailer from "nodemailer"
import { google } from "googleapis"
import { generateConfig } from "../../common/utils/generate-config.util.js"

// 
// export const oAuth2Client = new google.auth.OAuth2(
//   process.env.GMAIL_CLIENT_ID,
//   process.env.GMAIL_CLIENT_SECRET,
//   process.env.GMAIL_REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
// const { token } = await oAuth2Client.getAccessToken();
// 

export async function sendMail(req, res, next) {
  const accessToken = req.body.accessToken;
  const fromAddress = req.body.from;
  const toAddress = req.body.to;
  const subjectAddress = req.body.subject;
  const textAddress = req.body.text;
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: fromAddress,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: `Siddhant <${fromAddress}>`,
        to : toAddress,
        subject : subjectAddress,
        text: textAddress,
      };
      console.log("mailOptions : ", mailOptions)

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
      const config = generateConfig(url, req.body.accessToken);
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
      const config = generateConfig(url, req.body.accessToken);
      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function getMessages(req, res) { // default inbox, limit 500
    try {
      let url = `https://gmail.googleapis.com/gmail/v1/users/${req.body.email}/messages`;
      if(req.body.limit) url = url + `?maxResults=${req.body.limit}`
     console.log("url : ", url)
     console.log("req.body.labelIds : ", req.body.labelIds)
      if(req.body.labelIds) 
        req.body.labelIds.map(_label=> url = url + `&labelIds=${_label}`)
      const config = generateConfig(url, req.body.accessToken);
      const codeResponse = await axios(config);
      const msgIds = [];
       codeResponse.data.messages.map(mess => msgIds.push(mess.id))

      const fullResponse = await getFromGoogleAPIMessage(
        req,
        msgIds,
        codeResponse.data.nextPageToken,
        codeResponse.data.resultSizeEstimate,
        req.body.format
        );
      // const fullResponse = await getFromIMAPMessage(
      //     msgIds,
      //     codeResponse.data.nextPageToken,
      //     codeResponse.data.resultSizeEstimate,
      //     );
      
      res.json(fullResponse);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

export async function readMail(req, res) {
    try {
      console.log("req.params.messageId : ", req.params.messageId)
        //  for get messageId in Gmail website:
        //      open a message on chrome => F12 => Console => type:
        //          document.querySelector('[data-legacy-thread-id]').getAttribute('data-legacy-thread-id')     
      const url = `https://gmail.googleapis.com/gmail/v1/users/${process.env.GMAIL_ADDRESS}/messages/${req.params.messageId}`;
      const config = generateConfig(url, req.body.accessToken);
      const response = await axios(config);
  
      let data = await response.data;
  
      res.json(data);
    } catch (error) {
      res.send(error);
    }
  }

  async function getFromGoogleAPIMessage(
    req,
    msgIds,
    nextPageToken,
    resultSizeEstimate,
    format,
    ) {
    const fullResponse = {
      messages : [],
      nextPageToken: nextPageToken,
      resultSizeEstimate: resultSizeEstimate,
    }
    try {
for(const id of msgIds){
      const newReq = req;
      newReq.params.messageId= id ;
      let fullUrl = `https://gmail.googleapis.com/gmail/v1/users/${process.env.GMAIL_ADDRESS}/messages/${req.params.messageId}`;
      if(format) fullUrl = fullUrl + `?format=${format}`
      const fullConfig = generateConfig(fullUrl, req.body.accessToken);
      const data = await axios(fullConfig);
       fullResponse.messages.push(data.data);
    }
    return fullResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
  }

//   async function getFromIMAPMessage(
//     msgIds,
//     nextPageToken,
//     resultSizeEstimate,
//     ) {
//     const fullResponse = {
//       messages : [],
//       nextPageToken: nextPageToken,
//       resultSizeEstimate: resultSizeEstimate,
//     }
//     try {

//       // const simpleImapMail = new SimpleImapMail()
//       console.log("msgIds : ", msgIds.length)
// for(const id of msgIds){

//   // const data = await getMessageImapAsync.getMessages(id)
//   const data = await simpleImapAsync.getMessages(id)
//   // 
//        fullResponse.messages.push(data.data);
//     }
//     return fullResponse;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
//   }
// import axios from "axios";
// import OAuth from "oauth";

import open from "open";
import { generateRandomString } from  "../../common/utils/generate-random-string.util.js";
import EmailNotifierConnection from "../../common/utils/mail-notifier-connection.util.js";
// import AuthenticationContext from 'adal-node' ;

export async function loginYahoo(req, res, next) {
  try {
    const url =
    `${process.env.YAHOO_REQUEST_AUTH_URL}`+
    `?client_id=${process.env.YAHOO_CLIENT_ID}`+
    `&response_type=code`+
    `&redirect_uri=${process.env.YAHOO_REDIRECT_URI}`
    console.log(url)
    // save
    // 
     open(url);
    res.redirect(url);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function redirectLinkYahooApp(req, res, next) {
 console.log("auth_code : ", req.query) 
  try {
    const response = await axios.post(
      process.env.YAHOO_GET_TOKEN_URL,
      {
        client_id: process.env.YAHOO_CLIENT_ID,
        client_secret: process.env.YAHOO_CLIENT_SECRET,
        token_uri:  process.env.YAHOO_REDIRECT_URI,
        code: req.query.code,
        grant_type: "authorization_code",
      }
    );
    console.log("access_token : ", response.data.access_token);
    console.log("refresh_token : ", response.data.refresh_token);
    console.log("expires_in : ", response.data.expires_in);
    // save data in database 
    new EmailNotifierConnection({
        host: process.env.GMAIL_HOST_SERVICE,
        username: req.body.username, 
        access_token: response.data.access_token, 
      });
    // 
    res.send({
      access_token : response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_in : response.data.expires_in
    });
    next;
  } catch (error) {
    next(error);
  }
}

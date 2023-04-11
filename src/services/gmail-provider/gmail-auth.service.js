import axios from "axios";
import open from "open";
import EmailNotifierConnection from "../../common/utils/mail-notifier-connection.util.js"


export async function loginGmail(req, res, next) {
  console.log("aaa");
  try {
    const body = {
      scope: [process.env.GMAIL_SCOPE],
      response_type: "code",
      auth_uri: process.env.GMAIL_AUTH_HOST_URI,
      client_id: process.env.GMAIL_CLIENT_ID,
      prompt: "consent",
      access_type: "offline",
    };
    const response = await axios.post(
      process.env.GMAIL_AUTHORITY_HOST_URL,
      body
    );
    console.log(response.data);
    open(response.data.authorize_uri);
    res.send(response.data);
    next;
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function redirectLinkGoogleApp(req, res, next) {
  try {
    const response = await axios.post(
      "https://developers.google.com/oauthplayground/exchangeAuthCode",
      {
        client_id: process.env.GMAIL_CLIENT_ID,
        client_secret: process.env.GMAIL_CLIENT_SECRET,
        token_uri: "https://oauth2.googleapis.com/token",
        code: req.body.code,
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
    console.log(error);
    res.send(error);
  }
}


import axios from "axios";
// import xoauth2 from "xoauth2";
import open from "open";
import EmailNotifierConnection from "../../common/utils/mail-notifier-connection.util.js";
// import AuthenticationContext from 'adal-node' ;
import * as msal from "@azure/msal-node";

export async function loginHotmail(req, res, next) {
  try {
    const cca = await new msal.ConfidentialClientApplication({
      auth: {
        authority: process.env.HOTMAIL_AUTHORITY,
        clientId: process.env.HOTMAIL_CLIENT_ID,
        clientSecret: process.env.HOTMAIL_CLIENT_SECRET,
      },
    });
    const tokenRequest = {
      scopes: [
        process.env.HOTMAIL_GRAPH_ENDPOINT + "/.default",
      ],
    };
    const response = await cca.acquireTokenByClientCredential(tokenRequest);
    console.log("accessToken : ", response.accessToken);
    console.log("expiresOn : ", response.expiresOn);
    // save
    // const ress = await axios.get(
     open( 
    `https://login.microsoftonline.com/${process.env.HOTMAIL_TENANT_ID}/oauth2/authorize?client_id=${process.env.HOTMAIL_CLIENT_ID}&response_type=code&prompt=admin_consent`,
      
    );
    // 
    const authCodeRequest = {
      redirectUri: cca.auth.redirectUri,
  };
    // 
    new EmailNotifierConnection({
      host: process.env.HOTMAIL_HOST_SERVICE,
      // username: process.env.HOTMAIL_ADDRESS,
      username: req.body.username,
      access_token: response.accessToken,
    });
    //
    return response;
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function redirectLinkHotmailApp(req, res, next) {
  // Generate PKCE Codes before starting the authorization flow
  const { verifier, challenge } = await cryptoProvider.generatePkceCodes();

  // Set generated PKCE codes and method as session vars
  req.session.pkceCodes = {
    challengeMethod: "S256",
    verifier: verifier,
    challenge: challenge,
  };

  /**
   * By manipulating the request objects below before each request, we can obtain
   * auth artifacts with desired claims. For more information, visit:
   * https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_node.html#authorizationurlrequest
   * https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_node.html#authorizationcoderequest
   **/

  req.session.authCodeUrlRequest = {
    redirectUri: REDIRECT_URI,
    responseMode: "form_post", // recommended for confidential clients
    codeChallenge: req.session.pkceCodes.challenge,
    codeChallengeMethod: req.session.pkceCodes.challengeMethod,
    ...authCodeUrlRequestParams,
  };

  req.session.authCodeRequest = {
    redirectUri: REDIRECT_URI,
    code: "",
    ...authCodeRequestParams,
  };

  // Get url to sign user in and consent to scopes needed for application
  try {
    const authCodeUrlResponse = await msalInstance.getAuthCodeUrl(
      req.session.authCodeUrlRequest
    );
    res.redirect(authCodeUrlResponse);
  } catch (error) {
    next(error);
  }
}

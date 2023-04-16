export async function redirectLinkHotmailApp(req, res, next) {
    console.log("auth_code : ", req.body) 
     try {
       const authCodeUrlResponse = await msalInstance.getAuthCodeUrl(
         req.session.authCodeUrlRequest
       );
       res.redirect(authCodeUrlResponse);
     } catch (error) {
       next(error);
     }
   }
   
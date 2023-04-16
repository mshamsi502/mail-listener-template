import nodemailer from "nodemailer"
import { loginGmail } from "../services/gmail-provider/gmail-auth.service.js";
import { loginHotmail } from "../services/hotmail-provider/hotmail-auth.service.js";
import { loginYahoo } from "../services/yahoo-provider/yahoo-auth.service.js";

export async function loginEmail(req, res, next) {
  let result = "just Gmail, Hotmail and Yahoo...";
  const provider = req.body.username.substring(
    (req.body.username.indexOf("@")+1), 
    (req.body.username.lastIndexOf(".")), 
    )
    console.log("provider : ", provider)
  if (provider === "gmail")
    result = await loginGmail(req, res, next);
  if (provider === "hotmail")
    result = await loginHotmail(req, res, next);
  if (provider === "yahoo") 
  result = await loginYahoo(req, res, next);
  // result = "yahoo is under construction";
  else res.send(result);
}


export async function sendMail(req, res, next) {
  const accessToken = req.body.accessToken;
  const fromAddress = req.body.from;
  const toAddress = req.body.to;
  const subjectAddress = req.body.subject;
  const textAddress = req.body.text;
  const provider = req.body.from.substring(
    (mail.indexOf("@")+1), 
    (mail.lastIndexOf(".")), 
    )

    try {
      const transport = nodemailer.createTransport({
        service: provider, // https://nodemailer.com/smtp/well-known/
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

import * as dotenv from 'dotenv'
import { google } from "googleapis"

dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.SECOND_CLIENT_ID,
  process.env.SECOND_CLIENT_SECRET,
  process.env.SECOND_REDIRECT_URI
);


oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const gmailAuth = {
  type: "OAuth2",
  user: process.env.SECOND_GMAIL_ADDRESS,
  clientId: process.env.SECOND_CLIENT_ID,
  clientSecret: process.env.SECOND_CLIENT_SECRET,
  refreshToken: process.env.SECOND_REFRESH_TOKEN,
};

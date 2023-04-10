import * as dotenv from 'dotenv'
import { google } from "googleapis"

dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.FIRST_CLIENT_ID,
  process.env.FIRST_CLIENT_SECRET,
  process.env.FIRST_REDIRECT_URI
);


oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const firstGmailAuth = {
  type: "OAuth2",
  user: process.env.FIRST_GMAIL_ADDRESS,
  clientId: process.env.FIRST_CLIENT_ID,
  clientSecret: process.env.FIRST_CLIENT_SECRET,
  refreshToken: process.env.FIRST_REFRESH_TOKEN,
};

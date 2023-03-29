import * as dotenv from 'dotenv'

dotenv.config()

export const gmailAuth = {
  type: "OAuth2",
  user: process.env.GMAIL_ADDRESS,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

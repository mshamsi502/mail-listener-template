import express from "express"
import bodyParser from "body-parser"
import * as dotenv from 'dotenv'
import { route } from "./src/routes/mail.route.js"


dotenv.config()
const app = express();
app.use(bodyParser.json())
app.use(`/api/v${process.env.API_VERSION}`, route);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  console.log(`listening on "https://localhost:${process.env.PORT}/api/v${process.env.API_VERSION}/"`);
});

import { loginGmail } from "../services/gmail-provider/gmail-auth.service.js";
import { loginHotmail } from "../services/hotmail-provider/hotmail-auth.service.js";

export async function loginEmail(req, res, next) {
  let result = "just Gmail, Hotmail and Yahoo...";
  if (req.params.provider === "gmail")
    result = await loginGmail(req, res, next);
  if (req.params.provider === "hotmail")
    result = await loginHotmail(req, res, next);
  if (req.params.provider === "yahoo") result = "yahoo is under construction";
  else res.send(result);
}

import notifier from "mail-notifier";

export default class EmailNotifierConnection {
  constructor({ host: host, username: username, access_token: access_token }) {
    const _build_XOAuth2_token = (
      user = username,
      access_token = access_token
    ) =>
      Buffer
      .from([`user=${user}`, `auth=Bearer ${access_token}`, '', '']
      .join('\x01'), 'utf-8')
      .toString('base64');

    console.log(
      "_build_XOAuth2_token :",
      _build_XOAuth2_token(username, access_token)
    );
    const options = {
      username: username,
      host: host,
      port: 993, // imap port
      tls: true,
      xoauth2: _build_XOAuth2_token(username, access_token),
      tlsOptions: { rejectUnauthorized: false },
    };

    notifier(options)
      .on("mail", (mail) => console.log(mail))
      .start();
  }
}

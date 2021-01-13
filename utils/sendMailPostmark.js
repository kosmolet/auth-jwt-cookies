/* 
// To send reset password mail with Postmark
// npm i postmark
// import to auth controller

const postmark = require("postmark");

const {
  DOMAIN,
  EMAIL_FROM,
  POSTMARK_SERVER_API_TOKEN,
  PSTMK_TEMPLATE_ID_RESET_PASS,
} = process.env;

const sendVerifyEmailPostmark = async (data) => {
  const To = data.to;
  const { name } = data;
  const time = Date.parse(new Date());
  const urlReset = `${DOMAIN}${data.resetPath}`;
  const msg = {
    From: EMAIL_FROM,
    To,
    TemplateId: PSTMK_TEMPLATE_ID_RESET_PASS,
    TemplateModel: { name, urlReset, time },
  };
  try {
    const client = new postmark.Client(POSTMARK_SERVER_API_TOKEN);
    await client.sendEmailWithTemplate(msg);
    logger.debug(`Email was sent to ${msg.To}`);
  } catch (err) {
    logger.debug("Email was NOT sent", err.message);
    if (err.response) {
      logger.debug(err.response.body);
    }
  }
};
module.exports = sendVerifyEmailPostmark;

*/

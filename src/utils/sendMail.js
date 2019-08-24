import sgMail from '@sendgrid/mail';
import debug from 'debug';
import '../config/env';

const infolog = debug('http:info');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendMail = async (to, subject, message) => {
  try {
    const msg = {
      to,
      from: process.env.APP_EMAIL,
      subject,
      text: message.text,
      html: message.html
    };

    await sgMail.send(msg);
  } catch (e) {
    infolog(`sendMailError: ${e.message} (${e.code})`);
  }
};

export default sendMail;

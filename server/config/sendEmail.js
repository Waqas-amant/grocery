import sendEmail from "../config/emailService.js";

const sendEmailFun = async (sendTo, subject, text, html) => {
  const result = await sendEmail(sendTo, subject, text, html);

  if (result.success) {
    return true;
    // res.status(200).json({ message: 'Email sent successful' });
  } else {
    return false;
    // res.status(500).json({ message: 'Failed to send email' });
  }
};

export default sendEmailFun;

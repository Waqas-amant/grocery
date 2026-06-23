import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // MUST be App Password
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    if (!to || !subject) {
      throw new Error("Missing required fields");
    }

    const info = await transporter.sendMail({
      from: `"Grocery App" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email send failed:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }
};

export default sendEmail;

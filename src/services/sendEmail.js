const nodemailer = require("nodemailer");

const sendEmail = async (email, typeOfLetter) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'eatngo2019@gmail.com',
      pass: 'eatngoProject2019'
    }
  });
  let info = await transporter.sendMail({
    from: '"EAT&GO" <eatngo2019@gmail.com>',
    to: `${email}`,
    subject: "Confirmation ✔",
    html: typeOfLetter
  });

  console.log("Message sent: %s", info.messageId);
  return
}

module.exports = sendEmail;


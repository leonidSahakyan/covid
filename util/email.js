const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");

const sendEmail = async (options) => {
  AWS.config.update({
    accessKeyId: process.env.SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
  });

  let sesTransporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01'
    })
  });

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    },
    rejectUnauthorized: false,
    secureConnection: true
  });

  const message = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(message, function(error, info) {
    if(error) return console.log(error)
    console.log('Message sent: ' + info.response)
  })

  await sesTransporter.sendMail(message, function(error, info) {
    if(error) return console.log(error.message)
  })

}

module.exports = sendEmail
const nodemailer = require('nodemailer');
const emailService = new nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ayhamkattan1@gmail.com",
    pass: "ptoolotkgauysysw",
    authtype: "smtps",
  },

});

module.exports=emailService
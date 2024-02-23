// emailController.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amarahabib630@gmail.com',
    pass: 'ismy ldlr kgcs mvzi'
  }
});

exports.sendEmail = (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'amarahabib630@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
};

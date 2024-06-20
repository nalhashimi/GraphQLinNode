var nodemailer = require('nodemailer');

//Defining a function
function sendEmail(){
 
var transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: "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"
    }
 });
  
  var mailOptions = {
    from: 'naamanh@gmail.com',
    to: 'naamanh@me.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

//we call the function here
sendEmail()

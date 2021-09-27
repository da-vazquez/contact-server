require('dotenv').config()
const router = require('express').Router()
const nodemailer = require('nodemailer')


const contactEmail = nodemailer.createTransport({ 
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSW
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log('error communicating with host email service', error.message)
  } else {
    console.log('Ready to Send');
  }
})

router.post('/contact', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: name,
    to: process.env.USER,
    subject: 'Contact Form Submission',
    html: `<p>From: ${name}</h4>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  }

  const reply = {
    from: process.env.USER,
    to: email,
    subject: 'Submission was successful!',
    html: `Thank you for contacting me ${name}, I will get back to you as soon as I can!`,
  }

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'Error sending message' });
    } else {
      res.json({ status: 'Message Sent!' });
    }
  })

  contactEmail.sendMail(reply, (error) => {
    if (error) {
      res.json({ status: 'Error sending reply email' });
    } else {
      res.json({ status: 'Reply email successful!' });
    }
  })
})


module.exports = router;
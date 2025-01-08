const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const msg = {
  to: 'nassah4002@gmail.com', // Change to your recipient
  from: 'admin@wearetheqube.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
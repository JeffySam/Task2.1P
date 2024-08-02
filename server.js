const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// to Set  SendGrid API key
sgMail.setApiKey('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');


app.get('/', (req, res) => {
  res.send(`
    <form action="/subscribe" method="post">
      <label for="email">SIGN UP FOR OUR DAILY INSIDER</label>
      <input type="email" name="email" id="email" required>
      <button type="submit">Subscribe</button>
    </form>
  `);
});

//to  Handle subscription
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

 
  const msg = {
    to: email,
    from: 'jeffysambabu@gmail.com',
    subject: 'Welcome to DEV@Deakin!',
    text: 'Thank you for subscribing to our daily insider hahaha.',
    html: '<strong>Thank you for subscribing to our daily insider.</strong>',
  };


  sgMail
    .send(msg)
    .then(() => {
      res.send('Welcome email sent successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.send('Failed to send welcome email.');
    });
});

//to Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

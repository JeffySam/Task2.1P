const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

// Initialize Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// To Set the SendGrid API key
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// The rest of your server.js code


app.get('/', (req, res) => {
  res.send(`
    <form action="/subscribe" method="post">
      <label for="email">SIGN UP FOR OUR DAILY INSIDER</label>
      <input type="email" name="email" id="email" required>
      <button type="submit">Subscribe</button>
    </form>
  `);
});

// Handle subscription
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  // Define email content
  const msg = {
    to: email,
    from: 'jeffysambabu@gmail.com',
    subject: 'Welcome to DEV@Deakin!',
    text: 'Thank you for subscribing to our daily insider.',
    html: '<strong>Thank you for subscribing to our daily insider.</strong>',
  };

  // Send email
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

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const twilio = require('./twilio'); // Import twilio module with send message function

//setup the server
const app = express();
app.use(express.json());

//Question for future: Is it ok that I am sending logs from twilio module, or should I do it from here

// API endpoint to send Twilio message
// Can't remember best practices for using async and await, but I'm pretty sure i'm using it too much
// Do I need to catch an error here, even though I do it in the twilio module?
app.post('/api/send-message', async (req, res) => {
    console.log(req.body.message);
    try {
      await twilio.sendTwilioMessage(req.body.message);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send Twilio message' });
    }
  });


// Start the server on same port as app
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

//Import the logger module
const logger = require('./logger');

//eventually, we need to make these into environment variables for security
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

//exporting a function that tries to send a message
module.exports = {
  sendTwilioMessage: async (msg) => {
    try {
      const message = await client.messages.create({
        body: msg,
        from: '+18482666431', //Our twilio phone number
        to: '+16087803817' //Ellie's phone number
      });

      logger.info('Twilio message sent', {
        messageId: message.sid,
        recipient: message.to
        //could add more things here that we want to know about the message
      });
    } catch (error) {
      logger.error('Error sending Twilio message', {
        error: error.message
      });
    }
  }
};

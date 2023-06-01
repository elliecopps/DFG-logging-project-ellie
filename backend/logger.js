const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');

// Create a new Winston logger
const logger = winston.createLogger({
  level: 'info', // Set the logging level as per your requirements
  transports: [
    new winston.transports.Console(), // Log to the console
    new Loggly({
      token: 'd420c8b5-649b-4d92-947e-cfe70978095b', // Replace with your Loggly token
      subdomain: 'ellieproject', // Replace with your Loggly subdomain
      tags: ['ReactApp'], // Add any relevant tags for filtering logs in Loggly
      json: true // Enable JSON format for the logs
    })
  ]
});

module.exports = logger;

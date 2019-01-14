
    const TWILIO_ACCOUNT_SID = 'AC9723dcccf5692a9d642368a8bac06f4e';
    const TWILIO_AUTH_TOKEN = 'b2e7f40faff188889915b72c64b8438c';
    
    var twilio = require('twilio');

    // Find your account sid and auth token in your Twilio account Console.
    var client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    module.exports = client;
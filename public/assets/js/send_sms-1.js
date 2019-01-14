


    const accountSid = 'AC9723dcccf5692a9d642368a8bac06f4e';
    const authToken = 'b2e7f40faff188889915b72c64b8438c';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+14155824287',
            to: '+14157285985'
        })
        .then(message => console.log(message.sid))
        .done();



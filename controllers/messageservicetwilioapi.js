var accountSid = 'AC2b3ece4b16b7769aa98aa794df6f71b7'; // Your Account SID from www.twilio.com/console
var authToken = 'f58926892ff98238df9fd1f641cbdce4'; // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
var sendMessage = function(res, callback) {
    console.log(res);
    if (res.phone.indexOf('+91') != 0) {
        res.phone = '+91' + res.phone;
    }
    var messageContent = {};
    messageContent.body = res.body;
    messageContent.to = res.phone;
    messageContent.from = "+12564148586";
    client.messages.create(messageContent, function(error, message) {
        if (error) {
            console.log(error.message);
            callback(false)
        } else {
            console.log(message.sid);
            callback(true)
        }
    });
}
exports.sendMessage = sendMessage;
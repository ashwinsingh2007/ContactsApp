"use strict"
const crypto = require('crypto');
var mysql = require('mysql');
//Config here.
//Config the host,user,password,database credentials here.
var con = mysql.createPool({
    connectionLimit: 10,
    host: "",
    user: "",
    password: "",
    database: ""
});
var CreateUsers = function(body, callback) {
    var firstname = body.firstname;
    var lastname = body.lastname;
    var email = body.email;
    var password = body.password;

    var cipher = crypto.createCipher('aes192', 'password');
    var encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    var query = "insert into stockusers values ('" + firstname + "','" + lastname + "','" + email + "','" + encryptedPassword + "');"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            callback(false);
        } else {
            console.log("Succesfull User Account Created !!");
            callback(true);
        }
    })
}

var authorizeUser = function(body, callback) {
    var password = body.passwordLogin;
    var query = "select password from stockusers where email='" + body.emailLogin + "'";

    console.log(query);
    con.query(query, function(err, result) {
        if (err || result.length <= 0) {
            console.log(err);
            callback(false);
        } else {
            var decipher = crypto.createDecipher('aes192', 'password');
            var encrypted = result[0].password;
            var decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            if (decrypted == password) {
                console.log(result);
                console.log("Succesfull User Account found !!");
                callback(true);
            } else {
                callback(false);
            }
        }
    })
}
var saveContactsDetails = function(reqSession, res, callback) {
    var username = reqSession.session.user;
    console.log(reqSession.session);
    var query = "insert into Contacts values('','" + res.ContactName + "','" + res.ContactPhone + "','" + res.ContactPhone + "','" + res.ContactAddress + "','" + username + "')";
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log("Succesfull Contact Addedd.");
            callback(true);
        }
    })
}
var getContactsDetails = function(req, res, callback) {
    var query = "select * from Contacts where Username like '" + req.session.user + "' limit 1000;"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            res.send(result);
            callback(true);
        }
    })
}

var getMsgLog = function(req, res, callback) {
    var query = "select * from SentMsgs where username like '" + req.session.user + "' order by SNO desc limit 1000;"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            res.send(result);
            callback(true);
        }
    })
}
var saveMessage = function(req, res, callback) {
    var username = req.session.user;
    var from = "+12564148586";
    var query = "insert into SentMsgs values('','" + username + "','" + from + "','" + res.phone + "','" + res.body + "','" + new Date() + "')"
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            callback(true);
        }
    })
}

var removeMsgDetails = function(res, callback) {
    var query = "delete from SentMsgs where SNO=" + res.id;
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            callback(true);
        }
    })
}
var removeContactsDetails = function(res, callback) {
    var query = "delete from Contacts where SNO=" + res.id;
    console.log(query);
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log(result);
            callback(true);
        }
    })
}

exports.CreateUsers = CreateUsers;
exports.saveContactsDetails = saveContactsDetails;
exports.getMsgLog = getMsgLog;
exports.saveMessage = saveMessage;
exports.authorizeUser = authorizeUser;
exports.getContactsDetails = getContactsDetails;
exports.removeMsgDetails = removeMsgDetails;
exports.removeContactsDetails = removeContactsDetails

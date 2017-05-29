var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var msgController = require('../controllers/messageservicetwilioapi');
var db = require('../controllers/dbcontroller');

/* GET Contact page. */
router.get('/', function(req, res) {
    try {
        var urlParse = url.parse(req.url, true);
        var param = urlParse.query;
        msgController.sendMessage(param, function(result) {
            console.log(result);
            if (result) {
                res.send(true);
                db.saveMessage(req, param, function(result) {
                    console.log(result);
                });
            } else {
                res.send(false);
            }
        });

    } catch (ex) {
        res.send("Some error occured.")
        console.log(ex);
    }
})
module.exports = router;
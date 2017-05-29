var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var sessionsexp = require('express-session');
router.use(sessionsexp({ resave: true, saveUninitialized: true, secret: 'einsite', cookie: { maxAge: 60000 } }));
var db = require('../controllers/dbcontroller');
/* Save Contact page. */
router.get('/', function(req, res) {
    var urlParse = url.parse(req.url, true);
    var param = urlParse.query;
    console.log(param);
    try {
        db.saveContactsDetails(req, param, function(result) {
            console.log(result);
            res.send('Contacts Added Successfully.');
        });
    } catch (ex) {
        console.log(ex);
        res.send('something went wrong while Adding Contacts.');
    }
})
module.exports = router;
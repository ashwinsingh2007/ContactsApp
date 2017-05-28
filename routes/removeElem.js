var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var db = require('../controllers/dbcontroller');
/* Save Contact page. */
router.get('/', function(req, res) {
    var urlParse = url.parse(req.url, true);
    var param = urlParse.query;
    console.log(param);
    try {
        if (param.section == 'sentDetails') {
            db.removeMsgDetails(param, function(result) {
                console.log(result);
                res.send('MSG details removed Successfully.');
            });
        } else {
            db.removeContactsDetails(param, function(result) {
                console.log(result);
                res.send('Contacts removed Successfully.');
            });
        }

    } catch (ex) {
        console.log(ex);
        res.send('something went wrong while deleting.');
    }
})
module.exports = router;
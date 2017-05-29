var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../controllers/dbcontroller');

/* GET Contact page. */
router.get('/', function(req, res) {
    try {
        db.getContactsDetails(req, res, function(result) {
            console.log(result);
        });
    } catch (ex) {
        console.log(ex);
    }
})
module.exports = router;
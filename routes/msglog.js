var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../controllers/dbcontroller');
/* GET Contact page. */
router.get('/', function(req, res) {
    try {
        if (!!req.session.user) {
            res.sendFile(path.join(__dirname, '../views', 'flot.html'));
        } else {
            res.sendFile(path.join(__dirname, '../views', 'signlogpage.html'));
        }
    } catch (ex) {
        console.log(ex);
    }
})
module.exports = router;
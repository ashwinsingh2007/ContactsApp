var express = require('express');
var router = express.Router();
var path = require('path');
/* GET Contact page. */
router.get('/', function(req, res) {
    try {
        if (!!req.session.user) {
            res.sendFile(path.join(__dirname, '../views', 'tables.html'));
        } else {
            res.sendFile(path.join(__dirname, '../views', 'signlogpage.html'));
        }
    } catch (ex) {
        console.log(ex);
    }
})
module.exports = router;
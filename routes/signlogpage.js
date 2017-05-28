var express = require('express');
var router = express.Router();
var path = require('path');
/* GET signlogpage. */
router.get('/', function(req, res) {
    try {
        res.sendFile(path.join(__dirname, '../views', 'signlogpage.html'));
    } catch (ex) {
        console.log(ex);
    }
})
module.exports = router;
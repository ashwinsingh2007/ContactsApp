var express = require('express');
var router = express.Router();
var path = require('path');

/* GET Sen Messages detail page. */
router.get('/table', function(req, res) {
    try {
        if (!!req.session.user) {}
        res.sendFile(path.join(__dirname, '../views', 'tables.html'));
    } catch (ex) {
        console.log(ex);
    }
})
module.exports = router;
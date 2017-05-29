var express = require('express');
var router = express.Router();
var path = require('path');
/* GET index page. */
router.get('/', function(req, res) {
    try {
        if (!!req.session.user) {
            req.session.destroy(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.sendFile(path.join(__dirname, '../views', 'signlogpage.html'));
                }
            });
        } else {
            res.sendFile(path.join(__dirname, '../views', 'signlogpage.html'));
        }

    } catch (ex) {
        console.log(ex);
    }
})
module.exports = router;
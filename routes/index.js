var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../controllers/dbcontroller');
/* GET home page. */
router.get('/', function(req, res) {
    try {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
    } catch (ex) {
        console.log(ex);
    }
})
router.post('/', function(req, res) {
    try {
        if (req.session.user == undefined) {
            if (!!req.body.emailLogin) {
                db.authorizeUser(req.body, function(result) {
                    if (result) {
                        req.session.user = req.body.emailLogin;
                        console.log(req.session);
                        res.sendFile(path.join(__dirname, '../views', 'index.html'));
                    } else {
                        res.send('Wrong EmailId or Password !!');
                    }
                })
            } else {
                db.CreateUsers(req.body, function(result) {
                    if (result) {
                        req.session.user = req.body.emailLogin;
                        res.sendFile(path.join(__dirname, '../views', 'index.html'));
                    } else {
                        res.send("Error occured !! May be credentials already used for 'email'");
                    }
                })
            }
        } else {
            res.end("Already Signed In. :)")
        }
    } catch (ex) {
        console.log(ex);
    }

})
module.exports = router;
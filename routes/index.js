var express = require('express'),
    router = express.Router(),
    UserCtrl = require('../Controllers/UserCtrl.js');
    
router.route('/Login').post(UserCtrl.Login);
router.route('/Register').post(UserCtrl.Register);
router.route('/GetResults').get(UserCtrl.GetResults);
module.exports = router;
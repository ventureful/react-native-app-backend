var express = require('express'),
    router = express.Router(),
    UserCtrl = require('../Controllers/UserCtrl.js');
    
router.route('/Login').post(UserCtrl.Login);
router.route('/Register').post(UserCtrl.Register);
router.route('/GetResults').get(UserCtrl.GetResults);
router.route('/GetStats').get(UserCtrl.GetStats);
module.exports = router;
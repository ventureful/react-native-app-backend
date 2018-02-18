var express = require('express'),
    router = express.Router(),
    UserCtrl = require('../Controllers/UserCtrl.js');

router.route('/Login').post(UserCtrl.Login);
router.route('/Register').post(UserCtrl.Register);
router.route('/GetResults').get(UserCtrl.GetResults);
router.route('/GetResultsByDate').get(UserCtrl.GetResultsByDate);
router.route('/GetStats').get(UserCtrl.GetStats);
router.route('/UpdateResults').post(UserCtrl.UpdateResults);

module.exports = router;

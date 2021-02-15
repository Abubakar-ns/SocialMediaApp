const express = require('express');
const router = express.Router();

const usersController = require('../controller/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);
//are you there?
//yesotor?
//its working?
//thanks


router.post('/create', usersController.create);


module.exports = router;
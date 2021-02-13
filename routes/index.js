const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controlles');
router.get('/',homeController.home);
router.use('/users',require('./users'));

module.exports = router;
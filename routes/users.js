const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controller/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.Update);

router.get('/sign-up',usersController.signup);
router.get('/sign-in', usersController.signin);
router.get('/sign-out', usersController.destroySession);


router.post('/create', usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);
/*router.post('/add-post', usersController.createPost);*/

module.exports = router;
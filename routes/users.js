const express = require('express');
const router = express.Router();

const usersController = require('../controller/users_controller');
router.get('/profile',usersController.profile);
module.exports= router;
//aap jb tak view nhi create kroge yehi show hoga views folder me profile bnap
//ohh ok
// to aapne banadiya ye mai banao
//sir aage sikhaynge 
//but sir ka toh abhi se chalra
//letme see
//ok
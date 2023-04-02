const express = require('express');

const resetpasswordController = require('../controllers/resetpassword');
const {authenticate} =require('../middleware/auth')

const router = express.Router();

router.get('/updatepassword/:resetpasswordid',resetpasswordController.updatepassword)

router.get('/resetpassword/:id',resetpasswordController.resetpassword)

router.use('/forgotpassword', resetpasswordController.forgotpassword)

module.exports = router;
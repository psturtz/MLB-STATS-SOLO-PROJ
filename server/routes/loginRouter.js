const express = require('express');
const path = require ('path');
const cookieController = require('../controllers/cookieController');
const userController = require ('../controllers/userController')

const router = express.Router();

router.post('/submit/', userController.findUser,cookieController.createCookie, (req, res) => {
  // res.locals.loginStatus == true ? res.redirect('../home') : 
  return res.status(200).json(res.locals.loginStatus);
})

router.use('/', express.static(path.resolve(__dirname, '../../build'))
);



module.exports = router
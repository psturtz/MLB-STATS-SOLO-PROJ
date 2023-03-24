const express = require('express');
const path = require('path');
const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/submit/', userController.createUser, cookieController.createCookie, (req, res) => {
  console.log('in here')
  return res.status(200).json(res.locals.user);
});

router.use('/', express.static(path.resolve(__dirname, '../../build')))

module.exports = router;
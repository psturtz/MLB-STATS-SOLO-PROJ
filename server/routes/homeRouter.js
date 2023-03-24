const express = require('express');
const path = require('path');
const statsController = require('../controllers/statsController');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/:teamId', statsController.getRoster, (req, res) => {
  return res.status(200).json(res.locals.players);
})

router.get(
  '/:teamId/schedule',
  statsController.getUpcomingOpponents,
  (req, res) => {
    console.log('routerHERE');
    console.log(res.locals.upcoming);
    return res.status(200).json(res.locals.upcoming);
  }
);

router.use(express.static(path.resolve(__dirname, '../../build')));


module.exports = router
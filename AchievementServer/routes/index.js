var express = require('express');
var router = express.Router();

var ctrlAchievements = require('../controllers/achievements');

router.get('/achievements/:steamid', ctrlAchievements.GetPlayerAchievements);

module.exports = router;

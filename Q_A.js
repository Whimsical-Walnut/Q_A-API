const express = require('express');

const router = express.Router();

const controller = require('./model/Q_A.controller.js');

router.get('/', controller.getQuestions);

module.exports = router;
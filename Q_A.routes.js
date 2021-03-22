const express = require('express');

const router = express.Router();

const controller = require('./model/Q_A.controller.js');

router.get('/questions/', controller.getAllQuestions);
router.get('/questions/:question_id/answers', controller.getQ);
router.post('/questions', controller.postQ);
router.post('/questions/:question_id/answers', controller.postAns);
router.put('/questions/:question_id/helpful', controller.postHelpful);
router.put('/questions/:question_id/report', controller.Reported);
router.put('/answers/:answer_id/helpful', controller.postAnsHelpful);
router.put('/answers/:answer_id/report', controller.AnsReported);
module.exports = router;
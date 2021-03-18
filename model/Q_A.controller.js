'use strict';
const model = require('./Q_A.model.js');

exports.getQuestions = function(req, res) {
  var layout = {
    product_id: req.query.product_id,
    results: []
  }
  var resultCnt = [];
  var ans = [];
  model.getQuestions(req.query.product_id)
    .then((result) => {
      var arr = [];
      for (var i = 0; i < result.length; i ++) {
        var resultsObj = {};
        var curr = result[i];
        resultsObj.question_id = curr.question_id;
        resultsObj.question_body = curr.question_body;
        resultsObj.question_date = curr.question_date;
        resultsObj.asker_name = curr.asker_name;
        resultsObj.question_helpfulness = curr.question_helpfulness;
        resultsObj.reported = curr.reported;
        resultsObj.answers = {};
        arr.push(resultsObj);
        resultCnt.push(curr.question_id);
      }
      layout.results = arr;
      return layout;
    })
    .then((vroom) => {
      layout = vroom;
      var arr = [];
      for(var i = 0; i < resultCnt.length; i++) {
        arr.push(model.getAnswers(resultCnt[i]));
      }
      return Promise.all(arr);
    })
    .then((log) => {
      ans = log;
      return ans;
    })
    .then( () => {
      var holder = [];
      for(var j = 0; j < resultCnt.length; j++) {
        for(var i = 0; i < ans.length; i++) {
          for(var k = 0; k < ans[i].length; k++) {
              if(ans[i][k].question_id === layout.results[j].question_id) {
                layout.results[j].answers[`${ans[i][k].id}`] = ans[i][k];
              }
          }
        }
      }
      return layout;
    })
    .then((val) => {
      res.send(val);
    })
    .catch((error) => {
      res.send(error);
    });

}

'use strict';
const model = require('./Q_A.model.js');

exports.getAllQuestions = function(req, res) {
  var layout = {
    product_id: req.query.product_id,
    results: []
  }
  model.getAll(req.query.product_id)
    .then((result) => {
      var prevQ = 0;
      var prevAns = 0;
      var resultArr = [];
      var count = 0;
      for(var i = 0; i < result.length; i++) {
        var cur = result[i];
        if(cur.question_id !== prevQ) { //new question ID
          prevQ = cur.question_id
          if(cur.reported === 0) {
            cur.reported = false;
          } else {
            cur.reported = true;
          }
          var Obj = {
            question_id: cur.question_id,
            question_body: cur.question_body,
            question_date: cur.question_date,
            asker_name: cur.asker_name,
            question_helpfulness: cur.question_helpfulness,
            reported: cur.reported,
            answers: {}
          }
          if(cur.AnsId !== null) {//if answers id is not null
            prevAns = cur.AnsId; //is the first photo in answer
            Obj.answers[`${cur.AnsId}`] = {
              id: cur.AnsId,
              body: cur.body,
              date: cur.date,
              answerer_name: cur.answerer_name,
              helpfulness: cur.helpful,
              photos: []
            }
            if(cur.id !== null) {
              var photoObj = {
                id: cur.id,
                url: cur.url
              }
              Obj.answers[`${cur.AnsId}`].photos.push(photoObj);
            }
          }
          count++;
          resultArr.push(Obj);
        } else { //same old question ID
          var currObj = resultArr[count - 1];
          //we handle photo here everything will be same except answer id
          if(prevAns !== cur.AnsId) { //if answers changed,
            prevAns = cur.AnsId;
            currObj.answers[`${cur.AnsId}`] = { //add another answer to question id
              id: cur.AnsId,
              body: cur.body,
              date: cur.date,
              answerer_name: cur.answerer_name,
              helpfulness: cur.helpful,
              photos: []
            }
            if(cur.id !== null) {
              var photoObj = {
                id: cur.id,
                url: cur.url
              }
              currObj.answers[`${cur.AnsId}`].photos.push(photoObj);
            }
          } else { //if answer is the same then we push photos in to answer cuz everything same
            if(cur.id !== null) {
              var photoObj = {
                id: cur.id,
                url: cur.url
              }
              currObj.answers[`${cur.AnsId}`].photos.push(photoObj);
            }
          }
          resultArr[count - 1] = currObj;
        }
      }
      layout.results = resultArr;
      // res.send(result);
      res.send(layout);
    })
    .catch((error) => {
      console.log(error);
    })
}

//304558


 // var layout = {
  //   product_id: req.query.product_id,
  //   results: []
  // }
  // var resultCnt = [];
  // var ans = [];
  // var ansId = [];
  // var photos = [];
  // model.getQuestions(req.query.product_id)
  //   .then((result) => {
  //     //first we attach results to the layout frame
  //     var arr = [];
  //     for (var i = 0; i < result.length; i ++) {
  //       var resultsObj = {};
  //       var curr = result[i];
  //       resultsObj.question_id = curr.question_id;
  //       resultsObj.question_body = curr.question_body;
  //       resultsObj.question_date = curr.question_date;
  //       resultsObj.asker_name = curr.asker_name;
  //       resultsObj.question_helpfulness = curr.question_helpfulness;
  //       resultsObj.reported = curr.reported;
  //       resultsObj.answers = {};
  //       arr.push(resultsObj);
  //       resultCnt.push(curr.question_id);
  //     }
  //     layout.results = arr;
  //     var arr = [];
  //     for(var i = 0; i < resultCnt.length; i++) {
  //       arr.push(model.getAnswers(resultCnt[i]));
  //     }
  //     return Promise.all(arr);
  //   })
  //   .then( (log) => {
  //     ans = log;
  //     //attach answers to each corresponding result
  //     var holder = [];
  //     for(var j = 0; j < resultCnt.length; j++) {
  //       for(var i = 0; i < ans.length; i++) {
  //         for(var k = 0; k < ans[i].length; k++) {
  //           if(ans[i][k].question_id === layout.results[j].question_id) {
  //             layout.results[j].answers[`${ans[i][k].id}`] = ans[i][k];
  //             ansId.push(ans[i][k].id);
  //           }
  //         }
  //       }
  //     }
  //     return layout;
  //   })
  //   .then((val) => {

  //     res.send(layout);
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });

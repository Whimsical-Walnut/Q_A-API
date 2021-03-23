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
          if(cur.report === 0) {
            cur.report = false;
          } else {
            cur.report = true;
          }
          var Obj = {
            question_id: cur.question_id,
            question_body: cur.question_body,
            question_date: cur.question_date,
            asker_name: cur.asker_name,
            question_helpfulness: cur.question_helpfulness,
            reported: cur.report,
            answers: {}
          }
          if(cur.AnsId !== null && cur.reported !== 1) {//if answers id is not null
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
          if(prevAns !== cur.AnsId && cur.reported !== 1) { //if answers changed,
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
            if(cur.id !== null && cur.reported !== 1) {
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

exports.getQ = function(req, res) {
  var layout = {
    question: req.params.question_id,
    page: req.query.page || 0,
    count: req.query.count || 5,
    results: []
  }
  var prevAns = 0;
  var count = 0;
  model.getByQ(req.params.question_id)
    .then((result) => {
      for(var i = 0; i < result.length; i++) {
        var cur = result[i];
        if(cur.AnsId !== prevAns) { //ans # is not same
          prevAns = cur.AnsId;``
          var Obj = {
            answer_id: cur.AnsId,
            body: cur.body,
            date: cur.date,
            answerer_name: cur.answerer_name,
            helpfulness: cur.helpful,
            photos: [],
          }
          if(cur.id !== null) {
            var photoObj = {
              id: cur.id,
              url: cur.url
            }
            Obj.photos.push(photoObj);
          }
          count++;
          layout.results.push(Obj);
        } else { //ans num is same which means there are only photos
          var currObj = layout.results[count - 1];
          if(cur.id !== null) {
            var photoObj = {
              id: cur.id,
              url: cur.url
            }
            currObj.photos.push(photoObj);
          }
          layout.results[count - 1] = currObj;
        }
      }
        // res.send(result);
        res.send(layout);
    })
      .catch((error) => {
      console.log(error);
    })
}

  exports.postQ = function(req, res) {
    var dt = new Date();
    var date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

    var curr = req.body;
    model.productExists(curr.product_id, curr.body, date, curr.name, curr.email, 0,0)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  exports.postAns = function(req, res) {
    var dt = new Date();
    var date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    var curr = req.body;

    var arr = [];

    model.postQid(req.params.question_id, curr.body, date, curr.answerer_name, curr.answerer_email, 0, 0)
    .then((result) => {
      var id = result.insertId;
      model.postPhoto(id, curr.photos);
      res.status(201).send('Posted');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  exports.postHelpful = function(req, res) {
    model.isHelpful(req.params.question_id)
      res.status(204).send("Updated");
  }

  exports.Reported = function(req, res) {
    model.isReported(req.params.question_id)
    res.status(204).send("REPORTED");
  }

  exports.postAnsHelpful = function(req, res) {
    model.AnsHelpful(req.params.answer_id)
      res.status(204).send("Updated");
  }

  exports.AnsReported = function(req, res) {
    model.isAnsReported(req.params.answer_id)
      res.status(204).send("Reported");
  }
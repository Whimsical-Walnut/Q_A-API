var db = require('../db/db.js');

//304558
exports.getAll = (product_id) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT *,results.question_id FROM results LEFT JOIN answers On results.question_id = answers.question_id LEFT JOIN photos ON photos.answer_id = answers.AnsId WHERE product_id = ${product_id} AND report=0`;
    db.query(str, (err, result) => {
      if(err) reject(err)
      resolve(result);
    })
  })
}

exports.getByQ = (question_id) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT * FROM answers LEFT JOIN photos ON answers.AnsId = photos.answer_id WHERE question_id = ${question_id}`;
    db.query(str, (err, result) => {
      if(err) reject(err)
      resolve(result);
    })
  })
}

exports.productExists = (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) => {
  return new Promise((resolve, reject) => {
    var str = `INSERT INTO results VALUES (NULL, ${product_id}, '${question_body}', '${question_date}', '${asker_name}', '${asker_email}', ${reported}, ${question_helpfulness})`;
    db.query(str, (err, result) => {
      if(err) reject(err)
      resolve(result)
    })
  })
}

exports.postQid = (question_id, body, date, name, email, reported, helpful ) => {
  return new Promise((resolve, reject) => {
    var str = `INSERT INTO answers VALUES(NULL, ${question_id}, '${body}', '${date}', '${name}', '${email}', ${reported}, ${helpful})`;
    db.query(str, (err,result) => {
      if(err) reject(err)
      resolve(result);
    })
  })
}

exports.postPhoto = (ansId, urlArr) => {
  var arr = [];
  for(var i = 0; i < urlArr.length; i++) {
    var str = `INSERT INTO photos VALUES (NULL, ${ansId}, '${urlArr[i]}')`;
    db.query(str);
  }
}

exports.isHelpful = (question_id) => {
  var str = `UPDATE results SET question_helpfulness=question_helpfulness+1 WHERE question_id=${question_id}`;
  db.query(str, (err, result) => {
    if(err) {
      console.log('Something broke in update');
    } else {
      console.log('Updated succesfully');
    }
  });
}

exports.isReported = (question_id) => {
  var str = `UPDATE results SET report=report+1 WHERE question_id=${question_id}`;
  db.query(str, (err, result) => {
    if(err) {
      console.log('Something broke in report');
    } else {
      console.log('Reported succesfully');
    }
  });
}

exports.AnsHelpful = (Ans_id) => {
  var str = `UPDATE answers SET helpful=helpful+1 WHERE AnsId=${Ans_id}`;
  db.query(str, (err, result) => {
    if(err) {
      console.log('Something broke in update',err);
    } else {
      console.log('Updated succesfully');
    }
  });
}

exports.isAnsReported = (Ans_id) => {
  var str = `UPDATE answers SET reported=reported+1 WHERE AnsId=${Ans_id}`;
  db.query(str, (err, result) => {
    if(err) {
      console.log('Something broke in report',err);
    } else {
      console.log('Reported succesfully');
    }
  });
}
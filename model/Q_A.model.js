'use strict';
var db = require('../db/db.js');

exports.getQuestions = (productId) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness, CASE WHEN reported = 0 THEN 'false' else 'true' end reported FROM results WHERE product_id = ${productId}`;
    db.query(str, (err, result) => {
      if(err) reject(err);
      resolve(result);
    })
  })
}

exports.getAnswers = (questionId) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT * FROM answers where question_id = ${questionId}`;
    db.query(str, (err, result) => {
      if(err) reject(err);
      resolve(result);
    })
  })
}

// getAnswers(30405)
// .then((result) => {
// })
// .catch((err) => {
//   console.log(result)
// })

// const test = () => {
//   return Promise.all([getAnswers(30405), getAnswers(30405)])
//   .then((values) => {
//     let qa = {
//       product_id: 12312,
//       results: []
//     }
//     qa.results = qa.results.concat(...values);
//     return qa;
//   })
//   .catch((err) => {
//     console.log(err)
//   });
// }
// test()
// .then((result) => {
//   result = JSON.stringify(result);
//       result = JSON.parse(result);
// console.log(result);
// })
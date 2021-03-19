'use strict';
var db = require('../db/db.js');

exports.getQuestions = (productId) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT question_id from results where product_id = ${productId}`;
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

exports.getPhotos = (answerId) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT * FROM photos where answer_id  = ${answerId}`;
    db.query(str, (err, result) => {
      if(err) reject(err)
      resolve(result);
    })
  })
}

//304558
exports.getAll = (product_id) => {
  return new Promise((resolve, reject) => {
    var str = `SELECT * FROM results JOIN answers On results.question_id = answers.question_id LEFT JOIN photos ON photos.answer_id = answers.AnsId WHERE product_id = ${product_id}`;
    db.query(str, (err, result) => {
      if(err) reject(err)
      resolve(result);
    })
  })
}

// results.product_id, results.question_id, results.question_body, results.question_date, results.asker_name, results.asker_email, results.reported, results.question_helpfulness, answers.id, answers.body, answers.date, answers.answerer_name, answers.reported, answers.helpful, photos.*



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


import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
    stages: [
      { duration: "30s", target: 1000 },
      { duration: "30s", target: 50 },
      { duration: "30s", target: 600 },
      { duration: "30s", target: 300 },
      { duration: "30s", target: 1000 },
      { duration: "30s", target: 500 },
    ]
  };

export default function () {
  let productId = 14034;
  let questionId = 1;
  const url = 'http://127.0.0.1:5000/'
  productId += 1;
  http.get(`${url}qa/questions/?product_id=${productId}`);
  http.get(`${url}qa/questions/49213/answers`);
  sleep(1);
}
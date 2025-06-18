import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 20,       
  duration: '5s',  
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');

  check(res, {
    '200': (r) => r.status === 200,
    'Response contains data': (r) => r.body && r.body.length > 0,
  });
}
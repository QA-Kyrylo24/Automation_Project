 import {  test   } from '@playwright/test';
 import fs from 'fs';
let token: string;

test('authenticate', async ({ request }) => {

    const resp = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        'email': process.env.USER_EMAIL!,
        'password': process.env.USER_PASSWORD!,
      }
    });
    const jsonData = await resp.json();
    token = jsonData.access_token;
    fs.writeFileSync('tests/.auth/token.json', JSON.stringify({ token }));
   
  });




  



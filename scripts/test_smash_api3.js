const https = require('https');

const url = 'https://cdn.jsdelivr.net/gh/Bowserinator/Super-Smash-Bros-Ultimate-API/images/mario.png';

https.get(url, (res) => {
  console.log(`Status: ${res.statusCode}`);
});

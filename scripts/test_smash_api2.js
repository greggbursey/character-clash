const https = require('https');

const url = 'https://raw.githubusercontent.com/Bowserinator/Super-Smash-Bros-Ultimate-API/master/images/mario.png';

https.get(url, (res) => {
  console.log(`Status: ${res.statusCode}`);
});

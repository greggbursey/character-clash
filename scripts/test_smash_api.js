const https = require('https');

const url = 'https://raw.githubusercontent.com/smashbros-unofficial/smashbros-unofficial-api/master/images/characters/mario.png';

https.get(url, (res) => {
  console.log(`Status: ${res.statusCode}`);
});

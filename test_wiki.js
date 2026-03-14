const https = require('https');
const options = {
  hostname: 'en.wikipedia.org',
  path: '/wiki/Special:FilePath/Leonardo_(Teenage_Mutant_Ninja_Turtles).jpg',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};
https.get(options, (res) => {
  console.log(res.statusCode, res.headers.location);
});

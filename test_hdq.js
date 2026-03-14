const https = require('https');
const options = {
  hostname: 'images.hdqwalls.com',
  path: '/wallpapers/leonardo-tmnt-out-of-the-shadows-5k-w1.jpg',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};
https.get(options, (res) => {
  console.log(res.statusCode, res.headers['content-type']);
});

const https = require('https');

const url = 'https://api.github.com/search/repositories?q=smash+bros+images';

const options = {
  headers: {
    'User-Agent': 'AIStudioApplet/1.0'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(JSON.parse(data).items.slice(0, 3).map(i => i.full_name));
  });
});

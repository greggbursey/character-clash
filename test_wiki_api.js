const https = require('https');

const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=Spider-Man&prop=pageimages&format=json&pithumbsize=400';

const options = {
  headers: {
    'User-Agent': 'AIStudioApplet/1.0 (test@example.com)'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
});

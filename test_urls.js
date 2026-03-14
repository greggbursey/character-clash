const https = require('https');

const urlsToTest = [
  'https://image.pollinations.ai/prompt/Leonardo%20character%20portrait%20comic%20book%20style?width=400&height=400&nologo=true',
  'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg/220px-Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg',
  'https://wallpapercave.com/wp/wp2908232.jpg'
];

urlsToTest.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log('---');
  }).on('error', (e) => {
    console.error(`Error fetching ${url}: ${e.message}`);
  });
});

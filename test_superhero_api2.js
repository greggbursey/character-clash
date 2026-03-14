const https = require('https');

const url = 'https://akabab.github.io/superhero-api/api/all.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const heroes = JSON.parse(data);
    const names = ['Leonardo', 'Donatello', 'Raphael', 'Michelangelo', 'Ryu', 'Chun-Li', 'Scorpion', 'Sub-Zero', 'Mario', 'Link'];
    
    const found = heroes.filter(h => names.includes(h.name));
    console.log(`Found ${found.length} of our other characters!`);
    found.forEach(h => console.log(h.name, h.images.sm));
  });
});

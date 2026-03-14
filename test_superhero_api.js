const https = require('https');

const url = 'https://akabab.github.io/superhero-api/api/all.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const heroes = JSON.parse(data);
    console.log(`Found ${heroes.length} heroes!`);
    console.log('Sample hero:', JSON.stringify(heroes[0], null, 2));
    
    // Check if some of our characters exist
    const names = ['Spider-Man', 'Batman', 'Superman', 'Wolverine', 'Hulk', 'Thanos', 'Joker', 'Wonder Woman', 'Flash', 'Aquaman', 'Darkseid', 'Captain America', 'Iron Man', 'Thor', 'Deadpool'];
    
    const found = heroes.filter(h => names.includes(h.name));
    console.log(`Found ${found.length} of our characters!`);
    console.log('Sample found hero:', JSON.stringify(found[0], null, 2));
  });
});

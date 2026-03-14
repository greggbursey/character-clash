const https = require('https');

const url = 'https://akabab.github.io/superhero-api/api/all.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const heroes = JSON.parse(data);
    const names = [
      'Spider-Man', 'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Wolverine', 'Deadpool', 'Thanos',
      'Superman', 'Batman', 'Wonder Woman', 'Flash', 'Aquaman', 'Joker', 'Darkseid',
      'Leonardo', 'Donatello', 'Raphael', 'Michelangelo', 'Scorpion'
    ];
    
    const found = heroes.filter(h => names.includes(h.name));
    
    const output = found.map(h => ({
      name: h.name,
      image: h.images.lg,
      publisher: h.biography.publisher
    }));
    
    console.log(JSON.stringify(output, null, 2));
  });
});

const fs = require('fs');
let content = fs.readFileSync('data/characters.ts', 'utf8');

const updates = {
  leo: 45,
  mikey: 42,
  donnie: 43,
  raph: 46,
  jason: 55,
  tommy: 60,
  rita: 65,
  ryu: 58,
  chunli: 55,
  mbison: 65,
  scorpion: 68,
  subzero: 68,
  raiden: 85,
  mario: 40,
  bowser: 50,
  peach: 30,
  link: 60,
  zelda: 55,
  ganondorf: 75,
  randi: 50,
  primm: 45,
  popoi: 48,
  spiderman: 65,
  ironman: 85,
  captainamerica: 65,
  thor: 95,
  hulk: 96,
  wolverine: 70,
  deadpool: 68,
  thanos: 99,
  superman: 98,
  batman: 60,
  wonderwoman: 94,
  flash: 95,
  aquaman: 85,
  joker: 25,
  darkseid: 99
};

for (const [id, score] of Object.entries(updates)) {
  const regex = new RegExp(`(id: '${id}',[\\s\\S]*?powerScore: )\\d+`, 'g');
  content = content.replace(regex, `$1${score}`);
}

fs.writeFileSync('data/characters.ts', content);
console.log('Scores updated!');

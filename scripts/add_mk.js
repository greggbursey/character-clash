const fs = require('fs');

const mkCharacters = [
  {
    id: 'scorpion',
    name: 'Scorpion',
    universe: 'Mortal Kombat',
    description: "A resurrected ninja specter seeking vengeance for the death of his family and clan.",
    lore: "Hanzo Hasashi was a member of the Shirai Ryu assassin clan until they were wiped out by the rival Lin Kuei. Resurrected as a hellspawn, he wields a kunai on a rope and hellfire.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/581-scorpion.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&q=80&w=1920',
    color: '#eab308',
    powerScore: 85,
  },
  {
    id: 'subzero',
    name: 'Sub-Zero',
    universe: 'Mortal Kombat',
    description: "A cryomancer ninja from the Lin Kuei clan, capable of controlling ice in many forms.",
    lore: "Kuai Liang took up the mantle of Sub-Zero after his older brother Bi-Han was killed by Scorpion. He seeks to restore honor to the Lin Kuei.",
    previewUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Sub-Zero_John_Tobias_1996_Art.webp/250px-Sub-Zero_John_Tobias_1996_Art.webp.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1517299321609-52687d1bc9e6?auto=format&fit=crop&q=80&w=1920',
    color: '#3b82f6',
    powerScore: 84,
  },
  {
    id: 'raiden',
    name: 'Raiden',
    universe: 'Mortal Kombat',
    description: "The God of Thunder and protector of Earthrealm.",
    lore: "As an immortal god, Raiden guides Earthrealm's champions in the Mortal Kombat tournaments to prevent Shao Kahn from conquering their world.",
    previewUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Raidenmortalkombat.png/250px-Raidenmortalkombat.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1429552077091-836152271555?auto=format&fit=crop&q=80&w=1920',
    color: '#f8fafc',
    powerScore: 95,
  },
  {
    id: 'shangtsung',
    name: 'Shang Tsung',
    universe: 'Mortal Kombat',
    description: "A powerful, soul-stealing sorcerer and host of the Mortal Kombat tournament.",
    lore: "Cursed to consume souls to maintain his youth and power, Shang Tsung serves Shao Kahn and uses his shape-shifting abilities to deceive his enemies.",
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Shang_Tsung_in_Mortal_Kombat_11_%28cropped%29.png/250px-Shang_Tsung_in_Mortal_Kombat_11_%28cropped%29.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920',
    color: '#22c55e',
    powerScore: 90,
  },
  {
    id: 'kano',
    name: 'Kano',
    universe: 'Mortal Kombat',
    description: "A ruthless mercenary and leader of the Black Dragon cartel, known for his cybernetic eye.",
    lore: "A cunning opportunist and weapons dealer, Kano is a long-time enemy of Sonya Blade and the Special Forces, always looking for a profit.",
    previewUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Kano_%28MK%29.png/250px-Kano_%28MK%29.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920',
    color: '#ef4444',
    powerScore: 75,
  },
  {
    id: 'shaokahn',
    name: 'Shao Kahn',
    universe: 'Mortal Kombat',
    description: "The tyrannical emperor of Outworld, seeking to conquer all realms.",
    lore: "A brutal warlord with immense physical strength and dark magic, Shao Kahn wields a massive wrath hammer and demands absolute submission.",
    previewUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Shao_Kahn_2011.png/250px-Shao_Kahn_2011.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920',
    color: '#a855f7',
    powerScore: 98,
  }
];

const fileContent = fs.readFileSync('data/characters.ts', 'utf8');

// Find the end of the array
const arrayEndIndex = fileContent.lastIndexOf('];');

if (arrayEndIndex !== -1) {
  const newContent = fileContent.substring(0, arrayEndIndex) + 
    ',\n' + 
    mkCharacters.map(c => '  ' + JSON.stringify(c, null, 2).split('\\n').join('\n').replace(/\\"/g, '"').replace(/"([^"]+)":/g, '$1:')).join(',\n') + 
    '\n];\n';
    
  fs.writeFileSync('data/characters.ts', newContent);
  console.log('Added MK characters successfully!');
} else {
  console.error('Could not find the end of the characters array.');
}

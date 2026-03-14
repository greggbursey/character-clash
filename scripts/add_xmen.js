const fs = require('fs');

const newCharacters = [
  {
    id: 'colossus',
    name: 'Colossus',
    universe: 'X-Men',
    description: "A mutant who can transform his body into organic steel, granting him immense strength and durability.",
    lore: "Piotr Rasputin is a gentle giant from Russia who uses his powers to protect others as a core member of the X-Men.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/185-colossus.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920',
    color: '#94a3b8',
    powerScore: 82,
  },
  {
    id: 'nightcrawler',
    name: 'Nightcrawler',
    universe: 'X-Men',
    description: "A teleporting mutant with a demonic appearance but a devout and swashbuckling spirit.",
    lore: "Kurt Wagner possesses the ability to teleport himself and others, leaving behind a cloud of brimstone-smelling smoke.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/490-nightcrawler.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920',
    color: '#3b82f6',
    powerScore: 75,
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    universe: 'X-Men',
    description: "A powerful telepath and telekinetic who became the host for the cosmic Phoenix Force.",
    lore: "Jean Grey is one of the most powerful mutants in existence, but her connection to the Phoenix Force makes her a cosmic threat.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/517-phoenix.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920',
    color: '#ef4444',
    powerScore: 100,
  },
  {
    id: 'sabretooth',
    name: 'Sabretooth',
    universe: 'X-Men',
    description: "A feral mutant with a healing factor, razor-sharp claws, and a bloodthirsty nature.",
    lore: "Victor Creed is Wolverine's oldest and deadliest enemy, a brutal killer who embraces his animalistic instincts.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/570-sabretooth.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920',
    color: '#b45309',
    powerScore: 80,
  },
  {
    id: 'juggernaut',
    name: 'Juggernaut',
    universe: 'X-Men',
    description: "An unstoppable force of physical destruction, powered by the Crimson Gem of Cyttorak.",
    lore: "Cain Marko is the stepbrother of Charles Xavier. Once he gains momentum, nothing on Earth can stop him.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/374-juggernaut.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920',
    color: '#7f1d1d',
    powerScore: 92,
  },
  {
    id: 'blackpanther',
    name: 'Black Panther',
    universe: 'Marvel',
    description: "The king and protector of the technologically advanced African nation of Wakanda.",
    lore: "T'Challa uses his genius intellect, physical prowess, and a vibranium suit to protect his people and the world.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/106-black-panther.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920',
    color: '#18181b',
    powerScore: 85,
  },
  {
    id: 'doctorstrange',
    name: 'Doctor Strange',
    universe: 'Marvel',
    description: "The Sorcerer Supreme, Earth's primary protector against magical and mystical threats.",
    lore: "Stephen Strange was a brilliant but arrogant surgeon until a car accident ruined his hands, leading him to discover the mystic arts.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/226-doctor-strange.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920',
    color: '#a855f7',
    powerScore: 94,
  }
];

const fileContent = fs.readFileSync('data/characters.ts', 'utf8');

const arrayEndIndex = fileContent.lastIndexOf('];');

if (arrayEndIndex !== -1) {
  const newContent = fileContent.substring(0, arrayEndIndex) + 
    ',\n' + 
    newCharacters.map(c => '  ' + JSON.stringify(c, null, 2).split('\\n').join('\n').replace(/\\"/g, '"').replace(/"([^"]+)":/g, '$1:')).join(',\n') + 
    '\n];\n';
    
  fs.writeFileSync('data/characters.ts', newContent);
  console.log('Added new characters successfully!');
} else {
  console.error('Could not find the end of the characters array.');
}

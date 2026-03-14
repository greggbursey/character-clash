const fs = require('fs');

const charactersData = [
  // TMNT
  {
    id: 'leo',
    name: 'Leonardo',
    universe: 'TMNT',
    description: "The tactical, courageous leader and devoted student of his sensei, Splinter. Wears a blue mask and wields two katanas.",
    lore: "Leonardo is the leader of the Teenage Mutant Ninja Turtles. He is the most disciplined and skilled in ninjutsu, often bearing the burden of responsibility for his brothers.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/404-leonardo.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=1920',
    color: '#3b82f6',
    powerScore: 45,
  },
  {
    id: 'mikey',
    name: 'Michelangelo',
    universe: 'TMNT',
    description: "The most naturally gifted of the four turtles, but prefers to spend his time goofing off. Wears an orange mask and wields nunchucks.",
    lore: "Michelangelo is the youngest and most relaxed of the Turtles. He loves pizza, skateboarding, and pop culture.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/450-michelangelo.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920',
    color: '#f97316',
    powerScore: 42,
  },
  {
    id: 'donnie',
    name: 'Donatello',
    universe: 'TMNT',
    description: "The scientist, inventor, engineer, and technological genius. Wears a purple mask and wields a bo staff.",
    lore: "Donatello is the brains of the operation. He creates all of the Turtles' gadgets, vehicles, and weapons.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/228-donatello.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920',
    color: '#a855f7',
    powerScore: 43,
  },
  {
    id: 'raph',
    name: 'Raphael',
    universe: 'TMNT',
    description: "The team's bad boy, Raphael wears a red mask and wields a pair of sai. He is physically strong and has an aggressive nature.",
    lore: "Raphael is the hothead of the group. He is fiercely loyal to his brothers but often clashes with Leonardo over leadership.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/541-raphael.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1920',
    color: '#ef4444',
    powerScore: 46,
  },

  // Marvel
  {
    id: 'spiderman',
    name: 'Spider-Man',
    universe: 'Marvel',
    description: "Bitten by a radioactive spider, Peter Parker gained arachnid-like abilities and uses them to protect New York City.",
    lore: "Peter Parker learned that 'with great power, there must also come great responsibility.'",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1920',
    color: '#ef4444',
    powerScore: 65,
  },
  {
    id: 'ironman',
    name: 'Iron Man',
    universe: 'Marvel',
    description: "Genius billionaire Tony Stark fights evil in a high-tech suit of armor of his own design.",
    lore: "Tony Stark is a wealthy industrialist and genius inventor who built a powered suit of armor to escape captivity.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920',
    color: '#eab308',
    powerScore: 85,
  },
  {
    id: 'thor',
    name: 'Thor',
    universe: 'Marvel',
    description: "The Asgardian God of Thunder, wielding the enchanted hammer Mjolnir to protect the Nine Realms.",
    lore: "Thor Odinson is the Asgardian God of Thunder, based on the Norse mythological deity.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920',
    color: '#67e8f9',
    powerScore: 95,
  },
  {
    id: 'hulk',
    name: 'Hulk',
    universe: 'Marvel',
    description: "Exposed to heavy gamma radiation, Dr. Bruce Banner transforms into a giant, raging green monster when provoked.",
    lore: "Dr. Bruce Banner was a brilliant scientist who was caught in the blast of a gamma bomb he created.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920',
    color: '#22c55e',
    powerScore: 96,
  },

  // DC
  {
    id: 'superman',
    name: 'Superman',
    universe: 'DC',
    description: "The Last Son of Krypton, possessing immense strength, flight, and heat vision under a yellow sun.",
    lore: "Born Kal-El on the dying planet Krypton, he was sent to Earth as a baby. Raised as Clark Kent in Smallville.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1449156001935-d28730b967bb?auto=format&fit=crop&q=80&w=1920',
    color: '#3b82f6',
    powerScore: 98,
  },
  {
    id: 'batman',
    name: 'Batman',
    universe: 'DC',
    description: "Billionaire Bruce Wayne fights crime in Gotham City using his intellect, martial arts skills, and advanced gadgets.",
    lore: "After witnessing the murder of his parents as a child, Bruce Wayne swore vengeance against criminals.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920',
    color: '#52525b',
    powerScore: 60,
  },
  {
    id: 'joker',
    name: 'Joker',
    universe: 'DC',
    description: "The Clown Prince of Crime, Batman's arch-nemesis, known for his chaotic and unpredictable nature.",
    lore: "The Joker is a highly intelligent psychopath with a warped, sadistic sense of humor.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920',
    color: '#a855f7',
    powerScore: 25,
  },
];

const output = `export type Character = {
  id: string;
  name: string;
  universe: string;
  description: string;
  lore: string;
  previewUrl: string;
  backgroundUrl: string;
  color: string;
  powerScore: number;
};

export const characters: Character[] = ${JSON.stringify(charactersData, null, 2)};
`;

fs.writeFileSync('data/characters.ts', output);
console.log('Successfully restored original character roster!');

const fs = require('fs');

const charactersData = [
  {
    id: 'leo',
    name: 'Leonardo',
    universe: 'TMNT',
    description: "The tactical, courageous leader and devoted student of his sensei, Splinter. Wears a blue mask and wields two katanas.",
    lore: "Leonardo is the leader of the Teenage Mutant Ninja Turtles. He is the most disciplined and skilled in ninjutsu, often bearing the burden of responsibility for his brothers. His dedication to Splinter's teachings makes him the most spiritual of the group.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/404-leonardo.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=1920', // NYC Night
    color: '#3b82f6',
    powerScore: 45,
  },
  {
    id: 'mikey',
    name: 'Michelangelo',
    universe: 'TMNT',
    description: "The most naturally gifted of the four turtles, but prefers to spend his time goofing off. Wears an orange mask and wields nunchucks.",
    lore: "Michelangelo is the youngest and most relaxed of the Turtles. He loves pizza, skateboarding, and pop culture. Despite his laid-back attitude, he is a formidable fighter and often provides the team with much-needed comic relief.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/450-michelangelo.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920', // Pizza/Kitchen vibe
    color: '#f97316',
    powerScore: 42,
  },
  {
    id: 'donnie',
    name: 'Donatello',
    universe: 'TMNT',
    description: "The scientist, inventor, engineer, and technological genius. Wears a purple mask and wields a bo staff.",
    lore: "Donatello is the brains of the operation. He creates all of the Turtles' gadgets, vehicles, and weapons. He prefers to use his intellect to solve conflicts, but is more than capable of defending himself with his bo staff.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/228-donatello.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920', // Tech/Circuitry
    color: '#a855f7',
    powerScore: 43,
  },
  {
    id: 'raph',
    name: 'Raphael',
    universe: 'TMNT',
    description: "The team's bad boy, Raphael wears a red mask and wields a pair of sai. He is physically strong and has an aggressive nature.",
    lore: "Raphael is the hothead of the group. He is fiercely loyal to his brothers but often clashes with Leonardo over leadership. His aggressive fighting style and cynical outlook mask a deep care for his family.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/541-raphael.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1920', // Gritty Alley
    color: '#ef4444',
    powerScore: 46,
  },
  {
    id: 'spiderman',
    name: 'Spider-Man',
    universe: 'Marvel',
    description: "Bitten by a radioactive spider, Peter Parker gained arachnid-like abilities and uses them to protect New York City.",
    lore: "Peter Parker was a brilliant but socially awkward teenager until a radioactive spider bite granted him superhuman strength, agility, and the ability to cling to walls. After the tragic death of his Uncle Ben, he learned that 'with great power, there must also come great responsibility.'",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1920', // Times Square/NYC
    color: '#ef4444',
    powerScore: 65,
  },
  {
    id: 'ironman',
    name: 'Iron Man',
    universe: 'Marvel',
    description: "Genius billionaire Tony Stark fights evil in a high-tech suit of armor of his own design.",
    lore: "Tony Stark is a wealthy industrialist and genius inventor who was kidnapped and forced to build a devastating weapon. Instead, he built a powered suit of armor to escape. He continually upgrades his armor to protect the world as Iron Man.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920', // High-tech Lab
    color: '#eab308',
    powerScore: 85,
  },
  {
    id: 'captainamerica',
    name: 'Captain America',
    universe: 'Marvel',
    description: "Enhanced to the peak of human perfection by the Super Soldier Serum, Steve Rogers fights for freedom with his indestructible shield.",
    lore: "Steve Rogers was a frail young man who volunteered for an experimental Super Soldier program during World War II. Enhanced to the peak of human potential, he fought against the Axis powers before being frozen in ice for decades. He now leads the Avengers.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1920', // Patriotic/City
    color: '#3b82f6',
    powerScore: 65,
  },
  {
    id: 'thor',
    name: 'Thor',
    universe: 'Marvel',
    description: "The Asgardian God of Thunder, wielding the enchanted hammer Mjolnir to protect the Nine Realms.",
    lore: "Thor Odinson is the Asgardian God of Thunder, based on the Norse mythological deity. He wields the enchanted hammer Mjolnir, which grants him the ability to fly and manipulate weather. He is a founding member of the Avengers.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920', // Asgardian Mountains
    color: '#67e8f9',
    powerScore: 95,
  },
  {
    id: 'hulk',
    name: 'Hulk',
    universe: 'Marvel',
    description: "Exposed to heavy gamma radiation, Dr. Bruce Banner transforms into a giant, raging green monster when provoked.",
    lore: "Dr. Bruce Banner was a brilliant scientist who was caught in the blast of a gamma bomb he created. Now, whenever he experiences intense anger or stress, he transforms into the Hulk, a giant, green-skinned behemoth with limitless physical strength.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920', // Forest/Rage
    color: '#22c55e',
    powerScore: 96,
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    universe: 'Marvel',
    description: "A mutant with a powerful healing factor, enhanced senses, and adamantium-laced skeleton and claws.",
    lore: "James 'Logan' Howlett is a mutant with animal-keen senses, enhanced physical capabilities, a powerful regenerative ability known as a healing factor, and three retractable claws in each hand. His skeleton was laced with the indestructible metal adamantium.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1920', // Wilderness
    color: '#eab308',
    powerScore: 70,
  },
  {
    id: 'deadpool',
    name: 'Deadpool',
    universe: 'Marvel',
    description: "The Merc with a Mouth. A highly skilled mercenary with a regenerative healing factor and a tendency to break the fourth wall.",
    lore: "Wade Wilson is a disfigured mercenary with a superhuman healing factor and physical prowess. He is known for his constant joking, breaking the fourth wall, and his unpredictable, violent nature.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=1920', // Chaos/Action
    color: '#ef4444',
    powerScore: 68,
  },
  {
    id: 'thanos',
    name: 'Thanos',
    universe: 'Marvel',
    description: "The Mad Titan who seeks to collect all six Infinity Stones to impose his twisted will on all of reality.",
    lore: "Thanos is a mutant member of the race of superhumans known as the Titanian Eternals. He is obsessed with death and seeks to acquire the Infinity Stones to wipe out half of all life in the universe to restore balance.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/655-thanos.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1920', // Deep Space
    color: '#a855f7',
    powerScore: 99,
  },
  {
    id: 'superman',
    name: 'Superman',
    universe: 'DC',
    description: "The Last Son of Krypton, possessing immense strength, flight, and heat vision under a yellow sun.",
    lore: "Born Kal-El on the dying planet Krypton, he was sent to Earth as a baby. Raised as Clark Kent in Smallville, he discovered that Earth's yellow sun gives him incredible powers, which he uses to fight for truth, justice, and a better tomorrow.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1449156001935-d28730b967bb?auto=format&fit=crop&q=80&w=1920', // Metropolis Skyline
    color: '#3b82f6',
    powerScore: 98,
  },
  {
    id: 'batman',
    name: 'Batman',
    universe: 'DC',
    description: "Billionaire Bruce Wayne fights crime in Gotham City using his intellect, martial arts skills, and advanced gadgets.",
    lore: "After witnessing the murder of his parents as a child, Bruce Wayne swore vengeance against criminals. He trained his mind and body to perfection and adopted a bat-inspired persona to strike terror into the hearts of Gotham City's underworld.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920', // Gotham City
    color: '#52525b',
    powerScore: 60,
  },
  {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    universe: 'DC',
    description: "Princess Diana of Themyscira, an Amazonian warrior with superhuman strength and the Lasso of Truth.",
    lore: "Diana is an Amazon princess from the island of Themyscira. She was sculpted from clay by her mother Queen Hippolyta and given life by Aphrodite. She serves as an emissary to the world of men, fighting for peace and equality.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920', // Ancient/Themyscira
    color: '#eab308',
    powerScore: 94,
  },
  {
    id: 'flash',
    name: 'The Flash',
    universe: 'DC',
    description: "Barry Allen, the Fastest Man Alive, taps into the Speed Force to move at superhuman speeds.",
    lore: "Barry Allen was a police forensic scientist who was struck by lightning and doused in chemicals. This accident gave him the ability to tap into the Speed Force, granting him superhuman speed, reflexes, and the ability to time travel.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1920', // Speed/Tech
    color: '#ef4444',
    powerScore: 95,
  },
  {
    id: 'aquaman',
    name: 'Aquaman',
    universe: 'DC',
    description: "Arthur Curry, the King of Atlantis, who can command sea life and possesses superhuman strength and durability.",
    lore: "Arthur Curry is the half-human, half-Atlantean king of Atlantis. He possesses superhuman strength, the ability to breathe underwater, and the power to communicate with and command all marine life.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/38-aquaman.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1920', // Underwater/Atlantis
    color: '#f97316',
    powerScore: 85,
  },
  {
    id: 'joker',
    name: 'Joker',
    universe: 'DC',
    description: "The Clown Prince of Crime, Batman's arch-nemesis, known for his chaotic and unpredictable nature.",
    lore: "The Joker is a highly intelligent psychopath with a warped, sadistic sense of humor. His origins are shrouded in mystery, but he is Batman's greatest enemy, constantly seeking to prove that anyone can be driven insane by one bad day.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920', // Chaos/Carnival
    color: '#a855f7',
    powerScore: 25,
  },
  {
    id: 'darkseid',
    name: 'Darkseid',
    universe: 'DC',
    description: "The tyrannical ruler of Apokolips, seeking the Anti-Life Equation to control all sentient life in the universe.",
    lore: "Darkseid is the ruler of the planet Apokolips and one of the most powerful beings in the DC Universe. His ultimate goal is to conquer the universe and eliminate all free will by discovering the mysterious Anti-Life Equation.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/204-darkseid.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920', // Apocalypse/Space
    color: '#52525b',
    powerScore: 99,
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
console.log('Successfully updated characters with thematic backgrounds from Unsplash!');

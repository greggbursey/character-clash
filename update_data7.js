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

  // Mortal Kombat
  {
    id: 'scorpion',
    name: 'Scorpion',
    universe: 'Mortal Kombat',
    description: "A resurrected ninja specter seeking revenge for the death of his family and clan.",
    lore: "Hanzo Hasashi was a member of the Shirai Ryu clan until he was killed by Sub-Zero. He was resurrected as Scorpion.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/581-scorpion.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920', // Fire/Hell
    color: '#eab308',
    powerScore: 88,
  },
  {
    id: 'subzero',
    name: 'Sub-Zero',
    universe: 'Mortal Kombat',
    description: "Grandmaster of the Lin Kuei clan, wielding the power of ice and cold.",
    lore: "Kuai Liang is the second Sub-Zero, taking the mantle after his brother Bi-Han was killed.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/630-sub-zero.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1920', // Ice/Snow
    color: '#0ea5e9',
    powerScore: 87,
  },

  // Street Fighter
  {
    id: 'ryu',
    name: 'Ryu',
    universe: 'Street Fighter',
    description: "A wandering martial artist dedicated to the path of the warrior and mastering the Ansatsuken style.",
    lore: "Ryu travels the world to test his skills against the strongest fighters, constantly struggling against the Satsui no Hado.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/569-ryu.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&q=80&w=1920', // Japan Temple
    color: '#ffffff',
    powerScore: 82,
  },
  {
    id: 'chunli',
    name: 'Chun-Li',
    universe: 'Street Fighter',
    description: "An Interpol officer seeking justice for her father's murder at the hands of M. Bison.",
    lore: "Known as the 'Strongest Woman in the World,' Chun-Li is a master of Chinese martial arts and famous for her lightning kicks.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/171-chun-li.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1920', // China Street
    color: '#3b82f6',
    powerScore: 80,
  },

  // Tekken
  {
    id: 'jin',
    name: 'Jin Kazama',
    universe: 'Tekken',
    description: "The protagonist of the Tekken series, cursed with the Devil Gene and seeking to end his bloodline.",
    lore: "Jin is the son of Kazuya Mishima and Jun Kazama. He hates the Mishima bloodline and fights to destroy the Devil within him.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/367-jin-kazama.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920', // Dark City
    color: '#ef4444',
    powerScore: 90,
  },

  // Nintendo
  {
    id: 'mario',
    name: 'Mario',
    universe: 'Nintendo',
    description: "The legendary hero of the Mushroom Kingdom, known for his jumping skills and bravery.",
    lore: "Mario is a plumber who constantly saves Princess Peach from the clutches of Bowser.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/431-mario.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=1920', // Mushroom/Castle
    color: '#ef4444',
    powerScore: 75,
  },
  {
    id: 'link',
    name: 'Link',
    universe: 'Nintendo',
    description: "The Hero of Time, wielder of the Master Sword and protector of the kingdom of Hyrule.",
    lore: "Link is the chosen hero who repeatedly saves Zelda and Hyrule from the evil Ganon.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/407-link.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1920', // Hyrule Forest
    color: '#22c55e',
    powerScore: 85,
  },

  // Final Fantasy
  {
    id: 'cloud',
    name: 'Cloud Strife',
    universe: 'Final Fantasy',
    description: "A former SOLDIER turned mercenary, wielding the massive Buster Sword against the Shinra Corporation.",
    lore: "Cloud is the protagonist of Final Fantasy VII. He struggles with his past and identity while fighting to save the Planet.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/176-cloud-strife.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1920', // Midgar/Industrial
    color: '#a855f7',
    powerScore: 92,
  },
  {
    id: 'sephiroth',
    name: 'Sephiroth',
    universe: 'Final Fantasy',
    description: "The legendary SOLDIER who fell into madness after discovering his origins as a biological experiment.",
    lore: "Sephiroth is the main antagonist of Final Fantasy VII. He seeks to become a god by absorbing the Planet's Lifestream.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/589-sephiroth.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920', // Fire/Destruction
    color: '#52525b',
    powerScore: 98,
  },

  // Real Life
  {
    id: 'brucelee',
    name: 'Bruce Lee',
    universe: 'Legends',
    description: "The most influential martial artist of all time and the founder of Jeet Kune Do.",
    lore: "Bruce Lee was a philosopher, actor, and martial arts master who bridged the gap between East and West.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/130-bruce-lee.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=1920', // Dojo
    color: '#eab308',
    powerScore: 95,
  },
  {
    id: 'miketyson',
    name: 'Mike Tyson',
    universe: 'Legends',
    description: "The 'Baddest Man on the Planet,' a former undisputed heavyweight boxing champion.",
    lore: "Tyson was known for his ferocious and intimidating boxing style as well as his controversial behavior.",
    previewUrl: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=400', // Boxing Ring
    backgroundUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=1920', // Arena
    color: '#52525b',
    powerScore: 92,
  },
  {
    id: 'chucknorris',
    name: 'Chuck Norris',
    universe: 'Legends',
    description: "Martial arts master, actor, and the subject of countless internet facts about his impossible strength.",
    lore: "Chuck Norris doesn't sleep; he waits. He is a master of Tang Soo Do and Chun Kuk Do.",
    previewUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/172-chuck-norris.jpg',
    backgroundUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920', // Desert/Texas
    color: '#f97316',
    powerScore: 100,
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
console.log('Successfully expanded character roster with new universes and legends!');

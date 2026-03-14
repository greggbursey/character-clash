const fs = require('fs');

const charactersData = [
  {
    id: 'leo',
    name: 'Leonardo',
    universe: 'TMNT',
    description: "The tactical, courageous leader and devoted student of his sensei, Splinter. Wears a blue mask and wields two katanas.",
    lore: "Leonardo is the leader of the Teenage Mutant Ninja Turtles. He is the most disciplined and skilled in ninjutsu, often bearing the burden of responsibility for his brothers. His dedication to Splinter's teachings makes him the most spiritual of the group.",
    color: '#3b82f6',
    powerScore: 45,
  },
  {
    id: 'mikey',
    name: 'Michelangelo',
    universe: 'TMNT',
    description: "The most naturally gifted of the four turtles, but prefers to spend his time goofing off. Wears an orange mask and wields nunchucks.",
    lore: "Michelangelo is the youngest and most relaxed of the Turtles. He loves pizza, skateboarding, and pop culture. Despite his laid-back attitude, he is a formidable fighter and often provides the team with much-needed comic relief.",
    color: '#f97316',
    powerScore: 42,
  },
  {
    id: 'donnie',
    name: 'Donatello',
    universe: 'TMNT',
    description: "The scientist, inventor, engineer, and technological genius. Wears a purple mask and wields a bo staff.",
    lore: "Donatello is the brains of the operation. He creates all of the Turtles' gadgets, vehicles, and weapons. He prefers to use his intellect to solve conflicts, but is more than capable of defending himself with his bo staff.",
    color: '#a855f7',
    powerScore: 43,
  },
  {
    id: 'raph',
    name: 'Raphael',
    universe: 'TMNT',
    description: "The team's bad boy, Raphael wears a red mask and wields a pair of sai. He is physically strong and has an aggressive nature.",
    lore: "Raphael is the hothead of the group. He is fiercely loyal to his brothers but often clashes with Leonardo over leadership. His aggressive fighting style and cynical outlook mask a deep care for his family.",
    color: '#ef4444',
    powerScore: 46,
  },
  {
    id: 'jason',
    name: 'Jason Lee Scott',
    universe: 'Power Rangers',
    description: "The original Red Ranger and leader of the Mighty Morphin Power Rangers. A skilled martial artist with a strong sense of justice.",
    lore: "Jason was chosen by Zordon to lead the original Power Rangers. He commands the Tyrannosaurus Dinozord and wields the Power Sword. He is a natural leader and a dedicated martial artist.",
    color: '#ef4444',
    powerScore: 55,
  },
  {
    id: 'tommy',
    name: 'Tommy Oliver',
    universe: 'Power Rangers',
    description: "Originally the evil Green Ranger, he broke free from Rita's spell to become the greatest Power Ranger of all time.",
    lore: "Tommy Oliver started as an enemy of the Power Rangers, brainwashed by Rita Repulsa. After being freed, he joined the team and eventually became their leader as the White Ranger, and later the Red Zeo and Red Turbo Ranger.",
    color: '#22c55e',
    powerScore: 60,
  },
  {
    id: 'rita',
    name: 'Rita Repulsa',
    universe: 'Power Rangers',
    description: "An evil humanoid alien witch bent on galactic domination. She was imprisoned in a space dumpster for 10,000 years.",
    lore: "Rita Repulsa is a powerful sorceress who seeks to conquer Earth. She commands an army of Putty Patrollers and various monsters, often using her magic wand to make them grow to giant size to battle the Power Rangers' Megazord.",
    color: '#a855f7',
    powerScore: 65,
  },
  {
    id: 'ryu',
    name: 'Ryu',
    universe: 'Street Fighter',
    description: "A wandering martial artist who seeks to become the strongest. Known for his signature Hadouken and Shoryuken techniques.",
    lore: "Ryu is the main protagonist of the Street Fighter series. He travels the world to participate in the World Warrior tournament, seeking to perfect his martial arts skills and overcome the dark energy known as the Satsui no Hado.",
    color: '#f87171',
    powerScore: 58,
  },
  {
    id: 'chunli',
    name: 'Chun-Li',
    universe: 'Street Fighter',
    description: "An expert martial artist and Interpol officer who relentlessly seeks revenge for the death of her father at the hands of M. Bison.",
    lore: "Chun-Li is the first female playable character in a fighting game. She is an Interpol officer who uses her powerful kicks, including her signature Lightning Kick, to fight the Shadaloo crime syndicate and avenge her father.",
    color: '#3b82f6',
    powerScore: 55,
  },
  {
    id: 'mbison',
    name: 'M. Bison',
    universe: 'Street Fighter',
    description: "The ruthless dictator and leader of the Shadaloo crime syndicate. He wields a dark energy known as Psycho Power.",
    lore: "M. Bison is the primary antagonist of the Street Fighter series. He is a megalomaniacal dictator who seeks world domination. He utilizes Psycho Power, a dark energy that enhances his physical abilities and allows him to teleport and fly.",
    color: '#dc2626',
    powerScore: 65,
  },
  {
    id: 'scorpion',
    name: 'Scorpion',
    universe: 'Mortal Kombat',
    description: "A resurrected ninja specter seeking vengeance for the death of his family and clan. Famous for his kunai spear and \"Get over here!\" catchphrase.",
    lore: "Hanzo Hasashi was a member of the Shirai Ryu clan until he and his family were killed by Sub-Zero of the rival Lin Kuei clan. Resurrected by the sorcerer Quan Chi, he became the hell-spawned specter Scorpion, driven by revenge.",
    color: '#eab308',
    powerScore: 68,
  },
  {
    id: 'subzero',
    name: 'Sub-Zero',
    universe: 'Mortal Kombat',
    description: "A cryomancer ninja from the Lin Kuei clan. He has the ability to control ice in many forms.",
    lore: "There are two incarnations of Sub-Zero: Bi-Han and Kuai Liang. Both are cryomancers from the Lin Kuei clan. Kuai Liang took up the mantle after his older brother Bi-Han was killed by Scorpion, seeking to restore the honor of his clan.",
    color: '#0ea5e9',
    powerScore: 68,
  },
  {
    id: 'raiden',
    name: 'Raiden',
    universe: 'Mortal Kombat',
    description: "The God of Thunder and Protector of Earthrealm. He guides Earth's warriors against the forces of Outworld and the Netherrealm.",
    lore: "Raiden is an eternal God of Thunder who protects Earthrealm from various threats. He often serves as a mentor to the Earthrealm warriors, using his vast knowledge and electrical powers to aid them in the Mortal Kombat tournaments.",
    color: '#67e8f9',
    powerScore: 85,
  },
  {
    id: 'mario',
    name: 'Mario',
    universe: 'Super Mario',
    description: "The heroic plumber of the Mushroom Kingdom. Always ready to leap into action to save Princess Peach from Bowser.",
    lore: "Mario is the iconic mascot of Nintendo. He is a cheerful and courageous plumber who frequently embarks on adventures to rescue Princess Peach from the villainous Bowser. He is known for his jumping abilities and use of power-ups.",
    color: '#ef4444',
    powerScore: 40,
  },
  {
    id: 'bowser',
    name: 'Bowser',
    universe: 'Super Mario',
    description: "The King of the Koopas and Mario's arch-nemesis. He constantly tries to conquer the Mushroom Kingdom.",
    lore: "Bowser is the primary antagonist of the Mario franchise. He is a large, powerful, fire-breathing Koopa who repeatedly kidnaps Princess Peach in his quest to take over the Mushroom Kingdom. Despite his villainy, he sometimes teams up with Mario.",
    color: '#22c55e',
    powerScore: 50,
  },
  {
    id: 'peach',
    name: 'Princess Peach',
    universe: 'Super Mario',
    description: "The benevolent ruler of the Mushroom Kingdom. Though often kidnapped, she is a capable leader and sometimes a fierce competitor.",
    lore: "Princess Peach is the ruler of the Mushroom Kingdom. While she is frequently kidnapped by Bowser, she is also a capable heroine in her own right, possessing magical abilities and participating in various sports and kart races.",
    color: '#f472b6',
    powerScore: 30,
  },
  {
    id: 'link',
    name: 'Link',
    universe: 'Zelda',
    description: "The chosen hero of Hyrule, bearer of the Triforce of Courage. He wields the Master Sword to defeat evil.",
    lore: "Link is the silent protagonist of The Legend of Zelda series. He is an incarnation of the legendary hero chosen by the goddesses to protect Hyrule and the Triforce from the evil Ganondorf. He is a master swordsman and puzzle solver.",
    color: '#22c55e',
    powerScore: 60,
  },
  {
    id: 'zelda',
    name: 'Princess Zelda',
    universe: 'Zelda',
    description: "The wise princess of Hyrule and bearer of the Triforce of Wisdom. She possesses powerful magical abilities.",
    lore: "Princess Zelda is the mortal reincarnation of the goddess Hylia and the ruler of Hyrule. She is a wise and powerful magic user who often aids Link in his quest to defeat Ganondorf and protect the kingdom.",
    color: '#f472b6',
    powerScore: 55,
  },
  {
    id: 'ganondorf',
    name: 'Ganondorf',
    universe: 'Zelda',
    description: "The King of Evil and bearer of the Triforce of Power. He seeks to conquer Hyrule and plunge the world into darkness.",
    lore: "Ganondorf is the primary antagonist of The Legend of Zelda series. He is the Gerudo King of Thieves who seeks the Triforce to conquer Hyrule. He is a powerful sorcerer and swordsman, often transforming into the beast Ganon.",
    color: '#b91c1c',
    powerScore: 75,
  },
  {
    id: 'randi',
    name: 'Randi',
    universe: 'Secret of Mana',
    description: "A young boy who accidentally draws the legendary Mana Sword and is banished from his village. He sets out to restore the sword's power.",
    lore: "Randi is an orphan who accidentally discovers the rusted Mana Sword. After pulling it from its stone, he is banished from his village and embarks on a quest to re-energize the sword and stop the Empire from conquering the world.",
    color: '#f97316',
    powerScore: 50,
  },
  {
    id: 'primm',
    name: 'Primm',
    universe: 'Secret of Mana',
    description: "A noblewoman from Pandora who rebels against her arranged marriage. She joins Randi to rescue her beloved Dyluck.",
    lore: "Primm is a headstrong noblewoman who runs away from home to rescue her kidnapped sweetheart, Dyluck. She joins Randi on his quest, bringing her skills in martial arts and defensive magic to the team.",
    color: '#f472b6',
    powerScore: 45,
  },
  {
    id: 'popoi',
    name: 'Popoi',
    universe: 'Secret of Mana',
    description: "An amnesiac sprite from the Dwarf Village. Mischievous and magical, Popoi joins the quest to recover lost memories and save the world.",
    lore: "Popoi is a mischievous sprite who lost their memory after a flood. They join Randi and Primm to recover their past and use their powerful offensive magic to aid in the battle against the Empire.",
    color: '#a3e635',
    powerScore: 48,
  },
  {
    id: 'spiderman',
    name: 'Spider-Man',
    universe: 'Marvel',
    description: "Bitten by a radioactive spider, Peter Parker gained arachnid-like abilities and uses them to protect New York City.",
    lore: "Peter Parker was a brilliant but socially awkward teenager until a radioactive spider bite granted him superhuman strength, agility, and the ability to cling to walls. After the tragic death of his Uncle Ben, he learned that 'with great power, there must also come great responsibility.'",
    color: '#ef4444',
    powerScore: 65,
  },
  {
    id: 'ironman',
    name: 'Iron Man',
    universe: 'Marvel',
    description: "Genius billionaire Tony Stark fights evil in a high-tech suit of armor of his own design.",
    lore: "Tony Stark is a wealthy industrialist and genius inventor who was kidnapped and forced to build a devastating weapon. Instead, he built a powered suit of armor to escape. He continually upgrades his armor to protect the world as Iron Man.",
    color: '#eab308',
    powerScore: 85,
  },
  {
    id: 'captainamerica',
    name: 'Captain America',
    universe: 'Marvel',
    description: "Enhanced to the peak of human perfection by the Super Soldier Serum, Steve Rogers fights for freedom with his indestructible shield.",
    lore: "Steve Rogers was a frail young man who volunteered for an experimental Super Soldier program during World War II. Enhanced to the peak of human potential, he fought against the Axis powers before being frozen in ice for decades. He now leads the Avengers.",
    color: '#3b82f6',
    powerScore: 65,
  },
  {
    id: 'thor',
    name: 'Thor',
    universe: 'Marvel',
    description: "The Asgardian God of Thunder, wielding the enchanted hammer Mjolnir to protect the Nine Realms.",
    lore: "Thor Odinson is the Asgardian God of Thunder, based on the Norse mythological deity. He wields the enchanted hammer Mjolnir, which grants him the ability to fly and manipulate weather. He is a founding member of the Avengers.",
    color: '#67e8f9',
    powerScore: 95,
  },
  {
    id: 'hulk',
    name: 'Hulk',
    universe: 'Marvel',
    description: "Exposed to heavy gamma radiation, Dr. Bruce Banner transforms into a giant, raging green monster when provoked.",
    lore: "Dr. Bruce Banner was a brilliant scientist who was caught in the blast of a gamma bomb he created. Now, whenever he experiences intense anger or stress, he transforms into the Hulk, a giant, green-skinned behemoth with limitless physical strength.",
    color: '#22c55e',
    powerScore: 96,
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    universe: 'Marvel',
    description: "A mutant with a powerful healing factor, enhanced senses, and adamantium-laced skeleton and claws.",
    lore: "James 'Logan' Howlett is a mutant with animal-keen senses, enhanced physical capabilities, a powerful regenerative ability known as a healing factor, and three retractable claws in each hand. His skeleton was laced with the indestructible metal adamantium.",
    color: '#eab308',
    powerScore: 70,
  },
  {
    id: 'deadpool',
    name: 'Deadpool',
    universe: 'Marvel',
    description: "The Merc with a Mouth. A highly skilled mercenary with a regenerative healing factor and a tendency to break the fourth wall.",
    lore: "Wade Wilson is a disfigured mercenary with a superhuman healing factor and physical prowess. He is known for his constant joking, breaking the fourth wall, and his unpredictable, violent nature.",
    color: '#ef4444',
    powerScore: 68,
  },
  {
    id: 'thanos',
    name: 'Thanos',
    universe: 'Marvel',
    description: "The Mad Titan who seeks to collect all six Infinity Stones to impose his twisted will on all of reality.",
    lore: "Thanos is a mutant member of the race of superhumans known as the Titanian Eternals. He is obsessed with death and seeks to acquire the Infinity Stones to wipe out half of all life in the universe to restore balance.",
    color: '#a855f7',
    powerScore: 99,
  },
  {
    id: 'superman',
    name: 'Superman',
    universe: 'DC',
    description: "The Last Son of Krypton, possessing immense strength, flight, and heat vision under a yellow sun.",
    lore: "Born Kal-El on the dying planet Krypton, he was sent to Earth as a baby. Raised as Clark Kent in Smallville, he discovered that Earth's yellow sun gives him incredible powers, which he uses to fight for truth, justice, and a better tomorrow.",
    color: '#3b82f6',
    powerScore: 98,
  },
  {
    id: 'batman',
    name: 'Batman',
    universe: 'DC',
    description: "Billionaire Bruce Wayne fights crime in Gotham City using his intellect, martial arts skills, and advanced gadgets.",
    lore: "After witnessing the murder of his parents as a child, Bruce Wayne swore vengeance against criminals. He trained his mind and body to perfection and adopted a bat-inspired persona to strike terror into the hearts of Gotham City's underworld.",
    color: '#52525b',
    powerScore: 60,
  },
  {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    universe: 'DC',
    description: "Princess Diana of Themyscira, an Amazonian warrior with superhuman strength and the Lasso of Truth.",
    lore: "Diana is an Amazon princess from the island of Themyscira. She was sculpted from clay by her mother Queen Hippolyta and given life by Aphrodite. She serves as an emissary to the world of men, fighting for peace and equality.",
    color: '#eab308',
    powerScore: 94,
  },
  {
    id: 'flash',
    name: 'The Flash',
    universe: 'DC',
    description: "Barry Allen, the Fastest Man Alive, taps into the Speed Force to move at superhuman speeds.",
    lore: "Barry Allen was a police forensic scientist who was struck by lightning and doused in chemicals. This accident gave him the ability to tap into the Speed Force, granting him superhuman speed, reflexes, and the ability to time travel.",
    color: '#ef4444',
    powerScore: 95,
  },
  {
    id: 'aquaman',
    name: 'Aquaman',
    universe: 'DC',
    description: "Arthur Curry, the King of Atlantis, who can command sea life and possesses superhuman strength and durability.",
    lore: "Arthur Curry is the half-human, half-Atlantean king of Atlantis. He possesses superhuman strength, the ability to breathe underwater, and the power to communicate with and command all marine life.",
    color: '#f97316',
    powerScore: 85,
  },
  {
    id: 'joker',
    name: 'Joker',
    universe: 'DC',
    description: "The Clown Prince of Crime, Batman's arch-nemesis, known for his chaotic and unpredictable nature.",
    lore: "The Joker is a highly intelligent psychopath with a warped, sadistic sense of humor. His origins are shrouded in mystery, but he is Batman's greatest enemy, constantly seeking to prove that anyone can be driven insane by one bad day.",
    color: '#a855f7',
    powerScore: 25,
  },
  {
    id: 'darkseid',
    name: 'Darkseid',
    universe: 'DC',
    description: "The tyrannical ruler of Apokolips, seeking the Anti-Life Equation to control all sentient life in the universe.",
    lore: "Darkseid is the ruler of the planet Apokolips and one of the most powerful beings in the DC Universe. His ultimate goal is to conquer the universe and eliminate all free will by discovering the mysterious Anti-Life Equation.",
    color: '#52525b',
    powerScore: 99,
  },
];

const processedData = charactersData.map(char => {
  // 1. Reliable Avatar: ui-avatars.com generates initials with the character's exact color
  const hexColor = char.color.replace('#', '');
  const previewUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(char.name)}&background=${hexColor}&color=fff&size=400&bold=true&font-size=0.4`;
  
  // 2. Reliable Background: SVG Data URI with a beautiful gradient and the universe name as a watermark
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${char.color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#111827" stop-opacity="1"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="180" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.05" transform="rotate(-15, 960, 540)">${char.universe}</text>
  </svg>`;
  
  // Base64 encode the SVG to ensure it works perfectly in all browsers without escaping issues
  const backgroundUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return {
    ...char,
    previewUrl,
    backgroundUrl
  };
});

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

export const characters: Character[] = ${JSON.stringify(processedData, null, 2)};
`;

fs.writeFileSync('data/characters.ts', output);
console.log('Successfully updated characters with 100% reliable SVG and UI-Avatar images!');

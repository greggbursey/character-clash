import https from 'https';
import fs from 'fs';

function searchBing(query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = 'https://www.bing.com/images/search?q=' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/murl&quot;:&quot;(.*?)&quot;/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          resolve('https://picsum.photos/seed/' + encodeURIComponent(query) + '/1920/1080');
        }
      });
    }).on('error', reject);
  });
}

const characters = [
  { id: 'leo', name: 'Leonardo', universe: 'TMNT', color: '#3b82f6', powerScore: 75, desc: "The tactical, courageous leader and devoted student of his sensei, Splinter. Wears a blue mask and wields two katanas." },
  { id: 'mikey', name: 'Michelangelo', universe: 'TMNT', color: '#f97316', powerScore: 73, desc: "The most naturally gifted of the four turtles, but prefers to spend his time goofing off. Wears an orange mask and wields nunchucks." },
  { id: 'donnie', name: 'Donatello', universe: 'TMNT', color: '#a855f7', powerScore: 74, desc: "The scientist, inventor, engineer, and technological genius. Wears a purple mask and wields a bo staff." },
  { id: 'raph', name: 'Raphael', universe: 'TMNT', color: '#ef4444', powerScore: 76, desc: "The team's bad boy, Raphael wears a red mask and wields a pair of sai. He is physically strong and has an aggressive nature." },
  { id: 'jason', name: 'Jason Lee Scott', universe: 'Power Rangers', color: '#ef4444', powerScore: 80, desc: "The original Red Ranger and leader of the Mighty Morphin Power Rangers. A skilled martial artist with a strong sense of justice." },
  { id: 'tommy', name: 'Tommy Oliver', universe: 'Power Rangers', color: '#22c55e', powerScore: 85, desc: "Originally the evil Green Ranger, he broke free from Rita's spell to become the greatest Power Ranger of all time." },
  { id: 'rita', name: 'Rita Repulsa', universe: 'Power Rangers', color: '#a855f7', powerScore: 82, desc: "An evil humanoid alien witch bent on galactic domination. She was imprisoned in a space dumpster for 10,000 years." },
  { id: 'ryu', name: 'Ryu', universe: 'Street Fighter', color: '#f87171', powerScore: 88, desc: "A wandering martial artist who seeks to become the strongest. Known for his signature Hadouken and Shoryuken techniques." },
  { id: 'chunli', name: 'Chun-Li', universe: 'Street Fighter', color: '#3b82f6', powerScore: 85, desc: "An expert martial artist and Interpol officer who relentlessly seeks revenge for the death of her father at the hands of M. Bison." },
  { id: 'mbison', name: 'M. Bison', universe: 'Street Fighter', color: '#dc2626', powerScore: 92, desc: "The ruthless dictator and leader of the Shadaloo crime syndicate. He wields a dark energy known as Psycho Power." },
  { id: 'scorpion', name: 'Scorpion', universe: 'Mortal Kombat', color: '#eab308', powerScore: 90, desc: "A resurrected ninja specter seeking vengeance for the death of his family and clan. Famous for his kunai spear and \"Get over here!\" catchphrase." },
  { id: 'subzero', name: 'Sub-Zero', universe: 'Mortal Kombat', color: '#0ea5e9', powerScore: 90, desc: "A cryomancer ninja from the Lin Kuei clan. He has the ability to control ice in many forms." },
  { id: 'raiden', name: 'Raiden', universe: 'Mortal Kombat', color: '#67e8f9', powerScore: 96, desc: "The God of Thunder and Protector of Earthrealm. He guides Earth's warriors against the forces of Outworld and the Netherrealm." },
  { id: 'mario', name: 'Mario', universe: 'Super Mario', color: '#ef4444', powerScore: 80, desc: "The heroic plumber of the Mushroom Kingdom. Always ready to leap into action to save Princess Peach from Bowser." },
  { id: 'bowser', name: 'Bowser', universe: 'Super Mario', color: '#22c55e', powerScore: 85, desc: "The King of the Koopas and Mario's arch-nemesis. He constantly tries to conquer the Mushroom Kingdom." },
  { id: 'peach', name: 'Princess Peach', universe: 'Super Mario', color: '#f472b6', powerScore: 70, desc: "The benevolent ruler of the Mushroom Kingdom. Though often kidnapped, she is a capable leader and sometimes a fierce competitor." },
  { id: 'link', name: 'Link', universe: 'Zelda', color: '#22c55e', powerScore: 88, desc: "The chosen hero of Hyrule, bearer of the Triforce of Courage. He wields the Master Sword to defeat evil." },
  { id: 'zelda', name: 'Princess Zelda', universe: 'Zelda', color: '#f472b6', powerScore: 85, desc: "The wise princess of Hyrule and bearer of the Triforce of Wisdom. She possesses powerful magical abilities." },
  { id: 'ganondorf', name: 'Ganondorf', universe: 'Zelda', color: '#b91c1c', powerScore: 95, desc: "The King of Evil and bearer of the Triforce of Power. He seeks to conquer Hyrule and plunge the world into darkness." },
  { id: 'randi', name: 'Randi', universe: 'Secret of Mana', color: '#f97316', powerScore: 82, desc: "A young boy who accidentally draws the legendary Mana Sword and is banished from his village. He sets out to restore the sword's power." },
  { id: 'primm', name: 'Primm', universe: 'Secret of Mana', color: '#f472b6', powerScore: 78, desc: "A noblewoman from Pandora who rebels against her arranged marriage. She joins Randi to rescue her beloved Dyluck." },
  { id: 'popoi', name: 'Popoi', universe: 'Secret of Mana', color: '#a3e635', powerScore: 80, desc: "An amnesiac sprite from the Dwarf Village. Mischievous and magical, Popoi joins the quest to recover lost memories and save the world." },
  { id: 'spiderman', name: 'Spider-Man', universe: 'Marvel', color: '#ef4444', powerScore: 88, desc: "Bitten by a radioactive spider, Peter Parker gained arachnid-like abilities and uses them to protect New York City." },
  { id: 'ironman', name: 'Iron Man', universe: 'Marvel', color: '#eab308', powerScore: 92, desc: "Genius billionaire Tony Stark fights evil in a high-tech suit of armor of his own design." },
  { id: 'captainamerica', name: 'Captain America', universe: 'Marvel', color: '#3b82f6', powerScore: 86, desc: "Enhanced to the peak of human perfection by the Super Soldier Serum, Steve Rogers fights for freedom with his indestructible shield." },
  { id: 'thor', name: 'Thor', universe: 'Marvel', color: '#67e8f9', powerScore: 97, desc: "The Asgardian God of Thunder, wielding the enchanted hammer Mjolnir to protect the Nine Realms." },
  { id: 'hulk', name: 'Hulk', universe: 'Marvel', color: '#22c55e', powerScore: 98, desc: "Exposed to heavy gamma radiation, Dr. Bruce Banner transforms into a giant, raging green monster when provoked." },
  { id: 'wolverine', name: 'Wolverine', universe: 'Marvel', color: '#eab308', powerScore: 89, desc: "A mutant with a powerful healing factor, enhanced senses, and adamantium-laced skeleton and claws." },
  { id: 'deadpool', name: 'Deadpool', universe: 'Marvel', color: '#ef4444', powerScore: 87, desc: "The Merc with a Mouth. A highly skilled mercenary with a regenerative healing factor and a tendency to break the fourth wall." },
  { id: 'thanos', name: 'Thanos', universe: 'Marvel', color: '#a855f7', powerScore: 99, desc: "The Mad Titan who seeks to collect all six Infinity Stones to impose his twisted will on all of reality." },
  { id: 'superman', name: 'Superman', universe: 'DC', color: '#3b82f6', powerScore: 98, desc: "The Last Son of Krypton, possessing immense strength, flight, and heat vision under a yellow sun." },
  { id: 'batman', name: 'Batman', universe: 'DC', color: '#52525b', powerScore: 85, desc: "Billionaire Bruce Wayne fights crime in Gotham City using his intellect, martial arts skills, and advanced gadgets." },
  { id: 'wonderwoman', name: 'Wonder Woman', universe: 'DC', color: '#eab308', powerScore: 95, desc: "Princess Diana of Themyscira, an Amazonian warrior with superhuman strength and the Lasso of Truth." },
  { id: 'flash', name: 'The Flash', universe: 'DC', color: '#ef4444', powerScore: 96, desc: "Barry Allen, the Fastest Man Alive, taps into the Speed Force to move at superhuman speeds." },
  { id: 'aquaman', name: 'Aquaman', universe: 'DC', color: '#f97316', powerScore: 90, desc: "Arthur Curry, the King of Atlantis, who can command sea life and possesses superhuman strength and durability." },
  { id: 'joker', name: 'Joker', universe: 'DC', color: '#a855f7', powerScore: 75, desc: "The Clown Prince of Crime, Batman's arch-nemesis, known for his chaotic and unpredictable nature." },
  { id: 'darkseid', name: 'Darkseid', universe: 'DC', color: '#52525b', powerScore: 99, desc: "The tyrannical ruler of Apokolips, seeking the Anti-Life Equation to control all sentient life in the universe." }
];

async function run() {
  let output = `export type Character = {
  id: string;
  name: string;
  universe: string;
  description: string;
  previewUrl: string;
  backgroundUrl: string;
  color: string;
  powerScore: number;
};

export const characters: Character[] = [\n`;

  for (const char of characters) {
    console.log('Fetching', char.name);
    const previewUrl = await searchBing(`${char.name} ${char.universe} portrait site:fandom.com`);
    const backgroundUrl = await searchBing(`${char.name} ${char.universe} wallpaper hd`);
    
    output += `  {
    id: '${char.id}',
    name: '${char.name}',
    universe: '${char.universe}',
    description: ${JSON.stringify(char.desc)},
    previewUrl: '${previewUrl}',
    backgroundUrl: '${backgroundUrl}',
    color: '${char.color}',
    powerScore: ${char.powerScore},
  },\n`;
  }
  
  output += '];\n';
  fs.writeFileSync('data/characters.ts', output);
  console.log('Done!');
}

run();

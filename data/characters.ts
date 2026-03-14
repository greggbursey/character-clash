export type Character = {
  id: string;
  name: string;
  universe: string;
  description: string;
  lore: string;
  previewUrl: string;
  backgroundUrl: string;
  color: string;
  powerScore: number;
  imagePosition?: string;
};

export const characters: Character[] = [
  {
    "id": "leo",
    "name": "Leonardo",
    "universe": "TMNT",
    "description": "The tactical, courageous leader and devoted student of his sensei, Splinter. Wears a blue mask and wields two katanas.",
    "lore": "Leonardo is the leader of the Teenage Mutant Ninja Turtles. He is the most disciplined and skilled in ninjutsu, often bearing the burden of responsibility for his brothers.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/404-leonardo.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=1920",
    "color": "#3b82f6",
    "powerScore": 45
  },
  {
    "id": "mikey",
    "name": "Michelangelo",
    "universe": "TMNT",
    "description": "The most naturally gifted of the four turtles, but prefers to spend his time goofing off. Wears an orange mask and wields nunchucks.",
    "lore": "Michelangelo is the youngest and most relaxed of the Turtles. He loves pizza, skateboarding, and pop culture.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/450-michelangelo.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920",
    "color": "#f97316",
    "powerScore": 42
  },
  {
    "id": "donnie",
    "name": "Donatello",
    "universe": "TMNT",
    "description": "The scientist, inventor, engineer, and technological genius. Wears a purple mask and wields a bo staff.",
    "lore": "Donatello is the brains of the operation. He creates all of the Turtles' gadgets, vehicles, and weapons.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/228-donatello.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
    "color": "#a855f7",
    "powerScore": 43
  },
  {
    "id": "raph",
    "name": "Raphael",
    "universe": "TMNT",
    "description": "The team's bad boy, Raphael wears a red mask and wields a pair of sai. He is physically strong and has an aggressive nature.",
    "lore": "Raphael is the hothead of the group. He is fiercely loyal to his brothers but often clashes with Leonardo over leadership.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/541-raphael.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1920",
    "color": "#ef4444",
    "powerScore": 46
  },
  {
    "id": "splinter",
    "name": "Master Splinter",
    "universe": "TMNT",
    "description": "The mutant rat sensei and adoptive father of the Ninja Turtles.",
    "lore": "Once a human martial arts master, Splinter mutated and taught the Turtles ninjutsu to protect themselves.",
    "previewUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Splinter_%28character%29.png/250px-Splinter_%28character%29.png",
    "backgroundUrl": "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?auto=format&fit=crop&q=80&w=1920",
    "color": "#78350f",
    "powerScore": 60
  },
  {
    "id": "shredder",
    "name": "The Shredder",
    "universe": "TMNT",
    "description": "The ruthless leader of the Foot Clan and the Turtles' greatest enemy.",
    "lore": "Oroku Saki, known as The Shredder, wears bladed armor and seeks to control the criminal underworld.",
    "previewUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Shredder_TMNT.webp/250px-Shredder_TMNT.webp.png",
    "backgroundUrl": "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&q=80&w=1920",
    "color": "#52525b",
    "powerScore": 55
  },
  {
    "id": "caseyjones",
    "name": "Casey Jones",
    "universe": "TMNT",
    "description": "A vigilante who uses sports equipment to fight crime.",
    "lore": "Wearing a hockey mask and carrying a golf bag full of bats and sticks, Casey is a close ally of the Turtles.",
    "previewUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Casey_Jones_%28character%29.png/250px-Casey_Jones_%28character%29.png",
    "backgroundUrl": "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&q=80&w=1920",
    "color": "#1e293b",
    "powerScore": 35
  },
  {
    "id": "krang",
    "name": "Krang",
    "universe": "TMNT",
    "description": "An alien warlord from Dimension X, residing in a powerful android body.",
    "lore": "Stripped of his body and banished to Earth, Krang allied with the Shredder to conquer the planet.",
    "previewUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Krang_%28Teenage_Mutant_Ninja_Turtles%29.png/250px-Krang_%28Teenage_Mutant_Ninja_Turtles%29.png",
    "backgroundUrl": "https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?auto=format&fit=crop&q=80&w=1920",
    "color": "#ec4899",
    "powerScore": 65
  },
  {
    "id": "bebop",
    "name": "Bebop",
    "universe": "TMNT",
    "description": "A mutant warthog and one of Shredder's bumbling henchmen.",
    "lore": "Formerly a human street thug, Bebop was mutated to help the Foot Clan defeat the Turtles.",
    "previewUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Bebop_and_Rocksteady_%28characters%29.png/250px-Bebop_and_Rocksteady_%28characters%29.png",
    "backgroundUrl": "https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?auto=format&fit=crop&q=80&w=1920",
    "color": "#a21caf",
    "powerScore": 40
  },
  {
    "id": "spiderman",
    "name": "Spider-Man",
    "universe": "Marvel",
    "description": "Bitten by a radioactive spider, Peter Parker gained arachnid-like abilities and uses them to protect New York City.",
    "lore": "Peter Parker learned that 'with great power, there must also come great responsibility.'",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1920",
    "color": "#ef4444",
    "powerScore": 65
  },
  {
    "id": "ironman",
    "name": "Iron Man",
    "universe": "Marvel",
    "description": "Genius billionaire Tony Stark fights evil in a high-tech suit of armor of his own design.",
    "lore": "Tony Stark is a wealthy industrialist and genius inventor who built a powered suit of armor to escape captivity.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    "color": "#eab308",
    "powerScore": 85
  },
  {
    "id": "thor",
    "name": "Thor",
    "universe": "Marvel",
    "description": "The Asgardian God of Thunder, wielding the enchanted hammer Mjolnir to protect the Nine Realms.",
    "lore": "Thor Odinson is the Asgardian God of Thunder, based on the Norse mythological deity.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
    "color": "#67e8f9",
    "powerScore": 95
  },
  {
    "id": "hulk",
    "name": "Hulk",
    "universe": "Marvel",
    "description": "Exposed to heavy gamma radiation, Dr. Bruce Banner transforms into a giant, raging green monster when provoked.",
    "lore": "Dr. Bruce Banner was a brilliant scientist who was caught in the blast of a gamma bomb he created.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920",
    "color": "#22c55e",
    "powerScore": 96
  },
  {
    "id": "captainamerica",
    "name": "Captain America",
    "universe": "Marvel",
    "description": "Enhanced to the peak of human perfection by an experimental serum, Steve Rogers is the First Avenger.",
    "lore": "Frozen in ice for decades after WWII, Steve Rogers awoke in the modern world to continue his fight for liberty and justice.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1920",
    "color": "#3b82f6",
    "powerScore": 70
  },
  {
    "id": "wolverine",
    "name": "Wolverine",
    "universe": "X-Men",
    "description": "A mutant with a healing factor, enhanced senses, and adamantium-laced claws.",
    "lore": "Born James Howlett, Logan has lived for over a century, fighting in multiple wars and eventually joining the X-Men.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
    "color": "#eab308",
    "powerScore": 80
  },
  {
    "id": "thanos",
    "name": "Thanos",
    "universe": "Marvel",
    "description": "The Mad Titan, a powerful cosmic warlord who seeks to bring balance to the universe.",
    "lore": "Thanos believes that the universe is overpopulated and seeks the Infinity Stones to wipe out half of all life.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/655-thanos.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920",
    "color": "#a855f7",
    "powerScore": 99
  },
  {
    "id": "venom",
    "name": "Venom",
    "universe": "Marvel",
    "description": "A sentient alien symbiote that bonds with a human host to survive, granting them immense power.",
    "lore": "Originally bonded with Spider-Man, the symbiote later merged with Eddie Brock, creating one of Spider-Man's deadliest foes.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/687-venom.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
    "color": "#18181b",
    "powerScore": 78
  },
  {
    "id": "magneto",
    "name": "Magneto",
    "universe": "X-Men",
    "description": "A powerful mutant with the ability to generate and control magnetic fields.",
    "lore": "A Holocaust survivor, Max Eisenhardt believes that mutants are superior to humans and will do whatever it takes to ensure their survival.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/423-magneto.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920",
    "color": "#dc2626",
    "powerScore": 92
  },
  {
    "id": "superman",
    "name": "Superman",
    "universe": "DC",
    "description": "The Last Son of Krypton, possessing immense strength, flight, and heat vision under a yellow sun.",
    "lore": "Born Kal-El on the dying planet Krypton, he was sent to Earth as a baby. Raised as Clark Kent in Smallville.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1920",
    "color": "#3b82f6",
    "powerScore": 98
  },
  {
    "id": "batman",
    "name": "Batman",
    "universe": "DC",
    "description": "Billionaire Bruce Wayne fights crime in Gotham City using his intellect, martial arts skills, and advanced gadgets.",
    "lore": "After witnessing the murder of his parents as a child, Bruce Wayne swore vengeance against criminals.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920",
    "color": "#52525b",
    "powerScore": 60
  },
  {
    "id": "joker",
    "name": "Joker",
    "universe": "DC",
    "description": "The Clown Prince of Crime, Batman's arch-nemesis, known for his chaotic and unpredictable nature.",
    "lore": "The Joker is a highly intelligent psychopath with a warped, sadistic sense of humor.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
    "color": "#a855f7",
    "powerScore": 25
  },
  {
    "id": "wonderwoman",
    "name": "Wonder Woman",
    "universe": "DC",
    "description": "Diana, Princess of the Amazons, trained to be an unconquerable warrior.",
    "lore": "Raised on a sheltered island paradise, Diana leaves her home to fight for justice, love, and peace in the outside world.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
    "color": "#eab308",
    "powerScore": 95
  },
  {
    "id": "flash",
    "name": "The Flash",
    "universe": "DC",
    "description": "The Fastest Man Alive, able to tap into the Speed Force to run at superhuman speeds.",
    "lore": "Struck by lightning and doused in chemicals, Barry Allen gained the ability to move, think, and react at light speeds.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/265-flash-ii.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920",
    "color": "#ef4444",
    "powerScore": 88
  },
  {
    "id": "lexluthor",
    "name": "Lex Luthor",
    "universe": "DC",
    "description": "A brilliant billionaire industrialist and Superman's greatest enemy.",
    "lore": "Luthor believes Superman is a threat to humanity's potential and uses his vast resources and intellect to try and destroy him.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/405-lex-luthor.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    "color": "#22c55e",
    "powerScore": 40
  },
  {
    "id": "harleyquinn",
    "name": "Harley Quinn",
    "universe": "DC",
    "description": "A former psychiatrist who fell in love with the Joker and became his chaotic accomplice.",
    "lore": "Dr. Harleen Quinzel was assigned to treat the Joker at Arkham Asylum, but instead, she was manipulated into becoming his loyal sidekick.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/309-harley-quinn.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?auto=format&fit=crop&q=80&w=1920",
    "color": "#ef4444",
    "powerScore": 30
  },
  {
    "id": "darkseid",
    "name": "Darkseid",
    "universe": "DC",
    "description": "The tyrannical ruler of Apokolips, seeking the Anti-Life Equation to control all free will.",
    "lore": "Darkseid is one of the most powerful beings in the DC Universe, possessing immense strength and firing deadly Omega Beams from his eyes.",
    "previewUrl": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/204-darkseid.jpg",
    "backgroundUrl": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920",
    "color": "#52525b",
    "powerScore": 100
  }
,
  {
  id: "scorpion",
  name: "Scorpion",
  universe: "Mortal Kombat",
  description: "A resurrected ninja specter seeking vengeance for the death of his family and clan.",
  lore: "Hanzo Hasashi was a member of the Shirai Ryu assassin clan until they were wiped out by the rival Lin Kuei. Resurrected as a hellspawn, he wields a kunai on a rope and hellfire.",
  previewUrl: "https://static.wikia.nocookie.net/mkwikia/images/e/e5/Scorpion_MK1_render.webp/revision/latest",
  backgroundUrl: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&q=80&w=1920",
  color: "#eab308",
  powerScore: 85,
  imagePosition: "top"
},
  {
  id: "subzero",
  name: "Sub-Zero",
  universe: "Mortal Kombat",
  description: "A grandmaster of the Lin Kuei clan with the ability to control ice in all its forms.",
  lore: "Kuai Liang is the younger brother of the original Sub-Zero. He is a disciplined warrior who has led the Lin Kuei towards a more honorable path.",
  previewUrl: "https://static.wikia.nocookie.net/mkwikia/images/7/77/Sub-Zero_MK1_Render.png/revision/latest",
  backgroundUrl: "https://images.unsplash.com/photo-1517299321609-52687d1bc9e6?auto=format&fit=crop&q=80&w=1920",
  color: "#3b82f6",
  powerScore: 84,
  imagePosition: "top"
},
  {
  id: "raiden",
  name: "Raiden",
  universe: "Mortal Kombat",
  description: "The God of Thunder and protector of Earthrealm, wielding lightning with divine precision.",
  lore: "As an Elder God, Raiden has guided Earth's champions through countless Mortal Kombat tournaments to prevent the realms from falling into darkness.",
  previewUrl: "https://static.wikia.nocookie.net/mkwikia/images/0/03/Raiden_MK1_render.webp/revision/latest",
  backgroundUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
  color: "#60a5fa",
  powerScore: 95,
  imagePosition: "top"
},
  {
  id: "shangtsung",
  name: "Shang Tsung",
  universe: "Mortal Kombat",
  description: "A powerful, soul-stealing sorcerer and host of the Mortal Kombat tournament.",
  lore: "Cursed to consume souls to maintain his youth and power, Shang Tsung serves Shao Kahn and uses his shape-shifting abilities to deceive his enemies.",
  previewUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Shang_Tsung_in_Mortal_Kombat_11_%28cropped%29.png",
  backgroundUrl: "https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920",
  color: "#22c55e",
  powerScore: 90
},
  {
  id: "kano",
  name: "Kano",
  universe: "Mortal Kombat",
  description: "A ruthless mercenary and leader of the Black Dragon cartel, known for his cybernetic eye.",
  lore: "A cunning opportunist and weapons dealer, Kano is a long-time enemy of Sonya Blade and the Special Forces, always looking for a profit.",
  previewUrl: "https://upload.wikimedia.org/wikipedia/en/f/f5/Kano_%28MK%29.png",
  backgroundUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
  color: "#ef4444",
  powerScore: 75,
  imagePosition: "top"
},
  {
  id: "shaokahn",
  name: "Shao Kahn",
  universe: "Mortal Kombat",
  description: "The tyrannical emperor of Outworld, seeking to conquer all realms.",
  lore: "A brutal warlord with immense physical strength and dark magic, Shao Kahn wields a massive wrath hammer and demands absolute submission.",
  previewUrl: "https://static.wikia.nocookie.net/mkwikia/images/b/bb/Shao_MK1_render.webp/revision/latest",
  backgroundUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
  color: "#a855f7",
  powerScore: 98,
  imagePosition: "top"
}
,
  {
  id: "colossus",
  name: "Colossus",
  universe: "X-Men",
  description: "A mutant who can transform his body into organic steel, granting him immense strength and durability.",
  lore: "Piotr Rasputin is a gentle giant from Russia who uses his powers to protect others as a core member of the X-Men.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/185-colossus.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920",
  color: "#94a3b8",
  powerScore: 82
},
  {
  id: "nightcrawler",
  name: "Nightcrawler",
  universe: "X-Men",
  description: "A teleporting mutant with a demonic appearance but a devout and swashbuckling spirit.",
  lore: "Kurt Wagner possesses the ability to teleport himself and others, leaving behind a cloud of brimstone-smelling smoke.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/490-nightcrawler.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
  color: "#3b82f6",
  powerScore: 75
},
  {
  id: "phoenix",
  name: "Phoenix",
  universe: "X-Men",
  description: "A powerful telepath and telekinetic who became the host for the cosmic Phoenix Force.",
  lore: "Jean Grey is one of the most powerful mutants in existence, but her connection to the Phoenix Force makes her a cosmic threat.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/517-phoenix.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920",
  color: "#ef4444",
  powerScore: 100
},
  {
  id: "sabretooth",
  name: "Sabretooth",
  universe: "X-Men",
  description: "A feral mutant with a healing factor, razor-sharp claws, and a bloodthirsty nature.",
  lore: "Victor Creed is Wolverine's oldest and deadliest enemy, a brutal killer who embraces his animalistic instincts.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/570-sabretooth.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
  color: "#b45309",
  powerScore: 80
},
  {
  id: "juggernaut",
  name: "Juggernaut",
  universe: "X-Men",
  description: "An unstoppable force of physical destruction, powered by the Crimson Gem of Cyttorak.",
  lore: "Cain Marko is the stepbrother of Charles Xavier. Once he gains momentum, nothing on Earth can stop him.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/374-juggernaut.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920",
  color: "#7f1d1d",
  powerScore: 92
},
  {
  id: "blackpanther",
  name: "Black Panther",
  universe: "Marvel",
  description: "The king and protector of the technologically advanced African nation of Wakanda.",
  lore: "T'Challa uses his genius intellect, physical prowess, and a vibranium suit to protect his people and the world.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/106-black-panther.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920",
  color: "#18181b",
  powerScore: 85
},
  {
  id: "doctorstrange",
  name: "Doctor Strange",
  universe: "Marvel",
  description: "The Sorcerer Supreme, Earth's primary protector against magical and mystical threats.",
  lore: "Stephen Strange was a brilliant but arrogant surgeon until a car accident ruined his hands, leading him to discover the mystic arts.",
  previewUrl: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/226-doctor-strange.jpg",
  backgroundUrl: "https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920",
  color: "#a855f7",
  powerScore: 94
}
];

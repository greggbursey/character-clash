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
    id: "leo",
    name: "Leonardo",
    universe: "TMNT",
    description:
      "The tactical, courageous leader and devoted student of his sensei, Splinter. Wears a blue mask and wields two katanas.",
    lore: "Leonardo is the leader of the Teenage Mutant Ninja Turtles. He is the most disciplined and skilled in ninjutsu, often bearing the burden of responsibility for his brothers. Guided by his sensei Splinter, he strives to embody the bushido code in every battle.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/404-leonardo.jpg",
    // backgroundUrl:
    //   "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913038/leonardo_teenage-mutant-ninja-turtles_gallery_659f2d4872969.jpg",
    color: "#3b82f6",
    powerScore: 45,
  },
  {
    id: "mikey",
    name: "Michelangelo",
    universe: "TMNT",
    description:
      "The most naturally gifted of the four turtles, but prefers to spend his time goofing off. Wears an orange mask and wields nunchucks.",
    lore: "Michelangelo is the youngest and most relaxed of the Turtles. He loves pizza, skateboarding, and pop culture more than training. Despite his goofy nature, his natural agility and unpredictable fighting style make him a formidable warrior in any clash.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/450-michelangelo.jpg",
    // backgroundUrl:
    //   "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://secretcompassonline.com/cdn/shop/files/002_PCS_TMNT_Michelangelo_retail_1200x600_crop_center.jpg?v=1732296198",
    color: "#f97316",
    powerScore: 42,
  },
  {
    id: "donnie",
    name: "Donatello",
    universe: "TMNT",
    description:
      "The scientist, inventor, engineer, and technological genius. Wears a purple mask and wields a bo staff.",
    lore: "Donatello is the brains of the operation. He creates all of the Turtles' gadgets, vehicles, and weapons from scavenged parts. His mastery of technology and engineering often provides the team with the edge they need to overcome superior foes.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/228-donatello.jpg",
    // backgroundUrl:
    //   "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/911550/donatello-13-scale-statue-pcs_teenage-mutant-ninja-turtles_gallery_63ab3cf7b1888.jpg",
    color: "#a855f7",
    powerScore: 43,
  },
  {
    id: "raph",
    name: "Raphael",
    universe: "TMNT",
    description:
      "The team's bad boy, Raphael wears a red mask and wields a pair of sai. He is physically strong and has an aggressive nature.",
    lore: "Raphael is the hothead of the group. He is fiercely loyal to his brothers but often clashes with Leonardo over leadership and tactics. His raw strength and aggressive 'strike hard, strike fast' mentality make him a dangerous brawler.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/541-raphael.jpg",
    // backgroundUrl:
    //   "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://raidshadowlegends.com/wp-content/uploads/2025/08/TMNT-Raphael-scaled.png",
    color: "#ef4444",
    powerScore: 46,
  },
  {
    id: "splinter",
    name: "Master Splinter",
    universe: "TMNT",
    description:
      "The mutant rat sensei and adoptive father of the Ninja Turtles.",
    lore: "Once a human martial arts master named Hamato Yoshi, Splinter was mutated into a rat and taught the Turtles ninjutsu to protect themselves. He serves as their adoptive father, spiritual guide, and most powerful sensei. His wisdom is as sharp as any blade he has ever wielded.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Splinter_%28character%29.png/250px-Splinter_%28character%29.png",
    // backgroundUrl:
    //   "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://wallpapercat.com/w/full/7/9/6/459011-1280x2120-samsung-hd-splinter-wallpaper.jpg",
    color: "#78350f",
    powerScore: 60,
  },
  {
    id: "shredder",
    name: "The Shredder",
    universe: "TMNT",
    description:
      "The ruthless leader of the Foot Clan and the Turtles' greatest enemy.",
    lore: "Oroku Saki, known as The Shredder, wears bladed armor and seeks to control the criminal underworld through the Foot Clan. He is the sworn enemy of Master Splinter and the Turtles, driven by a centuries-old grudge. His mastery of ninjutsu and ruthless ambition make him a terrifying presence.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Shredder_TMNT.webp/250px-Shredder_TMNT.webp.png",
    // "backgroundUrl": "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://www.specfictionshop.com/cdn/shop/files/001PCS_Shredder__73220_2000x.jpg?v=1683229277",
    color: "#52525b",
    powerScore: 55,
  },
  {
    id: "caseyjones",
    name: "Casey Jones",
    universe: "TMNT",
    description: "A vigilante who uses sports equipment to fight crime.",
    lore: "Wearing a hockey mask and carrying a golf bag full of bats and sticks, Casey is a close ally of the Turtles. He is a self-taught vigilante who stalks the streets of New York to deliver his own brand of justice. Though rough around the edges, his heart is as big as his swing.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Casey_Jones_%28character%29.png/250px-Casey_Jones_%28character%29.png",
    // backgroundUrl:
    //   "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&q=80&w=1920",
    backgroundUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/914257/pcs-teenage-mutant-ninja-turtles-casey-jones-1-3-scale-statue-gallery-67c0c291da288.jpg",
    color: "#1e293b",
    powerScore: 35,
  },
  {
    id: "krang",
    name: "Krang",
    universe: "TMNT",
    description:
      "An alien warlord from Dimension X, residing in a powerful android body.",
    lore: "Stripped of his body and banished to Earth from Dimension X, Krang allied with the Shredder to conquer the planet. He resides in a massive, high-tech android body that grants him immense strength and advanced weaponry. His primary goal remains the restoration of his Technodrome to its full power.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Krang_%28Teenage_Mutant_Ninja_Turtles%29.png/250px-Krang_%28Teenage_Mutant_Ninja_Turtles%29.png",
    backgroundUrl:
      "https://www.specfictionshop.com/cdn/shop/products/MAIN-KRANG_2000x.png?v=1669671052",
    color: "#ec4899",
    powerScore: 65,
  },
  {
    id: "bebop",
    name: "Bebop",
    universe: "TMNT",
    description: "A mutant warthog and one of Shredder's bumbling henchmen.",
    lore: "Formerly a human street thug, Bebop was mutated into a powerful warthog to help the Foot Clan defeat the Turtles. While he lacks intelligence, his brute strength and loyalty to Shredder make him a persistent threat. He is almost always seen alongside his partner Rocksteady, spreading chaos through the city.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Bebop_and_Rocksteady_%28characters%29.png/250px-Bebop_and_Rocksteady_%28characters%29.png",
    backgroundUrl:
      "https://www.toyark.com/wp-content/uploads/2022/02/PCS-Bebop-Statue-002.jpg",
    color: "#a21caf",
    powerScore: 40,
  },
  {
    id: "spiderman",
    name: "Spider-Man",
    universe: "Marvel",
    description:
      "Bitten by a radioactive spider, Peter Parker gained arachnid-like abilities and uses them to protect New York City.",
    lore: "Peter Parker learned that 'with great power, there must also come great responsibility.' After being bitten by a radioactive spider, he gained superhuman strength, agility, and the ability to cling to walls. He now balances his life as a college student and photographer with his duties as New York's friendly neighborhood hero.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
    backgroundUrl: "https://images7.alphacoders.com/971/thumb-1920-971636.jpg",
    color: "#ef4444",
    powerScore: 65,
  },
  {
    id: "ironman",
    name: "Iron Man",
    universe: "Marvel",
    description:
      "Genius billionaire Tony Stark fights evil in a high-tech suit of armor of his own design.",
    lore: "Tony Stark is a wealthy industrialist and genius inventor who built a powered suit of armor to escape captivity. He has since refined his technology into a vast array of high-tech suits designed for any scenario. As a founding member of the Avengers, he uses his resources and intellect to protect the world from global threats.",
    previewUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBAatoEdfVLGvLarMR3Os-mSdVelpQsnOpTA&s",
    backgroundUrl:
      "https://wallpapers.com/images/featured/iron-man-ouqxo5w2b59h0042.jpg",
    color: "#eab308",
    powerScore: 85,
  },
  {
    id: "thor",
    name: "Thor",
    universe: "Marvel",
    description:
      "The Asgardian God of Thunder, wielding the enchanted hammer Mjolnir to protect the Nine Realms.",
    lore: "Thor Odinson is the Asgardian God of Thunder, based on the Norse mythological deity. He wields the enchanted hammer Mjolnir, which grants him the power of flight and control over lightning. Having spent centuries protecting the Nine Realms, he is a warrior of unmatched strength and honor.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
    backgroundUrl: "https://images2.alphacoders.com/674/thumb-1920-674260.jpg",
    color: "#67e8f9",
    powerScore: 95,
  },
  {
    id: "hulk",
    name: "Hulk",
    universe: "Marvel",
    description:
      "Exposed to heavy gamma radiation, Dr. Bruce Banner transforms into a giant, raging green monster when provoked.",
    lore: "Dr. Bruce Banner was a brilliant scientist who was caught in the blast of a gamma bomb he created. Now, whenever his heart rate spikes or he loses his temper, he transforms into the incredible Hulk. He is a force of pure destruction with nearly limitless physical strength, but he often struggles to control the beast within.",
    previewUrl:
      "https://comicvine.gamespot.com/a/uploads/scale_medium/14/146991/3393677-2980756038-fotos.jpg",
    backgroundUrl:
      "https://i.pinimg.com/736x/fe/6d/73/fe6d730ad90961deae81bb951674c018.jpg",
    color: "#22c55e",
    powerScore: 96,
  },
  {
    id: "captainamerica",
    name: "Captain America",
    universe: "Marvel",
    description:
      "Enhanced to the peak of human perfection by an experimental serum, Steve Rogers is the First Avenger.",
    lore: "Frozen in ice for decades after WWII, Steve Rogers awoke in the modern world to continue his fight for liberty and justice. Enhanced to the peak of human perfection by the Super Soldier Serum, he is a master tactician and hand-to-hand combatant. He carries an indestructible vibranium shield that has become a symbol of hope across the globe.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
    backgroundUrl:
      "https://i.pinimg.com/736x/1d/bb/8c/1dbb8c223bba8d37186db10c3388a15a.jpg",
    color: "#3b82f6",
    powerScore: 70,
  },
  {
    id: "wolverine",
    name: "Wolverine",
    universe: "X-Men",
    description:
      "A mutant with a healing factor, enhanced senses, and adamantium-laced claws.",
    lore: "Born James Howlett, Logan has lived for over a century, fighting in multiple wars and eventually joining the X-Men. He possesses a powerful healing factor that allows him to recover from nearly any injury and retractable bone claws coated in indestructible adamantium. He is a loner by nature but a fierce protector of those he calls family.",
    previewUrl:
      "https://pbs.twimg.com/profile_images/1971501608941821952/QNOpI_xr_400x400.jpg",
    backgroundUrl:
      "https://i.pinimg.com/736x/2b/a8/0b/2ba80b7f366e8a0d8c576331067c3458.jpg",
    color: "#eab308",
    powerScore: 80,
  },
  {
    id: "thanos",
    name: "Thanos",
    universe: "Marvel",
    description:
      "The Mad Titan, a powerful cosmic warlord who seeks to bring balance to the universe.",
    lore: "Thanos believes that the universe is overpopulated and seeks the Infinity Stones to wipe out half of all life. Known as the Mad Titan, he possesses immense cosmic power even without his Infinity Gauntlet. His nihilistic philosophy and strategic genius make him one of the most dangerous threats in the Marvel Universe.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/655-thanos.jpg",
    backgroundUrl: "https://images6.alphacoders.com/917/thumb-1920-917631.png",
    color: "#a855f7",
    powerScore: 99,
  },
  {
    id: "venom",
    name: "Venom",
    universe: "Marvel",
    description:
      "A sentient alien symbiote that bonds with a human host to survive, granting them immense power.",
    lore: "Originally bonded with Spider-Man, the alien symbiote later merged with Eddie Brock, creating one of Spider-Man's deadliest foes. The symbiote grants Eddie various powers including superhuman strength, webbing, and the ability to hide from Peter Parker's spider-sense. While often a villain, Venom occasionally acts as a lethal protector of the innocent.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/687-venom.jpg",
    backgroundUrl:
      "https://i.pinimg.com/564x/ff/3f/42/ff3f427b745b2765bd7003f9c12af519.jpg",
    color: "#18181b",
    powerScore: 78,
  },
  {
    id: "magneto",
    name: "Magneto",
    universe: "X-Men",
    description:
      "A powerful mutant with the ability to generate and control magnetic fields.",
    lore: "A Holocaust survivor, Max Eisenhardt believes that mutants are superior to humans and will do whatever it takes to ensure their survival. He possesses the omega-level ability to control magnetic fields, allowing him to manipulate metal and energy on a massive scale. Despite his extremist methods, his goal is always the preservation of his people.",
    previewUrl: "https://www.superherodb.com/pictures2/portraits/10/100/12.jpg",
    backgroundUrl:
      "https://static0.srcdn.com/wordpress/wp-content/uploads/2020/05/Magneto-Comic-Book-Art-Face.jpg?w=1200&h=675&fit=crop",
    color: "#dc2626",
    powerScore: 92,
  },
  {
    id: "superman",
    name: "Superman",
    universe: "DC",
    description:
      "The Last Son of Krypton, possessing immense strength, flight, and heat vision under a yellow sun.",
    lore: "Born Kal-El on the dying planet Krypton, he was sent to Earth as a baby and raised as Clark Kent in Smallville. Under Earth's yellow sun, he possesses god-like powers including super strength, flight, and heat vision. He serves as a beacon of truth and justice, using his abilities to protect the planet he now calls home.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1920",
    color: "#3b82f6",
    powerScore: 98,
  },
  {
    id: "batman",
    name: "Batman",
    universe: "DC",
    description:
      "Billionaire Bruce Wayne fights crime in Gotham City using his intellect, martial arts skills, and advanced gadgets.",
    lore: "After witnessing the murder of his parents as a child, Bruce Wayne swore vengeance against criminals. He spent years training his body and mind to peak human performance, becoming the world's greatest detective. Operating out of Gotham City, he uses a vast array of gadgets and his terrifying persona to strike fear into the hearts of evil.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920",
    color: "#52525b",
    powerScore: 60,
  },
  {
    id: "joker",
    name: "Joker",
    universe: "DC",
    description:
      "The Clown Prince of Crime, Batman's arch-nemesis, known for his chaotic and unpredictable nature.",
    lore: "The Joker is a highly intelligent psychopath with a warped, sadistic sense of humor. He seeks to prove that anyone can be pushed into madness with just 'one bad day.' His lack of any superhuman powers is more than made up for by his complete unpredictability and genius for chaotic planning.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
    color: "#a855f7",
    powerScore: 25,
  },
  {
    id: "wonderwoman",
    name: "Wonder Woman",
    universe: "DC",
    description:
      "Diana, Princess of the Amazons, trained to be an unconquerable warrior.",
    lore: "Raised on a sheltered island paradise called Themyscira, Diana leaves her home to fight for justice, love, and peace in the outside world. She is a warrior of incredible strength and skill, wielding the Lasso of Truth and her indestructible bracers. As a demigoddess, she bridge the gap between myth and the modern world.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
    color: "#eab308",
    powerScore: 95,
  },
  {
    id: "flash",
    name: "The Flash",
    universe: "DC",
    description:
      "The Fastest Man Alive, able to tap into the Speed Force to run at superhuman speeds.",
    lore: "Struck by lightning and doused in chemicals, Barry Allen gained the ability to move, think, and react at light speeds. He is the Fastest Man Alive and can tap into the Speed Force to travel through time and across dimensions. His optimistic attitude and scientific mind make him a crucial member of the Justice League.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/265-flash-ii.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920",
    color: "#ef4444",
    powerScore: 88,
  },
  {
    id: "lexluthor",
    name: "Lex Luthor",
    universe: "DC",
    description:
      "A brilliant billionaire industrialist and Superman's greatest enemy.",
    lore: "Luthor believes Superman is a threat to humanity's potential and uses his vast resources and intellect to try and destroy him. As one of the smartest humans on Earth, he often dons a high-tech warsuit to face the Man of Steel directly. His ego is as vast as his billionaire fortune, driven by a desire for total control.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/405-lex-luthor.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    color: "#22c55e",
    powerScore: 40,
  },
  {
    id: "harleyquinn",
    name: "Harley Quinn",
    universe: "DC",
    description:
      "A former psychiatrist who fell in love with the Joker and became his chaotic accomplice.",
    lore: "Dr. Harleen Quinzel was assigned to treat the Joker at Arkham Asylum, but instead, she was manipulated into becoming his loyal sidekick. Over time, she has broken free from his toxic influence and forged her own path as a chaotic anti-hero. Her gymnastic skills and unpredictable weaponry make her a wild card in any conflict.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/309-harley-quinn.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?auto=format&fit=crop&q=80&w=1920",
    color: "#ef4444",
    powerScore: 30,
  },
  {
    id: "darkseid",
    name: "Darkseid",
    universe: "DC",
    description:
      "The tyrannical ruler of Apokolips, seeking the Anti-Life Equation to control all free will.",
    lore: "Darkseid is one of the most powerful beings in the DC Universe, possessing immense strength and firing deadly Omega Beams from his eyes. He is the tyrannical ruler of the hellish planet Apokolips, seeking the Anti-Life Equation to enslave all free will. His presence alone is enough to threaten the stability of the entire multiverse.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/204-darkseid.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920",
    color: "#52525b",
    powerScore: 100,
  },
  {
    id: "scorpion",
    name: "Scorpion",
    universe: "Mortal Kombat",
    description:
      "A resurrected ninja specter seeking vengeance for the death of his family and clan.",
    lore: "Hanzo Hasashi was a member of the Shirai Ryu assassin clan until they were wiped out by the rival Lin Kuei. Resurrected as a hellspawn specter, he wields a kunai on a rope and uses hellfire to incinerate his enemies. His life is defined by a quest for vengeance that often blurs the line between man and monster.",
    previewUrl:
      "https://static.wikia.nocookie.net/mkwikia/images/e/e5/Scorpion_MK1_render.webp/revision/latest",
    backgroundUrl:
      "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&q=80&w=1920",
    color: "#eab308",
    powerScore: 85,
    imagePosition: "top",
  },
  {
    id: "subzero",
    name: "Sub-Zero",
    universe: "Mortal Kombat",
    description:
      "A grandmaster of the Lin Kuei clan with the ability to control ice in all its forms.",
    lore: "Kuai Liang is the younger brother of the original Sub-Zero and the current Grandmaster of the Lin Kuei. He is a disciplined warrior who has led his clan towards a more honorable path, turning away from their history as hired killers. His mastery over cryomancy allows him to create weapons and shields from thin air.",
    previewUrl:
      "https://static.wikia.nocookie.net/mkwikia/images/7/77/Sub-Zero_MK1_Render.png/revision/latest",
    backgroundUrl:
      "https://images.unsplash.com/photo-1517299321609-52687d1bc9e6?auto=format&fit=crop&q=80&w=1920",
    color: "#3b82f6",
    powerScore: 84,
    imagePosition: "top",
  },
  {
    id: "raiden",
    name: "Raiden",
    universe: "Mortal Kombat",
    description:
      "The God of Thunder and protector of Earthrealm, wielding lightning with divine precision.",
    lore: "As an Elder God of Thunder, Raiden has guided Earth's champions through countless Mortal Kombat tournaments to prevent the realms from falling into darkness. He possesses divine power over lightning and can teleport across dimensions at will. His commitment to protecting Earthrealm often requires him to make difficult and sometimes questionable sacrifices.",
    previewUrl:
      "https://static.wikia.nocookie.net/mkwikia/images/0/03/Raiden_MK1_render.webp/revision/latest",
    backgroundUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
    color: "#60a5fa",
    powerScore: 95,
    imagePosition: "top",
  },
  {
    id: "shangtsung",
    name: "Shang Tsung",
    universe: "Mortal Kombat",
    description:
      "A powerful, soul-stealing sorcerer and host of the Mortal Kombat tournament.",
    lore: "Cursed to consume souls to maintain his youth and power, Shang Tsung serves Shao Kahn as a master manipulator and sorcerer. He can shape-shift into his opponents, gaining their abilities and knowledge in an instant. His ultimate goal is always to amass more power and ensure his own survival at any cost.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Shang_Tsung_in_Mortal_Kombat_11_%28cropped%29.png",
    backgroundUrl:
      "https://images.unsplash.com/photo-1519074063912-ad2fe3f51904?auto=format&fit=crop&q=80&w=1920",
    color: "#22c55e",
    powerScore: 90,
  },
  {
    id: "kano",
    name: "Kano",
    universe: "Mortal Kombat",
    description:
      "A ruthless mercenary and leader of the Black Dragon cartel, known for his cybernetic eye.",
    lore: "A cunning opportunist and weapons dealer, Kano is the ruthless leader of the Black Dragon cartel. He is a long-time enemy of Sonya Blade and the Special Forces, always looking for a profit regardless of the stakes. His cybernetic eye grants him laser-vision and enhanced tracking, making him a deadly mercenary.",
    previewUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/f5/Kano_%28MK%29.png",
    backgroundUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
    color: "#ef4444",
    powerScore: 75,
    imagePosition: "top",
  },
  {
    id: "shaokahn",
    name: "Shao Kahn",
    universe: "Mortal Kombat",
    description:
      "The tyrannical emperor of Outworld, seeking to conquer all realms.",
    lore: "A brutal warlord with immense physical strength and dark magic, Shao Kahn wields a massive wrath hammer and demands absolute submission. As the emperor of Outworld, he has conquered countless realms and absorbed them into his own. He is a strategist as much as a warrior, always looking for a weakness to exploit in his enemies.",
    previewUrl:
      "https://static.wikia.nocookie.net/mkwikia/images/b/bb/Shao_MK1_render.webp/revision/latest",
    backgroundUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1920",
    color: "#a855f7",
    powerScore: 98,
    imagePosition: "top",
  },
  {
    id: "colossus",
    name: "Colossus",
    universe: "X-Men",
    description:
      "A mutant who can transform his body into organic steel, granting him immense strength and durability.",
    lore: "Piotr Rasputin is a gentle giant from Russia who uses his powers to protect others as a core member of the X-Men. He can transform his entire body into organic steel, granting him nearly invulnerable defense and massive physical power. Despite his intimidating form, he is an artist at heart who values peace above all else.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/185-colossus.jpg",
    backgroundUrl: "https://wallpapercave.com/wp/wp8271138.jpg",
    color: "#94a3b8",
    powerScore: 82,
  },
  {
    id: "nightcrawler",
    name: "Nightcrawler",
    universe: "X-Men",
    description:
      "A teleporting mutant with a demonic appearance but a devout and swashbuckling spirit.",
    lore: "Kurt Wagner possesses the ability to teleport himself and others, leaving behind a cloud of brimstone-smelling smoke. Despite his demonic appearance, he is a devout and swashbuckling spirit with a heart of gold. His agility and prehensile tail make him one of the most unique and effective fighters among the X-Men.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/490-nightcrawler.jpg",
    backgroundUrl:
      "https://i.pinimg.com/originals/c8/97/67/c8976775a1e1de22e0cb8da127bc54e6.jpg",
    color: "#3b82f6",
    powerScore: 75,
  },
  {
    id: "phoenix",
    name: "Phoenix",
    universe: "X-Men",
    description:
      "A powerful telepath and telekinetic who became the host for the cosmic Phoenix Force.",
    lore: "Jean Grey is one of the most powerful mutants in existence, but her connection to the Phoenix Force makes her a cosmic threat. The Phoenix Force grants her nearly infinite telepathic and telekinetic power, allowing her to manipulate matter at a molecular level. She constantly struggles to maintain her humanity while hosting an entity that can consume entire stars.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/517-phoenix.jpg",
    backgroundUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1920",
    color: "#ef4444",
    powerScore: 100,
  },
  {
    id: "sabretooth",
    name: "Sabretooth",
    universe: "X-Men",
    description:
      "A feral mutant with a healing factor, razor-sharp claws, and a bloodthirsty nature.",
    lore: "Victor Creed is Wolverine's oldest and deadliest enemy, a brutal killer who embraces his animalistic instincts. He possesses a healing factor and razor-sharp claws similar to Logan's, but he lacks his rival's sense of honor. His life is a trail of blood and violence, driven by a primal urge to prove himself the ultimate predator.",
    previewUrl:
      "https://static.wikia.nocookie.net/marveldatabase/images/1/13/Wolverine_Vol_7_32_Unknown_Comic_Books_Exclusive_Virgin_Variant.jpg/revision/latest/thumbnail/width/360/height/450?cb=20250708005522",
    backgroundUrl:
      "https://i.pinimg.com/736x/26/08/41/26084106104c15929af006bec482e14d.jpg",
    color: "#b45309",
    powerScore: 80,
  },
  {
    id: "juggernaut",
    name: "Juggernaut",
    universe: "X-Men",
    description:
      "An unstoppable force of physical destruction, powered by the Crimson Gem of Cyttorak.",
    lore: "Cain Marko is the stepbrother of Charles Xavier and the avatar of the deity Cyttorak. Once he gains momentum, he becomes a literal unstoppable force that can smash through any barrier. His immense strength and durability are mystical in nature, making him a threat that even the strongest mutants struggle to contain.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/374-juggernaut.jpg",
    backgroundUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b9616c3-7094-40cb-9bb0-15d62003d3ff/dcfixnv-87ceba1a-36c4-4897-b072-a6de37b556f8.jpg/v1/fill/w_1024,h_576,q_75,strp/juggernaut_wip_by_uncannyknack_dcfixnv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6Ii9mLzZiOTYxNmMzLTcwOTQtNDBjYi05YmIwLTE1ZDYyMDAzZDNmZi9kY2ZpeG52LTg3Y2ViYTFhLTM2YzQtNDg5Ny1iMDcyLWE2ZGUzN2I1NTZmOC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.gO6nt6pD45YusF1V5AiaPyXTCC6TcU6qOJKbaIUpp5A",
    color: "#7f1d1d",
    powerScore: 92,
  },
  {
    id: "blackpanther",
    name: "Black Panther",
    universe: "Marvel",
    description:
      "The king and protector of the technologically advanced African nation of Wakanda.",
    lore: "T'Challa is the king of Wakanda, a technologically advanced nation hidden in Africa. He uses his genius intellect, physical prowess, and a suit woven from vibranium to protect his people as the Black Panther. Having consumed the Heart-Shaped Herb, he possesses enhanced senses and physical abilities that rival any super-soldier.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/106-black-panther.jpg",
    backgroundUrl:
      "https://c4.wallpaperflare.com/wallpaper/179/330/349/black-panther-marvel-cinematic-universe-mcu-wakanda-t-challa-hd-wallpaper-preview.jpg",
    color: "#18181b",
    powerScore: 85,
  },
  {
    id: "doctorstrange",
    name: "Doctor Strange",
    universe: "Marvel",
    description:
      "The Sorcerer Supreme, Earth's primary protector against magical and mystical threats.",
    lore: "Stephen Strange was a brilliant but arrogant surgeon until a car accident ruined his hands, leading him to discover the mystic arts. Now serving as the Sorcerer Supreme, he is Earth's primary protector against magical and mystical threats. He wields the Eye of Agamotto and the Cloak of Levitation to defend our dimension from eldritch horrors.",
    previewUrl:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/226-doctor-strange.jpg",
    backgroundUrl:
      "https://w0.peakpx.com/wallpaper/180/567/HD-wallpaper-doctor-strange-marvel-cumberbatch-stephen-mystic-magic-sorcerer.jpg",
    color: "#a855f7",
    powerScore: 94,
  },
];

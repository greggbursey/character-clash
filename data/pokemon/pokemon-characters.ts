import { Character } from "../types";

export const pokemonCharacters: Character[] = [
  {
    id: "pikachu",
    name: "Pikachu",
    universe: "Pokemon",
    description: "The iconic Electric-type Mouse Pokemon and the mascot of the entire franchise.",
    lore: "**Pikachu** is a small, yellow Mouse Pokemon with lightning-bolt-shaped tails and rosy red cheeks that act as storage pouches for electricity. While many trainers catch Pikachu to participate in the Pokemon League, one particular Pikachu—partnered with a trainer named Ash Ketchum—became a legend by refusing to stay in his Poke Ball and eventually taking down legendary entities.\n\nPikachu's power comes from its incredible speed and its ability to channel high-voltage electrical energy into attacks like *Thunderbolt* and *Volt Tackle*. In the heat of battle, Pikachu can also access its 'Gigantamax' or 'Z-Move' forms to unleash catastrophic amounts of energy. Despite its small size, Pikachu represents the idea that even the smallest spark can start a storm, a concept proven time and again as it challenges and defeats foes many times its size.",
    triviaInfo: "Origin: Pikachu was first introduced in Pokemon Red and Blue (1996) as a rare encounter in the Viridian Forest. It is an Electric-type Pokemon that evolves from Pichu and into Raichu.\n\nBattles: Pikachu's most famous battles include defeating Lt. Surge's Raichu, overcoming Dragonite in the Orange Islands, and eventually helping to win the World Coronation Series against Leon's Charizard.\n\nSpecial Abilities & Gear: Pikachu can use the '10,000,000 Volt Thunderbolt' Z-Move and the 'Light Ball' item to double its offensive power. It is uniquely capable of 'Gigantamaxing' into a mountain-sized form.\n\nSecret Trivia: Pikachu's name is a combination of 'pika' (the sound of an electric spark) and 'chu' (the sound a mouse makes). It was originally designed to have a final evolution called 'Gorochu' with horns and fangs, but it was cut due to size constraints.",
    previewUrl: "/data/pokemon/assets/pikachu-preview.png",
    backgroundUrl: "/data/pokemon/assets/pikachu-background.png",
    color: "#facc15",
    powerScore: 240,
    gearBonus: 80, // Light Ball
    prepBonus: 50,
    gearDescription: "### Pikachu's Power Kit\n- **Light Ball**: A mysterious orb that doubles Pikachu's Attack and Special Attack stats.\n- **Pikashunium Z**: A crystal that allows Pikachu to unleash its ultimate '10,000,000 Volt Thunderbolt' attack.",
    prepDescription: "### Static Charge\nPikachu sprints in circles to build up static electricity in its cheek pouches, ensuring its first 'Volt Tackle' is at maximum voltage.",
    triviaPool: [
      "Pikachu's name is a portmanteau of the Japanese onomatopoeia 'pikapika' (sparkling) and 'chuchu' (squeaking).",
      "It was inspired by a squirrel, not a mouse, according to its original designer Atsuko Nishida.",
      "The red circles on a Pikachu's cheeks are actually pouches that store electricity.",
      "Ash's Pikachu is one of the only ones in existence that refuses to stay inside a Poke Ball.",
      "In the original Pokemon Yellow, Pikachu would follow the player around on the overworld screen.",
      "Pikachu's favorite food is famously ketchup, as shown in multiple episodes of the anime."
    ],
  },
  {
    id: "charizard",
    name: "Charizard",
    universe: "Pokemon",
    description: "A fire-breathing Flame Pokemon whose breath can melt boulders.",
    lore: "**Charizard** is a draconic Fire/Flying-type Pokemon that evolves from Charmeleon. Known for its fierce competitive spirit, it wanders the skies in search of powerful opponents, never turning its fire on an opponent weaker than itself. Its tail flame is an indicator of its health and emotions; should it go out, the Pokemon's life ends.\n\nCharizard's combat style revolves around its devastating fire-based attacks, including *Flamethrower*, *Fire Spin*, and its signature *Seismic Toss*. It is one of the few Pokemon capable of undergoing multiple forms of advanced evolution, including two distinct Mega Evolutions (X and Y) and a massive Gigantamax form. Whether wreathed in blue dragon-flames or soaring through the air on massive wings, Charizard is the definitive symbol of raw, burning power in the Pokemon world.",
    triviaInfo: "Origin: Charizard is the final evolution of Charmander, the fire starter from the Kanto region. It first appeared in Pokemon Red and Blue (1996).\n\nBattles: Charizard is famously the partner of many champions, including Red and Leon. Ash's Charizard had a legendary rivalry with Blastoise and earned a famous victory over Articuno in the Battle Frontier.\n\nSpecial Abilities & Gear: It can Mega Evolve into Mega Charizard X (Fire/Dragon) or Y (Fire/Flying). Its Gigantamax form creates wings made of pure fire.\n\nSecret Trivia: Despite its dragon-like appearance and ability to learn Dragon-type moves, Charizard was not officially a Dragon-type until it Mega Evolves into the X form. It is the only Pokemon to have two different Mega Evolutions besides Mewtwo.",
    previewUrl: "/data/pokemon/assets/charizard-preview.png",
    backgroundUrl: "/data/pokemon/assets/charizard-background.png",
    color: "#ea580c",
    powerScore: 330,
    gearBonus: 120, // Mega Stone
    prepBonus: 40,
    gearDescription: "### Dragon's Arsenal\n- **Charizardite X/Y**: Mega Stones that allow Charizard to transcend its physical limits and tap into ancient dragon energy.\n- **Everlasting Tail Flame**: A constant source of thermal energy that can be intensified for high-output attacks.",
    prepDescription: "### Aerial Scouting\nCharizard flies to the maximum altitude, using its keen 'Dragon's Eye' sights to identify environmental hazards and heat vents to fuel its fire.",
    triviaPool: [
      "Charizard's tail flame is said to burn hotter as it gains more experience in battle.",
      "It was the mascot of the original Pokemon Red and the later FireRed version.",
      "Charizard was not actually a Dragon-type until the introduction of its Mega Evolution X in 2013.",
      "In the anime, Ash's Charizard spent a long time being disobedient before finally respecting him.",
      "Charizard's height is officially only 5'07\", which is surprisingly short for such a powerful creature.",
      "It is one of only two Pokemon to have two distinct Mega Evolutions (the other being Mewtwo)."
    ],
  },
  {
    id: "mewtwo",
    name: "Mewtwo",
    universe: "Pokemon",
    description: "The genetic masterpiece, a Psychic-type Pokemon created through science.",
    lore: "**Mewtwo** is a Pokemon created by years of horrific gene-splicing and DNA engineering experiments based on the mythical Pokemon Mew. Designed to be the ultimate weapon, it was given the most savage heart of any Pokemon and power that far exceeded its biological blueprints. After destroying the laboratory where it was created, Mewtwo retreated into solitude, developing a cold and calculating view of both humans and Pokemon.\n\nMewtwo's psychic power is almost limitless. It can communicate telepathically, fly through levitation, and project energy blasts like *Psystrike* and *Shadow Ball*. It can even warp reality and manipulate the weather on a global scale. Through the use of Mega Evolution, it can further enhance its physical or mental attributes, becoming an entity that rivals the gods of time and space. Mewtwo is a tragic figure, a being searching for purpose in a world where it was born as a tool of destruction.",
    triviaInfo: "Origin: Created by scientists in a laboratory on Cinnabar Island using the DNA of Mew. It first appeared in Pokemon Red and Blue (1996) as the ultimate post-game challenge.\n\nBattles: Mewtwo famously battled a squadron of Dragonite and a cloned army in the first Pokemon movie, and later clashed with the legendary trainer Red in the Cerulean Cave.\n\nSpecial Abilities & Gear: It possesses the highest Special Attack of any Pokemon and can Mega Evolve into either the physically dominant Mewtwo X or the mentally supreme Mewtwo Y.\n\nSecret Trivia: Mewtwo's birthday is officially recognized as February 6th, the date found in the journals at the Cinnabar Mansion. It is the only Pokemon created through human science that has regained a sense of morality in the anime.",
    previewUrl: "/data/pokemon/assets/mewtwo-preview.png",
    backgroundUrl: "/data/pokemon/assets/mewtwo-background.png",
    color: "#7c3aed",
    powerScore: 490,
    gearBonus: 150, // Mewtwonite / Psystrike mastery
    prepBonus: 100, // Psychic foresight
    gearDescription: "### Psychic Enhancements\n- **Mewtwonite Y**: A stone that streamlines Mewtwo's body for maximum telekinetic output.\n- **Armor of Cinnabar**: (Optional) Cybernetic armor designed to restrain and focus its raw energy.",
    prepDescription: "### Cognitive Pre-emption\nMewtwo uses its psychic mind to look milliseconds into the future, predicting its opponent's exact movements and emotional state before the fight begins.",
    triviaPool: [
      "Mewtwo's birthday is February 6th, as recorded in the journals found in Pokemon Red/Blue.",
      "It was created using the DNA of the mythical Pokemon Mew, but designed to be more powerful.",
      "Mewtwo is the star of the very first Pokemon movie, 'Mewtwo Strikes Back'.",
      "In the original games, it was found in Cerulean Cave after the player defeated the Elite Four.",
      "Mewtwo can speak through telepathy and has a deep, philosophical understanding of existence.",
      "It has two Mega Evolutions, one focusing on Physical Attack (X) and one on Special Attack (Y)."
    ],
  },
  {
    id: "lucario",
    name: "Lucario",
    universe: "Pokemon",
    description: "The Aura Pokemon, capable of sensing and manipulating energy.",
    lore: "**Lucario** is a Fighting/Steel-type Pokemon with the unique ability to see and manipulate 'Aura'—the spiritual energy that flows through all living beings. By catching these auras, Lucario can read the thoughts and movements of others, even if they are invisible. It is a noble and disciplined warrior, often forming deep, lifelong bonds with trainers who share its sense of justice.\n\nIn combat, Lucario uses its Aura to power up its signature *Aura Sphere* and *Dragon Pulse* attacks. Its metal spikes and hard fur provide defensive protection, while its martial arts expertise allows it to deliver precision strikes like *Close Combat*. When it undergoes Mega Evolution, its Aura powers become so intense that they can actually manifest as physical force, allowing it to sense everything within a several-mile radius. Lucario is a warrior of the spirit, a being whose strength is a direct reflection of its inner harmony.",
    triviaInfo: "Origin: Lucario is the evolution of Riolu, first appearing in Pokemon Diamond and Pearl (2006). It was heavily featured in the movie 'Lucario and the Mystery of Mew'.\n\nBattles: Lucario is a staple of many competitive teams and the ace of several Gym Leaders and Champions, including Korrina and Cynthia.\n\nSpecial Abilities & Gear: It can sense 'Aura' to find hidden enemies and possesses the 'Adaptability' ability when Mega Evolved, which boosts its same-type attacks significantly.\n\nSecret Trivia: Lucario's design is based on the Egyptian god Anubis, the jackal-headed guide of the dead. It was the first non-legendary Pokemon to be revealed for the fourth generation of games.",
    previewUrl: "/data/pokemon/assets/lucario-preview.png",
    backgroundUrl: "/data/pokemon/assets/lucario-background.png",
    color: "#0ea5e9",
    powerScore: 265,
    gearBonus: 40, // Lucarionite
    prepBonus: 80, // Aura sensing
    gearDescription: "### Aura Warrior Gear\n- **Lucarionite**: Allows for the intensification of Aura, lengthening the spikes on its body for added lethality.\n- **Spiked Gauntlets**: Natural steel-hard protrusions on its paws and chest for defensive and offensive utility.",
    prepDescription: "### Aura Attunement\nLucario closes its eyes and expands its Aura field, mapping out the entire battlefield and sensing the 'spirit' of its opponent to find a hidden weakness.",
    triviaPool: [
      "Lucario can understand human speech and can communicate through telepathic Aura signals.",
      "Its name may be an anagram of 'orichalcum', a mythical metal, or based on 'lycos' (wolf).",
      "Lucario is one of the only Fighting-type Pokemon that is also a partial Steel-type.",
      "Its design is widely believed to be inspired by the ancient Egyptian god Anubis.",
      "Lucario was the star of its own movie before the games it debuted in were even released.",
      "When Mega Evolved, Lucario's height increases and its Aura sensors grow significantly."
    ],
  },
  {
    id: "greninja",
    name: "Greninja",
    universe: "Pokemon",
    description: "The Ninja Pokemon, a Water/Dark-type master of stealth and speed.",
    lore: "**Greninja** is the final evolution of Froakie, a Pokemon that embodies the grace and lethality of a shinobi. It creates throwing stars out of compressed water, which can split metal when spun at high speeds. With the agility of a master acrobat, it disappears in the blink of an eye, leaving only a puff of smoke or a trail of bubbles behind.\n\nGreninja is famous for the 'Battle Bond' phenomenon, a unique transformation where it takes on a form resembling its trainer—most notably the **Ash-Greninja** form. In this state, its power rivals that of Mega-Evolved Pokemon, and it gains a massive *Water Shuriken* on its back. It is a cold, efficient, and incredibly fast fighter that excels at hit-and-run tactics and precision strikes. Greninja is the ultimate shadow of the Pokemon world, a warrior who strikes from the darkness with the fluidity of the ocean.",
    triviaInfo: "Origin: Final evolution of the Water starter Froakie from the Kalos region. First appeared in Pokemon X and Y (2013).\n\nBattles: Greninja was the ace of Ash's Kalos team, participating in some of the most high-octane battles in the anime's history, including the final against Alain's Charizard.\n\nSpecial Abilities & Gear: It has the 'Protean' ability, allowing it to change its type to match its moves. Its 'Battle Bond' form grants it a massive power boost and a unique appearance.\n\nSecret Trivia: Greninja was voted as the 'Pokemon of the Year' in a massive global poll in 2020. Its design is based on both common frogs and mythological ninjas who used frogs as familiars.",
    previewUrl: "/data/pokemon/assets/greninja-preview.png",
    backgroundUrl: "/data/pokemon/assets/greninja-preview.png", // Missing: greninja-background.png
    color: "#1e3a8a",
    powerScore: 275,
    gearBonus: 60, // Water Shuriken / Battle Bond
    prepBonus: 90, // Stealth/Ninja arts
    gearDescription: "### Shinobi Tools\n- **Compressed Water Shuriken**: Water pressurized into a solid, razor-sharp edge that can be thrown or used as a blade.\n- **Shadow Cloak**: Natural dark fur and skin that blends perfectly into moonlit or watery environments.",
    prepDescription: "### Tactical Camouflage\nGreninja uses its 'Protean' ability to blend into the specific environment, preparing a flurry of water shurikens for a surprise first strike.",
    triviaPool: [
      "Greninja was officially voted as the world's most popular Pokemon in a 2020 Google poll.",
      "The pink 'scarf' around its neck is actually its own long tongue wrapped around its body.",
      "It is the only Pokemon capable of achieving the 'Ash-Greninja' form through Battle Bond.",
      "Greninja's movements were choreographed to resemble traditional Japanese ninjutsu techniques.",
      "Its name is a combination of 'grenouille' (French for frog) and 'ninja'.",
      "Greninja's 'Protean' ability makes it one of the most versatile threats in competitive play."
    ],
  },
  {
    id: "gengar",
    name: "Gengar",
    universe: "Pokemon",
    description: "The Shadow Pokemon, a mischievous Ghost/Poison-type that hides in the dark.",
    lore: "**Gengar** is a Shadow Pokemon that lives in the shadows of people and buildings. It is notoriously mischievous, often playing pranks on travelers such as pretending to be their shadow and then laughing at their fear. However, beneath its playful exterior lies a more sinister nature; it is said that if you feel a sudden chill, a Gengar is lurking nearby, ready to steal your life force.\n\nIn battle, Gengar is an unpredictable trickster. It uses its ghost-like properties to phase through attacks and its poison-type nature to wear down opponents with status effects. It can Mega Evolve into a form that is half-buried in the ground, and in its Gigantamax form, its mouth becomes a massive portal to the underworld. Gengar is the quintessential ghost of the Pokemon world, a being that turns the darkness itself into a weapon of terror and amusement.",
    triviaInfo: "Origin: Evolution of Haunter and Gastly. First appeared in Pokemon Red and Blue (1996) as the final stage of the only Ghost-type line in the game.\n\nBattles: Gengar has been a competitive staple since the beginning. Ash recently used a Gengar capable of Gigantamaxing to win the World Coronation Series.\n\nSpecial Abilities & Gear: It can use 'Cursed Body' to disable opponent's moves. Its Gigantamax form's mouth is said to lead to the afterlife.\n\nSecret Trivia: There is a popular fan theory that Gengar is the shadow of a Clefable, as they share very similar body shapes. Gengar's name may be derived from 'Doppelganger'.",
    previewUrl: "/data/pokemon/assets/gengar-preview.png",
    backgroundUrl: "/data/pokemon/assets/gengar-background.png",
    color: "#6b21a8",
    powerScore: 255,
    gearBonus: 30, // Gengarite
    prepBonus: 110, // Trap setting/Trickery
    gearDescription: "### Shadow Relics\n- **Gengarite**: Allows Gengar to Mega Evolve, granting it the ability 'Shadow Tag' to prevent any foe from escaping the battlefield.\n- **Portal Throat**: A Gigantamax trait where its mouth acts as a direct conduit to a dimension of pure shadow energy.",
    prepDescription: "### Psychological Warfare\nGengar hides in the opponent's own shadow, draining their thermal energy and whispering terrifying thoughts to disorient them before the first blow.",
    triviaPool: [
      "Gengar is said to be able to hide in any shadow, including the shadows of its opponents.",
      "Its name is widely thought to be a shortened version of the word 'Doppelganger'.",
      "Gengar was one of the first two Pokemon ever shown in a battle (against Nidorino in the original intro).",
      "A popular fan theory suggests that Gengar is actually a deceased or 'shadowed' Clefable.",
      "In its Gigantamax form, its mouth is so large that it's rumored to lead directly to the afterlife.",
      "Despite its scary reputation, Gengar is often portrayed as a lovable, if destructive, prankster."
    ],
  },
  {
    id: "blastoise",
    name: "Blastoise",
    universe: "Pokemon",
    description: "The Shellfish Pokemon, a Water-type tank with powerful pressurized water cannons.",
    lore: "**Blastoise** is the final evolution of Squirtle and the definitive heavy artillery of the Pokemon world. It features two massive, retractable water cannons emerging from the top of its shell, which are capable of firing high-pressure blasts that can punch through thick steel or level a building. To withstand the recoil of its own attacks, Blastoise has developed an incredibly heavy and durable body, allowing it to plant its feet and become an immovable fortress.\n\nWhether using *Hydro Pump*, *Skull Bash*, or its Mega-Evolved form's massive singular cannon, Blastoise is a powerhouse of defense and long-range destruction. Its shell is virtually indestructible, and its ability to withdraw into it makes it one of the hardest Pokemon to defeat. Blastoise is a symbol of resilience and overwhelming firepower, a tank that moves with the unstoppable force of a tidal wave.",
    triviaInfo: "Origin: Final evolution of the Water starter Squirtle from the Kanto region. First appeared in Pokemon Red and Blue (1996).\n\nBattles: Blastoise was the ace of Gary Oak (Blue) in his final battle against Ash/Red. It is a symbol of the 'Tank' archetype in Pokemon combat.\n\nSpecial Abilities & Gear: It can Mega Evolve (developing a third, giant cannon) or Gigantamax (developing a shell covered in dozens of cannons). Its 'Rain Dish' ability allows it to heal in the rain.\n\nSecret Trivia: Blastoise's cannons are said to be more accurate than a precision rifle. In the original Pokemon Red/Blue, the cannons were described as being part of its biological shell, but later lore suggests they are mechanical-like biological structures.",
    previewUrl: "/data/pokemon/assets/blastoise-preview.png",
    backgroundUrl: "/data/pokemon/assets/blastoise-background.png",
    color: "#1d4ed8",
    powerScore: 310,
    gearBonus: 100, // Blastoisinite
    prepBonus: 30,
    gearDescription: "### Artillery Shell\n- **Pressurized Hydro-Cannons**: Bio-mechanical structures that can fire water at pressures high enough to cut through diamonds.\n- **Reinforced Carapace**: A shell that can withstand pressures found at the bottom of the deepest ocean trenches.",
    prepDescription: "### Hydration Protocol\nBlastoise absorbs hundreds of gallons of water into its internal reservoirs, maximizing the pressure and duration of its 'Hydro Pump' attacks.",
    triviaPool: [
      "Blastoise's water cannons are incredibly precise, capable of hitting a small can from over 160 feet away.",
      "It was the mascot for Pokemon Blue version, which was the counterpart to Charizard's Pokemon Red.",
      "The weight of its shell allows it to withstand the incredible recoil of its high-pressure water blasts.",
      "When it Mega Evolves, the two small cannons on its shell merge into one massive cannon on its back.",
      "Blastoise can learn 'Skull Bash', showing that its head is just as tough as its massive shell.",
      "In the original games, it was one of the few Pokemon whose sprites showed it shooting from its mouth instead of its cannons."
    ],
  },
  {
    id: "venusaur",
    name: "Venusaur",
    universe: "Pokemon",
    description: "The Seed Pokemon, a Grass/Poison-type that thrives under the sun.",
    lore: "**Venusaur** is the final evolution of Bulbasaur and a guardian of the forest. It carries a massive, blooming flower on its back which, when exposed to sunlight, releases a soothing scent that can calm individuals and even cause entire forests to flourish. Despite its peaceful appearance, Venusaur is a formidable combatant, using its powerful vines and specialized spores to control the battlefield and drain the energy of its foes.\n\nVenusaur's power is at its peak during the day, where it can cast the devastating *Solar Beam* without needing to charge. It can also utilize *Sleep Powder*, *Poison Powder*, and *Leech Seed* to cripple opponents before they can even strike. Through Mega Evolution and Gigantamaxing, its flower grows into a massive canopy that can shield it from almost any attack and release enough pollen to paralyze an entire army. Venusaur is the living heart of nature, a gentle giant that can become a verdant nightmare when its home is threatened.",
    triviaInfo: "Origin: Final evolution of the Grass starter Bulbasaur from the Kanto region. First appeared in Pokemon Red and Blue (1996).\n\nBattles: Venusaur is often seen as the most strategically versatile of the original starters. It was famously used by the champion Red to maintain control over the battlefield.\n\nSpecial Abilities & Gear: It possesses the 'Chlorophyll' ability, which doubles its speed in sunlight. Its Gigantamax form has a flower so large it can actually change the local weather.\n\nSecret Trivia: Venusaur is the only one of the original three final-stage starters that was also a Poison-type. In the original Japanese games, Bulbasaur was the very first entry in the Pokedex (Number 001).",
    previewUrl: "/data/pokemon/assets/venusaur-preview.png",
    backgroundUrl: "/data/pokemon/assets/venusaur-background.png",
    color: "#059669",
    powerScore: 305,
    gearBonus: 100, // Venusaurite
    prepBonus: 70, // Sunlight dependency/Pollen prep
    gearDescription: "### Floral Arsenal\n- **Giant Solaris Flower**: Acts as a massive solar panel, absorbing energy for its signature 'Solar Beam'.\n- **Prehensile Vines**: Thick, muscular vines hidden beneath its flower that can lift and throw targets ten times its size.",
    prepDescription: "### Photosynthetic Charge\nVenusaur positions itself in a sunlit clearing, fully opening its petals to saturate its cells with solar energy for instant-fire 'Solar Beam' capability.",
    triviaPool: [
      "Venusaur's flower is said to take on a more vibrant color when it's well-nourished by sunlight.",
      "The scent from its flower can calm the emotions of both humans and other Pokemon.",
      "It is the only one of the original Kanto starter evolutions to have a secondary type: Poison.",
      "When it Mega Evolves, a second flower emerges on its forehead, and its back flower becomes much larger.",
      "Venusaur's Gigantamax form features a flower so thick it acts as a canopy that blocks out the sky.",
      "Despite its bulk, Venusaur is remarkably agile with its vines, using them like extra limbs for movement."
    ],
  },
  {
    id: "snorlax",
    name: "Snorlax",
    universe: "Pokemon",
    description: "The Sleeping Pokemon, a massive Normal-type known for its immense bulk and appetite.",
    lore: "**Snorlax** is a gluttonous, mountain-sized Pokemon that spends most of its life sleeping. It requires over 880 pounds of food every day to be satisfied, and its stomach is strong enough to digest even rotten or moldy food without any ill effects. It is so placid that children often use its belly as a playground. However, when a Snorlax is actually awakened and ready for battle, it becomes an unstoppable wall of pure physical power.\n\nSnorlax's combat style is centered on its incredible durability and its ability to deal massive damage with its own weight, using moves like *Body Slam* and *Giga Impact*. It can also utilize its 'Pulverizing Pancake' Z-Move to flatten opponents. In its Gigantamax form, an entire ecosystem of grass, trees, and rocks grows on its belly, and it becomes a literal island of power. Snorlax is the ultimate tank, a being that proves that sometimes, the best defense is a good nap and a lot of mass.",
    triviaInfo: "Origin: Snorlax first appeared in Pokemon Red and Blue (1996) as a rare obstacle that blocked the player's path, requiring the Poke Flute to awaken.\n\nBattles: Snorlax has been a dominant force in competitive Pokemon for decades, particularly in the early 'Gold and Silver' era where it was nearly unbeatable.\n\nSpecial Abilities & Gear: It can have the 'Thick Fat' ability, which halves the damage from Fire and Ice attacks. Its Gigantamax form is the heaviest Pokemon in existence.\n\nSecret Trivia: Snorlax's design was inspired by Koji Nishino, a veteran designer at Game Freak who was known for his love of food and sleeping. It is often cited as the mascot for 'Pokemon Sleep'.",
    previewUrl: "/data/pokemon/assets/snorlax-preview.png",
    backgroundUrl: "/data/pokemon/assets/snorlax-preview.png", // Missing: snorlax-background.png
    color: "#334155",
    powerScore: 230,
    gearBonus: 10, // Leftovers
    prepBonus: 20, // Sleeping/Resting
    gearDescription: "### Glutton's Toolkit\n- **Leftovers**: A small bit of food that Snorlax nibbles on mid-fight to gradually restore its health.\n- **Snorlium Z**: A crystal that allows Snorlax to perform its earth-shattering 'Pulverizing Pancake' move.",
    prepDescription: "### Power Nap\nSnorlax takes a deep sleep before the match, entering the 'Rest' state to fully heal its stamina and prepare for a burst of 'Giga Impact' energy.",
    triviaPool: [
      "Snorlax will eat literally anything, including moldy food and small rocks, thanks to its powerful stomach acid.",
      "A Snorlax is not satisfied unless it eats about 900 pounds of food every single day.",
      "Its name is a combination of 'snore' and 'lax' (meaning relaxed).",
      "During the original games, you had to find a Poke Flute to wake up Snorlax and move it from the road.",
      "The design for Snorlax was based on Game Freak staff member Koji Nishino.",
      "When Gigantamaxed, a Snorlax's belly becomes so large that a small forest grows on top of it."
    ],
  },
  {
    id: "rayquaza",
    name: "Rayquaza",
    universe: "Pokemon",
    description: "The Sky High Pokemon, a legendary dragon that lives in the ozone layer.",
    lore: "**Rayquaza** is a massive, green, serpentine dragon that has lived for hundreds of millions of years in the Earth's ozone layer. It never descends to the ground except to quell the catastrophic battles between its fellow legendaries, Groudon and Kyogre. As the master of the weather, it possesses the 'Air Lock' ability, which can nullify any weather condition instantly. It is a celestial guardian, a being that watches over the planet from the very edge of space.\n\nRayquaza is one of the most powerful entities in existence, possessing the ability to Mega Evolve without the need for a Mega Stone—instead relying on the prayer-like 'Delta Stream' and its signature move, *Dragon Ascent*. In its Mega form, it gains a set of glowing energy filaments and a level of power that can shatter meteors large enough to destroy the world. Rayquaza is the apex predator of the skies, a dragon whose roar can be heard across the atmosphere, signifying the absolute authority of the heavens.",
    triviaInfo: "Origin: The trio master of the Hoenn region legendaries (alongside Groudon and Kyogre). First appeared in Pokemon Ruby and Sapphire (2002).\n\nBattles: Rayquaza is famous for descending from the Sky Pillar to stop the climatic battle in Pokemon Emerald and for destroying the Delta Meteor in the 'Delta Episode' of the remakes.\n\nSpecial Abilities & Gear: It is the only Pokemon that can Mega Evolve after learning a specific move (Dragon Ascent) instead of holding a stone. Its 'Delta Stream' ability protects flying Pokemon from their usual weaknesses.\n\nSecret Trivia: Rayquaza's design is based on the Ziz from Hebrew mythology, as well as Chinese dragons. In the 'Delta Episode,' it is revealed that Rayquaza was the first Pokemon ever to Mega Evolve in the history of the world.",
    previewUrl: "/data/pokemon/assets/rayquaza-preview.png",
    backgroundUrl: "/data/pokemon/assets/rayquaza-background.png",
    color: "#166534",
    powerScore: 600,
    gearBonus: 200, // Delta Stream/Mega Evolution
    prepBonus: 60, // Atmosphere saturation
    gearDescription: "### Celestial Maw\n- **Glowing Filaments**: Energy conduits that stabilize the atmosphere around Rayquaza during Mega Evolution.\n- **Meteorite Gizzard**: An internal organ that allows Rayquaza to consume meteorites and convert them into Mega Evolution energy.",
    prepDescription: "### Stratospheric Desaturation\nRayquaza circles the planet's ozone layer, absorbing cosmic radiation and purging the air of weather anomalies to ensure a clear 'Dragon Ascent' trajectory.",
    triviaPool: [
      "Rayquaza has lived in the ozone layer for hundreds of millions of years, feeding on water and meteorites.",
      "It is the only Pokemon that can Mega Evolve without the use of a held Mega Stone.",
      "Rayquaza was the very first Pokemon in history to ever Mega Evolve, according to Hoenn legend.",
      "Its name may come from 'rai' (Japanese for lightning) and 'quasar' (a celestial object).",
      "Rayquaza can fly through space and once destroyed a massive asteroid to save the Hoenn region.",
      "When Mega Evolved, it is widely considered one of the strongest Pokemon in the history of competitive play."
    ],
  },
];

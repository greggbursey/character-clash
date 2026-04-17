import { Character } from "../types";

export const lotrCharacters: Character[] = [
  {
    id: "frodo",
    name: "Frodo Baggins",
    universe: "Lord of the Rings",
    description: "The Ring-bearer of the Shire, whose resilience and pure spirit saved Middle-earth.",
    lore: "Frodo Baggins was a quiet, unassuming Hobbit from the Shire who inherited the One Ring from his uncle, Bilbo. Tasked with the impossible burden of reaching Mount Doom to destroy the Ring, Frodo's journey is one of immense physical and mental suffering. He is defined by his iron will, his resistance to the corrupting influence of Sauron, and his deep friendship with Samwise Gamgee.\n\nHis role in the War of the Ring was not as a warrior, but as a silent hero whose survival depended more on stealth and fortitude than on strength. After the Ring's destruction, he left Middle-earth for the Undying Lands, carrying the scars of his journey forever.",
    triviaInfo: "Origin: Born to Drogo Baggins and Primula Brandybuck. He moved to Bag End after his parents' death. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: His primary 'battle' was the long, grueling journey to Mordor. He survived the encounter with the Nazgûl at Weathertop and the venomous bite of Shelob in Cirith Ungol.\n\nSpecial Abilities & Gear: Frodo carries Sting, an Elven dagger that glows blue when Orcs are near, and wears a shirt of Mithril rings, which can turn aside even a troll's spear. He possesses the One Ring (though its use is restricted) and the Phial of Galadriel.\n\nSecret Trivia: Frodo was 50 years old when he left the Shire on his quest—much older than he appeared in the films. His name means 'wise' in Old English (Frōda).",
    previewUrl: "/data/lotr/assets/frodo-preview.webp",
    backgroundUrl: "/data/lotr/assets/frodo-background.webp",
    color: "#166534", // Hobbit Green
    powerScore: 65,
    gearBonus: 130, // Mithril/Sting/Phial
    prepBonus: 70,
    gearDescription: "### Hobbit's Resilience\n- **Sting**: An Elven blade that detects Orcs, providing an early warning system.\n- **Mithril Vest**: Light but indestructible armor capable of absorbing fatal impacts.",
    prepDescription: "### Undying Will\nFrodo enters a state of deep focus, drawing on the memory of the Shire to resist mental attacks and pain, allowing him to push through impossible odds.",
    triviaPool: [
      "In the books, Frodo is 50 years old when he sets out from the Shire, much older than portrayed in the films.",
      "Frodo shares a birthday, September 22, with his cousin Bilbo Baggins.",
      "His name in Old English, 'Frōda', translates to 'wise' or 'experienced'.",
      "After the destruction of the Ring, Frodo served as the Deputy Mayor of the Shire for a short time.",
      "Frodo is the only character mentioned in the Red Book to have survived both a Nazgûl's morgul-blade and a Troll's spear impact.",
      "He eventually departed Middle-earth for the Undying Lands to find healing for his psychological and physical scars."
    ],
  },
  {
    id: "samwise",
    name: "Samwise Gamgee",
    universe: "Lord of the Rings",
    description: "Frodo's loyal gardener and the true heart of the Fellowship.",
    lore: "Samwise 'Sam' Gamgee began his journey as Frodo's gardener and ended it as a hero of legend. His loyalty is absolute, his courage unwavering, and his optimism the only light in the darkness of Mordor. He famously 'carried' Frodo up the slopes of Mount Doom when the Ring-bearer's strength finally failed.\n\nSam is a character of hidden depths—a simple Hobbit who can stand against monsters like Shelob and Orc battalions when his friends are in danger. He is the only character to ever return the One Ring of his own free will after having worn it, showcasing his incorruptible spirit.",
    triviaInfo: "Origin: The son of Hamfast 'the Gaffer' Gamgee. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: His most legendary fight was against the ancient spider Shelob, whom he wounded with Sting and the Phial of Galadriel. He also single-handedly rescued Frodo from the Tower of Cirith Ungol.\n\nSpecial Abilities & Gear: He carries a variety of cooking gear (surprisingly useful in a pinch), an Elven rope that unknots on command, and, briefly, Sting and the Phial of Galadriel.\n\nSecret Trivia: Sam is often considered the 'true hero' of the story by J.R.R. Tolkien himself. After the war, he served as the Mayor of the Shire for seven consecutive seven-year terms.",
    previewUrl: "/data/lotr/assets/samwise-preview.webp",
    backgroundUrl: "/data/lotr/assets/samwise-background.webp",
    color: "#713f12", // Earthy Brown
    powerScore: 70,
    gearBonus: 80,
    prepBonus: 100, // Dedication/Spirit
    gearDescription: "### Gardener's Utility\n- **Elven Rope & Pans**: Versatile tools that can entangle foes or deliver unexpected physical impact.\n- **Lembas Bread**: Restores stamina and vitality in the midst of a long encounter.",
    prepDescription: "### Unyielding Loyalty\nSam focuses on protecting his companion (or his cause), gaining a massive defensive surge that makes him nearly impossible to stagger.",
    triviaPool: [
      "Sam is the only member of the Fellowship to come from a lowborn, working-class background.",
      "J.R.R. Tolkien explicitly called Sam Gamgee the 'true hero' of the story in his personal letters.",
      "Sam served as the Mayor of the Shire for seven consecutive seven-year terms after the war.",
      "He was the only person to ever return the One Ring of his own free will after having worn it (besides Tom Bombadil).",
      "Gandalf 'recruited' Sam by pulling him through a window after catching him eavesdropping on Bag End.",
      "Sam named his eldest daughter Elanor, after the sun-golden flowers he saw in Lothlórien."
    ],
  },
  {
    id: "gandalf",
    name: "Gandalf the White",
    universe: "Lord of the Rings",
    description: "A Maia sent to Middle-earth to guide the free peoples. The master of fire and wisdom.",
    lore: "Gandalf, also known as Olórin, is an Istari (Wizard) sent by the Valar to Middle-earth. Originally Gandalf the Grey, he fell in battle against the Balrog of Moria but was sent back as Gandalf the White, higher in power and authority. He is the master of strategy, the wielder of the Ring of Fire (Narya), and the guiding light for the Fellowship.\n\nHis power is not merely in spells, but in inspiration and wisdom. He can command light, fire, and the mind itself, standing as a direct peer to the most powerful beings in Middle-earth. He is a master duelist with his sword, Glamdring, and a powerful user of staff-magic.",
    triviaInfo: "Origin: A Maia created before the world began. He arrived in Middle-earth around the year 1000 of the Third Age. He first appeared in 'The Hobbit'.\n\nBattles: His duel with the Balrog of Moria spanned days and locations, from the depths of the earth to the peak of Celebdil. He led the defenses of Minas Tirith and Helm's Deep.\n\nSpecial Abilities & Gear: Wielder of Glamdring (Foe-hammer) and the Ring Narya. He can manipulate fire, light, and white energy. He rides Shadowfax, the lord of all horses.\n\nSecret Trivia: Gandalf's name means 'Elf-staff' in the language of Men. Despite his elderly appearance, his body is merely a vessel for his celestial spirit, which is immortal and extremely powerful.",
    previewUrl: "/data/lotr/assets/gandalf-preview.webp",
    backgroundUrl: "/data/lotr/assets/gandalf-background.webp",
    color: "#f8fafc", // Pure White
    powerScore: 5725,
    gearBonus: 250, // Glamdring / Narya
    prepBonus: 220,
    gearDescription: "### Wizard's Regalia\n- **Glamdring**: An ancient Elven blade that cuts through Orc-armor and echoes with magical resonance.\n- **Staff of the White**: Focuses raw celestial energy into blinding blasts and protective barriers.",
    prepDescription: "### Word of Command\nGandalf speaks a word of power that reshapes the local environment, creating a zone of sanctuary for allies and a barrier of fire for enemies.",
    triviaPool: [
      "Gandalf is a Maia, a divine spirit sent by the gods, existing before the world was even created.",
      "He was the secret bearer of Narya, the Ring of Fire, which helped him kindle hope in the hearts of others.",
      "In the tongue of the Elves (Sindarin), he is known as Mithrandir, meaning 'The Grey Pilgrim'.",
      "During his battle with the Balrog, Gandalf fought for two days and nights across the Endless Stair.",
      "Shadowfax, the lord of all horses, would only allow Gandalf to ride him, and did so without a saddle or bridle.",
      "Gandalf's name in Old Norse (Gandalfr) literally translates to 'Elf-staff' or 'Wand-elf'."
    ],
  },
  {
    id: "legolas",
    name: "Legolas Greenleaf",
    universe: "Lord of the Rings",
    description: "The Prince of the Woodland Realm, a master archer with supernatural reflexes.",
    lore: "Legolas is the son of King Thranduil of Mirkwood. A high elf of the Sindar, he possesses the typical elven traits of immortality, enhanced senses, and a deep connection to nature. As a member of the Fellowship, he provided the group's primary long-range firepower and scouting abilities.\n\nIn combat, Legolas is a whirlwind of precision. He can fire arrows with impossible speed and accuracy, even while moving across difficult terrain. His friendship with the dwarf Gimli is legendary, breaking centuries of racial animosity through shared hardship and mutual respect.",
    triviaInfo: "Origin: The Mirkwood Realm. His exact age is unknown, but he is likely hundreds, if not thousands, of years old. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: He fought in the Battle of the Hornburg, the Battle of the Pelennor Fields (famously taking down a Mûmakil single-handedly), and the Battle of the Black Gate.\n\nSpecial Abilities & Gear: Woodland Realm Longbow and Mirkwood daggers. He can walk on snow without sinking and see across vast distances with perfect clarity.\n\nSecret Trivia: Legolas' name means 'Green Leaf' in Sindarin. He is one of the few characters who never seems to tire, needing only to 'dream' while waking to rest his mind.",
    previewUrl: "/data/lotr/assets/legolas-preview.webp",
    backgroundUrl: "/data/lotr/assets/legolas-background.webp",
    color: "#4ade80", // Elf Green
    powerScore: 205,
    gearBonus: 60,
    prepBonus: 60,
    gearDescription: "### Elven Arsenal\n- **Galadhrim Bow**: A long-range weapon of immense power that never misses its mark at medium range.\n- **White Knives**: Used for rapid, close-quarters combat where arrows are impractical.",
    prepDescription: "### Elf-Senses\nLegolas enters a heightened state of awareness, allowing him to track heat signatures and subtle movements through walls or cover.",
    triviaPool: [
      "Legolas is a Prince of Mirkwood, the son of King Thranduil who appeared in 'The Hobbit'.",
      "He has the Elven ability to 'dream' while walking, allowing him to travel for days without traditional sleep.",
      "Legolas is unique among the Fellowship for being able to walk on top of deep snow without sinking.",
      "His friendship with Gimli the Dwarf was considered the most unusual bond in the Third Age.",
      "Legolas' vision was so sharp he could count the riders of Rohan from over fifteen leagues away.",
      "After the war, he brought a colony of Silvan Elves to live in the woods of Ithilien."
    ],
  },
  {
    id: "gimli",
    name: "Gimli son of Glóin",
    universe: "Lord of the Rings",
    description: "A noble dwarf-warrior, a master of the axe and a stalwart companion.",
    lore: "Gimli is the son of Glóin, one of the dwarves who accompanied Bilbo on the quest to Erebor. Representing the Dwarves in the Fellowship, Gimli embodies the strength, endurance, and stubbornness of his people. He is a fierce warrior who relishes the heat of battle, often competing with Legolas for the highest kill count.\n\nDespite his rough exterior, Gimli is a man of deep emotion and appreciation for beauty, particularly the beauty of the Glimmering Caves and the Lady Galadriel. His loyalty to his friends is unshakable, and his endurance allows him to march for days without rest.",
    triviaInfo: "Origin: The Ered Luin (Blue Mountains). He is a descendant of Durin the Deathless. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: He survived the treacherous paths of Moria, the Siege of Helm's Deep, and the final assault on the Black Gate. He is known for his signature 'Leap' and heavy axe strikes.\n\nSpecial Abilities & Gear: He wields a massive double-bitted battle-ax and a smaller walking ax. He wears heavy chainmail of dwarven make.\n\nSecret Trivia: Gimli was given three strands of hair by Galadriel—a gift she had famously refused to the elf-king Fëanor himself. He later became the Lord of the Glimmering Caves.",
    previewUrl: "/data/lotr/assets/gimli-preview.webp",
    backgroundUrl: "/data/lotr/assets/gimli-background.webp",
    color: "#991b1b", // Dwarf Red/Iron
    powerScore: 183,
    gearBonus: 40,
    prepBonus: 40,
    gearDescription: "### Khazâd Armory\n- **Bearded Battle-Axe**: A heavy weapon designed to shatter shields and cleave through the toughest hides.\n- **Dwarven Chainmail**: Exceptionally dense armor that provides high resistance to physical damage.",
    prepDescription: "### Baruk Khazâd!\nGimli lets out a thunderous war cry, boosting his physical strength and morale, making him immune to fear-based debuffs.",
    triviaPool: [
      "Gimli is the son of Glóin, one of the original 13 dwarves who traveled with Bilbo to Erebor.",
      "He was the first dwarf to enter Lothlórien in over a thousand years, eventually earning the title 'Elf-friend'.",
      "Galadriel gave Gimli three strands of her hair—a gift she had famously denied to the great Elf-king Fëanor.",
      "Gimli eventually became the Lord of the Glittering Caves, a massive dwarven colony at Helm's Deep.",
      "Legend says Gimli was so devoted to Legolas that he was permitted to sail to the Undying Lands with him.",
      "He is the only Dwarf mentioned in the history of Middle-earth to have ever set foot in the Undying Lands."
    ],
  },
  {
    id: "balrog",
    name: "The Balrog of Morgoth",
    universe: "Lord of the Rings",
    description: "A demon of the ancient world, a shadow and flame known as Durin's Bane.",
    lore: "The Balrog, specifically 'Durin's Bane,' is a Maia corrupted by Melkor (Morgoth) in the world's dawn. It is a being of colossal physical power and ancient malice, wielding a whip of fire and a sword of shadow. Having slept in the deep roots of Moria for ages, it was awakened by the greed of the dwarves who delved too deep.\n\nThe Balrog is not merely a monster, but a fallen angel-class entity. It is immune to mundane weapons and can only be challenged by beings of similar spiritual stature, such as Gandalf. Its presence is enough to break the courage of entire armies, and its heat can melt the air itself.",
    triviaInfo: "Origin: A Maia of fire and shadow. It fled the ruin of Morgoth's forces and hid in the deep of Moria. It first appeared in 'The Fellowship of the Ring'.\n\nBattles: Its primary battle was against Gandalf the Grey on the Bridge of Khazad-dûm, and later on the Endless Stair of Celebdil.\n\nSpecial Abilities & Gear: Multi-tailed whip of fire and a massive black sword. It can shroud itself in 'Shadow and Flame,' making it nearly impossible to see or strike accurately.\n\nSecret Trivia: The question of whether Balrogs have wings is one of the most famous debates in Tolkien history. They are described as being 'about the size of two men' but possessing vast spiritual shadows.",
    previewUrl: "/data/lotr/assets/balrog-preview.webp",
    backgroundUrl: "/data/lotr/assets/balrog-background.webp",
    color: "#450a0a", // Shadow/Flame Crimson
    powerScore: 5230,
    gearBonus: 130, // Whip of Fire
    prepBonus: 0,
    gearDescription: "### Demonic Armory\n- **Whip of Fire**: A multi-stranded whip that entangles and incinerates anything it touches.\n- **Shadow Clout**: A natural aura that snuffs out light and makes it difficult for enemies to see or target the Balrog.",
    prepDescription: "### Terror of the Deep\nThe Balrog roars, unleashing a wave of demonic shadow that paralyses non-magical opponents with a primal fear of the ancient dark.",
    triviaPool: [
       "Balrogs were originally angelic beings called Maiar, who were corrupted by Melkor (Morgoth) in the world's youth.",
       "Durin's Bane was so powerful it single-handedly drove the Dwarves out of the entire kingdom of Moria.",
       "The debate over whether Balrogs have physical wings is one of the oldest and fiercest in Tolkien fandom.",
       "Gandalf and the Balrog's duel is one of the longest in literary history, spanning multiple days of combat.",
       "In the first drafts of 'The Silmarillion', Morgoth had an army of thousands of Balrogs, but Tolkien later reduced their number significantly.",
       "The Balrog's whips are made of living fire, while its blades are forged from the substance of shadow itself."
    ],
  },
  {
    id: "sauron",
    name: "Sauron",
    universe: "Lord of the Rings",
    description: "The Dark Lord of Mordor, the master of the One Ring and the forge of power.",
    lore: "Sauron was originally Mairon, a high Maia of Aulë the Smith, before being corrupted by Morgoth. Known as the 'Abhorred,' he is the primary antagonist of the Second and Third Ages. He is a master of deception, shape-shifting, and ancient smith-craft. He forged the **One Ring** to rule over all other Rings of Power, binding the fate of Middle-earth to his own.\n\nIn his physical form at the peak of his power, Sauron is a juggernaut of black iron and malevolence. He wields a massive mace that can shatter entire ranks of warriors with a single swing. However, his greatest power is his ability to dominate the wills of others, twisting monarchs and heroes into his servants through fear and manipulation.",
    triviaInfo: "Origin: A Maia created by Eru before the beginning of time. He served as Morgoth's lieutenant before becoming the second Dark Lord. First appeared by name in 'The Hobbit' (as the Necromancer).\n\nBattles: He led the War of the Elves and Sauron, the Fall of Númenor (as a deceiver), and the War of the Last Alliance, where he was defeated by Isildur at the foot of Mount Doom.\n\nSpecial Abilities & Gear: The One Ring (Master Ring). A massive black mace. Mastery of sorcery, necromancy, and smith-craft. He is 'the lidless eye' who sees all.\n\nSecret Trivia: Sauron once held the shape of a beautiful man named Annatar, 'Lord of Gifts,' to deceive the elven-smiths into forging the Rings of Power. He lost his ability to take a fair form after the destruction of Númenor.",
    previewUrl: "/data/lotr/assets/sauron-preview.webp",
    backgroundUrl: "/data/lotr/assets/sauron-background.webp",
    color: "#18181b", // Mordor Black/Volcano
    powerScore: 7375,
    gearBonus: 400, // The One Ring / Mace
    prepBonus: 100,
    gearDescription: "### The Abhorred's Tools\n- **The One Ring**: Grants near-limitless power, invisibility (to mortals), and the ability to dominate the minds of any who wear a Lesser Ring.\n- **Black Iron Mace**: A devastating weapon that shatters bone and armor effortlessly.",
    prepDescription: "### Dominating Presence\nSauron projects his will directly into his opponent's mind, dredging up their deepest desires and twisting them into a paralyzing sense of futility.",
    triviaPool: [
      "Sauron was originally Mairon, a student of the god of smithing, which is how he learned to forge the Rings.",
      "During the Second Age, he surrendered to Númenor and successfully corrupted their entire civilization from within.",
      "The 'Eye of Sauron' is a manifestation of his will, but in the books, he still possessed a physical humanoid form.",
      "Sauron lost the ability to take a 'fair and beautiful' form after the drowning of Númenor by the gods.",
      "He was once defeated in single combat by a giant hound named Huan during the First Age.",
      "Sauron's original name, Mairon, meant 'The Admirable', which he used before becoming 'The Cruel'."
    ],
  },
  {
    id: "morgoth",
    name: "Morgoth Bauglir",
    universe: "Lord of the Rings",
    description: "The first Dark Lord, a fallen Valar and the source of all evil in the world.",
    lore: "Morgoth, originally Melkor, was the most powerful of the Ainur (spirits) created by Eru. He alone amongst the Valar rebelled, seeking to disrupt the Music of the Ainur and claim the world for his own. He is the original source of all shadows, the creator of Orcs, Trolls, and Dragons. He is not just a king, but a god-level entity of pure, primeval malice.\n\nIn the First Age, he ruled from his fortress of Angband, wearing the **Iron Crown** with the three stolen **Silmarils**. His physical form is colossal—a mountain of shadow and armor. He was eventually defeated and cast into the Void, but his influence remains the bedrock upon which all subsequent evil in Middle-earth was built.",
    triviaInfo: "Origin: The first of the Ainur in the Timeless Halls. He arrived in Arda before the beginning of life. He first appeared in 'The Silmarillion'.\n\nBattles: He fought the War for the Sake of the Elves and the War of the Great Jewels. He famously dueled Fingolfin, the High King of the Noldor, at the gates of Angband.\n\nSpecial Abilities & Gear: Grond (The Hammer of the Underworld). The Iron Crown of Angband. Near-absolute command over elemental shadow, ice, and fire.\n\nSecret Trivia: The name 'Morgoth' was given to him by Fëanor after he killed Fëanor's father and stole the Silmarils. It means 'Black Foe of the World'. Before that, he was only called Melkor, 'He Who Arises in Might'.",
    previewUrl: "/data/lotr/assets/morgoth-preview.webp",
    backgroundUrl: "/data/lotr/assets/morgoth-background.webp",
    color: "#09090b", // Abyssal Black
    powerScore: 8200,
    gearBonus: 800, // Grond / Iron Crown
    prepBonus: 250,
    gearDescription: "### Titan of Shadow\n- **Grond**: A hammer so large it leaves craters like lightning strikes, potentially shattering the floor of the arena.\n- **The Iron Crown**: Contains the Silmarils, which burn with a holy light that Morgoth's enemies cannot bear to look upon.",
    prepDescription: "### Melkor's Music\nMorgoth hums a dissonant theme from the beginning of time, warping the laws of physics and magic in the immediate area to favor chaos and destruction.",
    triviaPool: [
      "Morgoth (Melkor) was the most powerful spirit ever created, possessing parts of all the other gods' powers.",
      "He is the original source of all evil in Middle-earth, including Orcs, Trolls, and Dragons.",
      "Morgoth once fought a duel with the Elf-king Fingolfin, who managed to wound him seven times before falling.",
      "His hammer, Grond, was named after the 'Hammer of the Underworld' and shook the earth with every strike.",
      "After his final defeat, he was cast out of the world and into the Void, where he remains until the end of time.",
      "He is the only character whom Tolkien ever described as being capable of striking fear into the heart of a god."
    ],
  },
  {
    id: "witchking",
    name: "The Witch-king of Angmar",
    universe: "Lord of the Rings",
    description: "The Lord of the Nazgûl and the most terrifying servant of Sauron.",
    lore: "The Witch-king was once a mortal king of Men who was corrupted by one of the nine Rings of Power. He became the chief of the **Nazgûl** (Ringwraiths), a being neither dead nor alive, existing primarily in the Wraith-world. He is the master of sorcery and fear, the architect of the fall of Arnor, and the commander of Sauron's armies during the Siege of Minas Tirith.\n\nHe is bound by a prophecy that 'no living man may hinder him,' making him nearly invulnerable to standard weapons. He wields a Morgul-blade, whose tip can break off inside a victim and turn them into a wraith, and a massive black mace that he uses with supernatural strength.",
    triviaInfo: "Origin: A human king of the Second Age. He received his Ring around 2251. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: He led the conquest of the northern kingdoms of Arnor. He famously fought at the Pelennor Fields, where he shattered Eowyn's shield-arm before being defeated by her and Merry.\n\nSpecial Abilities & Gear: Morgul-blade, heavy black mace, and a fell-beast (mount). He can unleash a 'Black Breath' that causes despair and sickness in his enemies.\n\nSecret Trivia: He founded the kingdom of Angmar specifically to destroy the Dúnedain kingdoms of the north while Sauron was still rebuilding his power in secret. His true human name was lost to history.",
    previewUrl: "/data/lotr/assets/witchking-preview.webp",
    backgroundUrl: "/data/lotr/assets/witchking-background.webp",
    color: "#334155", // Wraith Grey/Iron
    powerScore: 4570,
    gearBonus: 220, // Morgul Blade / Mace
    prepBonus: 90,
    gearDescription: "### Lord of Wraiths\n- **Morgul-blade**: A cursed dagger that inflicts a slowly-corrupting wound, reducing the opponent's max HP over time.\n- **Massive Flail**: A heavy chain-weapon capable of shattering stone and steel with minimal effort.",
    prepDescription: "### Black Breath Unleashed\nThe Witch-king screams a soul-shattering cry that forces his opponent to make a check against their own courage, potentially freezing them in terror.",
    triviaPool: [
      "The Witch-king's true human name from the Second Age has been lost even to the longest memories of the Elves.",
      "He established the kingdom of Angmar in order to collapse the northern human kingdoms while Sauron was weak.",
      "The prophecy that 'no living man' could kill him was given by the Elf Glorfindel centuries before the War of the Ring.",
      "His weapon in the books was a mace, though the films often portray him wielding a massive flail.",
      "The Witch-king once fought Gandalf at the gates of Minas Tirith, a confrontation interrupted by the arrival of Rohan.",
      "He possessed the gift of 'prophetic sight', which he used to coordinate the movements of Sauron's armies."
    ],
  },
  {
    id: "aragorn",
    name: "Aragorn II Elessar",
    universe: "Lord of the Rings",
    description: "The rightful heir to the throne of Gondor and the greatest human warrior of the Third Age.",
    lore: "Aragorn, son of Arathorn, is the 16th Chieftain of the Dúnedain and the descendant of Isildur. Raised in secret by Elrond in Rivendell, he spent decades as a Ranger of the North, known as **Strider**. He is a polymath, a master tracker, a skilled healer, and a peerless swordsman. His lineage grants him a lifespan and physical vitality far beyond that of normal men.\n\nHe led the Fellowship after Gandalf's fall and eventually accepted his destiny to become King Elessar of the Reunited Kingdom. His journey is one of humility and duty, proving that the strength of Men could still stand against the darkness of Mordor. He wields Andúril, the reforged blade that was once Narsil.",
    triviaInfo: "Origin: Born in the year 2931 of the Third Age. He was raised as 'Estel' (Hope) in Rivendell to keep his bloodline secret from Sauron. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: He fought in countless skirmishes as a Ranger. He led the defense of Helm's Deep and commanded the Host of the West at the Black Gate.\n\nSpecial Abilities & Gear: Andúril, Flame of the West. He is a master of Athelas (kingsfoil) healing. He can command the Army of the Dead due to his heredity.\n\nSecret Trivia: Aragorn was 87 years old during the War of the Ring, appearing like a man in his prime due to his Númenórean blood. He lived to be 210 years old.",
    previewUrl: "/data/lotr/assets/aragorn-preview.webp",
    backgroundUrl: "/data/lotr/assets/aragorn-background.webp",
    color: "#475569", // Ranger Grey/King Blue
    powerScore: 190,
    gearBonus: 60,
    prepBonus: 60,
    gearDescription: "### Heir of Isildur\n- **Andúril**: A holy blade reforged from the shards of Narsil, which glows with the light of the sun and moon.\n- **Star of Elendil**: A jewel that enhances his natural leadership and clarity of vision.",
    prepDescription: "### Ranger's Focus\nAragorn uses the terrain to his advantage, setting snares or finding a superior tactical position that increases his chances of a critical strike.",
    triviaPool: [
      "Aragorn was 87 years old during the War of the Ring, appearing like a man in his prime due to his blessed ancestry.",
      "He was raised in secret in Rivendell as 'Estel' (meaning 'Hope') to protect him from Sauron's hunters.",
      "Aragorn spent his youth traveling in disguise under the name Thorongil, serving as a captain for Gondor and Rohan.",
      "He is the 16th Chieftain of the Dúnedain and a direct descendant of the King who cut the Ring from Sauron.",
      "His sword, Andúril, was reforged from the shards of Narsil, which had been broken for over 3,000 years.",
      "Aragorn was so skilled in healing that he could cure the 'Black Breath' of the Nazgûl using the herb Athelas."
    ],
  },
  {
    id: "galadriel",
    name: "Galadriel",
    universe: "Lord of the Rings",
    description: "The Lady of Lothlórien, the most powerful and beautiful of the Elves remaining in Middle-earth.",
    lore: "Galadriel is a royal elf of Lothlórien, one of the Noldor who left the Undying Lands in the First Age. She is the bearer of **Nenya**, the Ring of Adamant, which she uses to preserve the beauty and safety of her realm. Her wisdom is legendary, and her power is such that she can see into the minds of others and perceive the movements of the Dark Lord from afar.\n\nIn the Third Age, she was one of the greatest obstacles to Sauron's dominion. She is a master of 'Elven Magic' (which elves simply call an inherent art), capable of creating illusions, healing, and reflecting light that is lethal to the servants of darkness. Her beauty and majesty are so great that many find it difficult to even look upon her.",
    triviaInfo: "Origin: Born in Valinor before the First Age. She is the daughter of Finarfin and Eärwen. She first appeared in 'The Fellowship of the Ring'.\n\nBattles: She was instrumental in the White Council's attack on Dol Guldur, where she personally threw down the walls of the fortress and purified the forest.\n\nSpecial Abilities & Gear: Wielder of Nenya. The Phial of Galadriel (which she gave to Frodo). She can communicate via telepathy and perceive the 'unseen' world.\n\nSecret Trivia: Galadriel was once offered the One Ring by Frodo. She successfully resisted the temptation, an act that finally earned her the right to return to the Undying Lands after thousands of years of exile.",
    previewUrl: "/data/lotr/assets/galadriel-preview.webp",
    backgroundUrl: "/data/lotr/assets/galadriel-background.webp",
    color: "#fef3c7", // Golden Elf Light
    powerScore: 6220,
    gearBonus: 175, // Nenya / Mirror
    prepBonus: 250,
    gearDescription: "### Light of Eärendil\n- **Nenya**: A Ring of Power that preserves and protects, making the immediate area highly resistant to dark magic and entropy.\n- **Mirror of Galadriel**: (Conceptual) allows her to see 'things that are, things that were, and some things that have not yet come to pass'.",
    prepDescription: "### Elven Foresight\nGaladriel gazes into the future of the battle, predicting her opponent's every move and adjusting her magical defenses seconds before they are needed.",
    triviaPool: [
      "Galadriel was born in Valinor before the First Age began, making her one of the oldest beings in Middle-earth.",
      "She is the grandmother of Arwen and the mother-in-law of Elrond.",
      "Her hair was said to have captured the light of the Two Trees of Valinor, which inspired the creation of the Silmarils.",
      "She was a leader in the rebellion of the Noldor Elves, but was the only leader to be pardoned and allowed to return to the West.",
      "Galadriel successfully defended Lothlórien from three separate Orc invasions during the War of the Ring.",
      "She used her power to destroy the walls of the dark fortress Dol Guldur after Sauron was defeated."
    ],
  },
  {
    id: "saruman",
    name: "Saruman the White",
    universe: "Lord of the Rings",
    description: "The head of the White Council who was corrupted by his own desire for power.",
    lore: "Saruman, also known as Curumo, was the leader of the Istari (Wizards) and the most knowledgeable about the Rings of Power. However, his pride and his use of the **Palantír** of Orthanc led him to be corrupted by Sauron. He sought to create his own Ring and raised an army of **Uruk-hai** to take Middle-earth for himself.\n\nSaruman's power lies in his voice—a hypnotic, persuasive force that can bend even the strongest wills to his service. He is a master technician, blending magic with industrial machinery to create devastating weapons. Though he fell from grace, his magical potency remains immense, rivaling Gandalf's.",
    triviaInfo: "Origin: A Maia created before the world. He arrived in Middle-earth as the most powerful of the five Wizards. He first appeared in 'The Fellowship of the Ring'.\n\nBattles: He orchestrated the invasion of Rohan and the Siege of Helm's Deep. His 'battle' was often one of logistics and psychological warfare from his tower of Orthanc.\n\nSpecial Abilities & Gear: The Staff of Saruman. The Palantír of Orthanc. A voice of absolute command. Mastery of 'The Voice' and industrial alchemy.\n\nSecret Trivia: Saruman actually succeeded in forging his own 'Lesser Ring,' which he used to enhance his own power (he calls himself 'Saruman Ring-maker'). His name in the language of the North means 'Man of Skill'.",
    previewUrl: "/data/lotr/assets/saruman-preview.webp",
    backgroundUrl: "/data/lotr/assets/saruman-background.webp",
    color: "#64748b", // Orthanc Grey/White
    powerScore: 5560,
    gearBonus: 220, // Palantír / Staff
    prepBonus: 130,
    gearDescription: "### Orthanc Industrialism\n- **The Palantir of Orthanc**: A seeing-stone that grants global awareness and mental pressure on enemies.\n- **Saruman's Ring**: A self-forged ring that amplifies his natural authority and magical focus.",
    prepDescription: "### The Voice of Saruman\nSaruman speaks with a layered, musical voice that slowly erodes the opponent's will to fight, causing them to doubt their own strikes and purpose.",
    triviaPool: [
      "Saruman was the head of the White Council, chosen over Gandalf because of his vast knowledge of the Rings of Power.",
      "He attempted to forge his own Ring, which is why he calls himself 'Saruman Ring-maker' in the books.",
      "His name in the language of the North, 'Saruman', means 'Man of Skill' or 'Cunning Man'.",
      "He was once the most powerful of the five Wizards, but lost his authority (and his staff) to Gandalf the White.",
      "Saruman used a Palantír (Seeing Stone) to communicate with Sauron, which led to his eventual corruption and fall.",
      "After the War, he attempted to take control of the Shire under the alias 'Sharkey' before his final defeat."
    ],
  },
  {
    id: "treebeard",
    name: "Treebeard",
    universe: "Lord of the Rings",
    description: "The oldest of the Ents, a shepherd of trees with ancient strength.",
    lore: "Treebeard, or Fangorn, is the oldest living creature in Middle-earth (alongside Tom Bombadil). An Ent, he is a 'Shepherd of the Trees,' tasked with protecting the forests from destruction. He is slow to anger, but when 'roused' by the industrial devastation of Saruman, he led the Ents in a unstoppable assault on Isengard.\n\nTreebeard possesses immense physical strength—he can crush stone like bread and move with a ponderous but inevitable force. He is highly resistant to most humanoid weapons and carries the weight of thousands of years of memory. Being 'hasty' is his greatest dislike; he calculates every move with the patient wisdom of a forest.",
    triviaInfo: "Origin: One of the 'First-born' of the world, created by Yavanna to protect the trees. He first appeared in 'The Two Towers'.\n\nBattles: The Last March of the Ents against Isengard, where his people destroyed the dams and flooded the industrial pits of Saruman.\n\nSpecial Abilities & Gear: Immense height and density. Root-like limbs capable of shattering fortresses. Long-range rock throwing.\n\nSecret Trivia: Treebeard's real name is so long that it contains the entire history of his life and his forest. He is'very old, even for an Ent,' and is one of the few who still remembers the Entwives who were lost ages ago.",
    previewUrl: "/data/lotr/assets/treebeard-preview.webp",
    backgroundUrl: "/data/lotr/assets/treebeard-background.webp",
    color: "#3f6212", // Forest Green/Bark
    powerScore: 3250,
    gearBonus: 0,
    prepBonus: 175, // Patient Growth
    gearDescription: "### Living Fortress\n- **Battering Limbs**: Branches as hard as iron that can smash through any conventional defense.\n- **Ancient Roots**: Grants immunity to knockback and a constant, slow regeneration while standing on soil.",
    prepDescription: "### The Ents' March\nTreebeard begins a slow, rhythmic chant that summons the spirits of the forest, causing the ground to shake and roots to entangle the opponent's feet.",
    triviaPool: [
      "Treebeard is the oldest living thing that still walks under the Sun in Middle-earth.",
      "He is a 'Shepherd of the Trees', an Ent created by the gods to protect forests from being cut down by other races.",
      "According to Treebeard, it takes a very long time to say anything in Old Entish, as names contain entire histories.",
      "The Ents were so slow to act that they hadn't held an 'Entmoot' (meeting) for hundreds of years before Merry and Pippin arrived.",
      "Treebeard is over 14 feet tall and has skin like the bark of a tree and eyes like deep wells of light.",
      "He is one of the very few characters who could survive drinking the powerful, growth-inducing 'Ent-draught'."
    ],
  },
  {
    id: "gollum",
    name: "Gollum",
    universe: "Lord of the Rings",
    description: "A creature twisted by the One Ring, consumed by his obsession with his 'Precious'.",
    lore: "Gollum was once a Hobbit-like creature named Sméagol before he found the One Ring. The Ring's influence extended his life for over 500 years, twisting his body and mind into a pale, skeletal shadow. He possesses a dual personality—the remains of Sméagol and the murderous Gollum—both driven by an insatiable need for the Ring.\n\nGollum is a master of stealth and survival in the harshest environments. He is surprisingly strong for his size and can climb sheer stone walls with ease. In combat, he relies on ambushes, strangulation, and his near-invisible movement in the dark. He is a tragic figure, both a victim and a villain.",
    triviaInfo: "Origin: A Stoor Hobbit from the Gladden Fields. He first appeared in 'The Hobbit'.\n\nBattles: He spent centuries hunting 'the thief' (Bilbo and then Frodo). He fought the orcs of Cirith Ungol and finally battled Frodo at the Crack of Doom.\n\nSpecial Abilities & Gear: Master of stealth and climbing. Extremely resilient to physical hardship. He has no gear but his own 'wicked' teeth and hands.\n\nSecret Trivia: Gollum's name comes from the wet, gurgling sound he makes in his throat. He lived in the roots of the Misty Mountains for nearly 500 years, eating raw fish and the occasional lone goblin.",
    previewUrl: "/data/lotr/assets/gollum-preview.webp",
    backgroundUrl: "/data/lotr/assets/gollum-background.webp",
    color: "#52525b", // Cave Grey
    powerScore: 55,
    gearBonus: 0,
    prepBonus: 175, // Stealth/Ambush
    gearDescription: "### Twisted Survivalist\n- **Climbing Claws**: Allows him to move across any vertical surface at full speed and strike from unexpected angles.\n- **Precious-Seeking Eyes**: Can see perfectly in absolute darkness, negating any concealment based on light.",
    prepDescription: "### Sneaking and Skulking\nGollum vanishes into the shadows, becoming untargetable for a brief duration before reappearing for a high-damage critical strike to the opponent's back.",
    triviaPool: [
      "Gollum was once a Hobbit-like creature named Sméagol before the One Ring twisted him beyond recognition.",
      "He lived for nearly 500 years in the dark, damp caves of the Misty Mountains, sustained by the Ring's power.",
      "The sound 'Gollum' is actually a wet, swallowing noise he makes in his throat, which became his nickname.",
      "Gollum developed a dual personality: 'Sméagol' (remnants of his old self) and 'Gollum' (the corruptive influence).",
      "He is a master of riddles, having played (and nearly won) a game for his life against Bilbo Baggins.",
      "Gollum's favorite food was 'raw and wriggling' fish, as he grew to detest anything cooked or elven-made."
    ],
  },
  {
    id: "ungoliant",
    name: "Ungoliant",
    universe: "Lord of the Rings",
    description: "The primeval spider-demon of the abyss, who consumed the light of the Two Trees.",
    lore: "Ungoliant is a primordial being of darkness in the shape of a monstrous spider. Her origins are unknown, but she is suggested to have come from the Void itself. She was Morgoth's first and most terrifying ally in the First Age, helping him destroy the **Two Trees of Valinor** and consuming their light to grow to a colossal, world-threatening size.\n\nUngoliant is not just a monster, but a cosmic hunger. She creates 'Unlight,' a supernatural darkness that no light can pierce. She grew so powerful after consuming the light of Valinor that she nearly overpowered Morgoth himself when he refused to give her the Silmarils. She is the mother of all Great Spiders, including Shelob.",
    triviaInfo: "Origin: The Void or the darkness surrounding Arda. She first appeared in 'The Silmarillion'.\n\nBattles: She and Morgoth together devastated Valinor. She later fought Morgoth and his Balrogs when they disputed over the stolen gems.\n\nSpecial Abilities & Gear: Unlight (Darkness that consumes light). Web of Shadow. Nigh-infinite growth based on consumption. She has no gear, being a force of nature.\n\nSecret Trivia: Ungoliant was so eternally hungry that it is said she eventually consumed herself when there was nothing else left to eat. Her name means 'Dark Spider' in Sindarin.",
    previewUrl: "/data/lotr/assets/ungoliant-preview.webp",
    backgroundUrl: "/data/lotr/assets/ungoliant-background.webp",
    color: "#0c0a09", // Void Black
    powerScore: 7870,
    gearBonus: 0,
    prepBonus: 50,
    gearDescription: "### Primeval Hunger\n- **Web of Shadow**: A binding agent that not only traps the body but drains the spiritual light/energy of the victim.\n- **Venom of the Void**: A toxin that causes hallucinations and rapid physical decay.",
    prepDescription: "### Unlight Suffocation\nUngoliant vomits a cloud of absolute blackness that snuff's out all light-based abilities and reduces the opponent's vision to zero for a long duration.",
    triviaPool: [
      "Ungoliant is a primordial being of darkness that took the form of a spider but originated from the Void.",
      "She grew so powerful by consuming the light of the Two Trees that she nearly killed Morgoth in a fight over the Silmarils.",
      "The darkness she produces is 'Unlight', a magical gloom that consumes all physical light that enters it.",
      "Ungoliant is the mother of the Great Spiders, including Shelob from 'The Lord of the Rings' and those in Mirkwood.",
      "Her hunger was so insatiable that legend says she eventually consumed herself when nothing else remained to eat.",
      "The 'Spider of Night' is one of her many terrifying titles in the ancient records of the Elves."
    ],
  },
];



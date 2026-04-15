import { Character } from "../types";

export const hpCharacters: Character[] = [
  {
    id: "harrypotter",
    name: "Harry Potter",
    universe: "Harry Potter",
    description: "The Boy Who Lived, a natural seeker and the only one to survive the Killing Curse.",
    lore: "Harry Potter was born to James and Lily Potter, two powerful wizards who defied the Dark Lord Voldemort. After his parents were murdered, Harry was left with a lightning bolt scar and the distinction of being the first known survivor of the Avada Kedavra curse. Raised in the muggle world by his unkind relatives, his life changed when he received his invitation to Hogwarts School of Witchcraft and Wizardry.\n\nThroughout his years at Hogwarts, Harry faced numerous trials, from uncovering the secrets of the Sorcerer's Stone to leading the **Dumbledore's Army**. He is characterized by his immense courage, loyalty to his friends, and his uncanny ability to perform under pressure. As the 'Chosen One,' he eventually fulfilled the prophecy by destroying Voldemort's Horcruxes and defeating the Dark Lord in the Battle of Hogwarts.",
    triviaInfo: "Origin: Born July 31st to Lily and James Potter in Godric's Hollow. He is a descendant of Ignotus Peverell, the original owner of the Invisibility Cloak. He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: His most significant conflict was the multi-year hunt for Horcruxes and the final duel with Voldemort. He has survived encounters with Basilisks, Dementors, and the Triwizard Tournament's deadly trials.\n\nSpecial Abilities & Gear: Harry is a master of the Expelliarmus charm and can produce a powerful stag Patronus. His gear includes his 11-inch holly wand, the Invisibility Cloak (a Deathly Hallow), and the Firebolt broomstick.\n\nSecret Trivia: Harry became the youngest Seeker in a century for Gryffindor. His scar often burns when Voldemort is near or experiencing strong emotions, a side effect of the accidental Horcrux created the night his parents died.",
    previewUrl: "/data/hp/assets/harrypotter-preview.webp",
    backgroundUrl: "/data/hp/assets/harrypotter-background.webp",
    color: "#991b1b", // Gryffindor Red
    powerScore: 450,
    gearBonus: 200, // Invisibility Cloak/Firebolt/Sword of Gryffindor
    prepBonus: 80,
    gearDescription: "### The Chosen One's Arsenal\n- **The Invisibility Cloak**: A true Deathly Hallow that never fades, allowing him to bypass nearly any detection.\n- **Firebolt Broomstick**: Provides extreme aerial mobility and speed, allowing for hit-and-run tactics.",
    prepDescription: "### Dumbledore's Army Training\nHarry enters a focused state of leadership, recalling the combat spells he taught his friends, which increases his defensive reflexes and spell-casting speed.",
    triviaPool: [
      "Daniel Radcliffe went through 160 pairs of glasses and over 60 wands while filming the series.",
      "The makeup artists applied Harry's iconic lightning bolt scar over 2,000 times in total.",
      "Harry's parents, James and Lily, were once the Head Boy and Head Girl at Hogwarts.",
      "He is the only known person to have survived the Killing Curse not once, but twice.",
      "Harry's first broomstick was actually a toy one given to him by his godfather, Sirius Black.",
      "In the original draft, J.K. Rowling considered making Harry's name 'Harry Howard'."
    ],
  },
  {
    id: "dumbledore",
    name: "Albus Dumbledore",
    universe: "Harry Potter",
    description: "The Headmaster of Hogwarts and the only wizard Voldemort ever feared.",
    lore: "Albus Percival Wulfric Brian Dumbledore is widely considered the greatest wizard of the modern age. As the Headmaster of Hogwarts and founder of the **Order of the Phoenix**, he was the primary architect of the resistance against both Grindelwald and Voldemort. His mastery of magic is near-absolute, spanning alchemy, transfiguration, and the deepest secrets of ancient magic.\n\nDumbledore is a complex figure—a man of secrets who believes in 'the greater good.' Despite his immense power, he is humble and often quirky, with a profound belief in the power of love and choice. He wielded the Elder Wand, the most powerful wand ever made, and maintained a companion in Fawkes, a phoenix who provided both healing and tactical support.",
    triviaInfo: "Origin: Born to Percival and Kendra Dumbledore. He achieved fame early for his discovery of the twelve uses of dragon's blood and his partnership with the alchemist Nicolas Flamel. He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: His duel with Gellert Grindelwald in 1945 is considered the greatest wizarding duel in history. His battle against Voldemort in the Ministry of Magic showcased his ability to manipulate the environment itself, animating statues and commanding fire and water simultaneously.\n\nSpecial Abilities & Gear: He is an expert in non-verbal and wandless magic. He possesses the Elder Wand and the Deluminator. His phoenix, Fawkes, can teleport and heal wounds with tears.\n\nSecret Trivia: Dumbledore spoke Mermish and Gobbledegook. His favorite jam flavor was raspberry, and he had a particular fondness for muggle sweets like Lemon Sherbets.",
    previewUrl: "/data/hp/assets/dumbledore-preview.webp",
    backgroundUrl: "/data/hp/assets/dumbledore-background.webp",
    color: "#6b21a8", // Wise Purple
    powerScore: 750,
    gearBonus: 250, // Elder Wand / Fawkes
    prepBonus: 150,
    gearDescription: "### The Archmage's Tools\n- **The Elder Wand**: An unbeatable wand that amplifies the power of every spell to its absolute limit.\n- **Fawkes the Phoenix**: Provides aerial support and 'Phoenix Tears,' which can heal even the most fatal wounds instantly.",
    prepDescription: "### Strategic Foresight\nDumbledore calculates the 'greater good' of the encounter, setting complex magical traps and protective charms hours before the battle even begins.",
    triviaPool: [
      "Albus Dumbledore's name is an Old English word for 'bumblebee', chosen because Rowling imagined him humming.",
      "He was 115 years old at the time of his death at the hands of Severus Snape.",
      "Dumbledore's Patronus is a phoenix, a mirror of his loyal companion, Fawkes.",
      "He was once the owner of all three Deathly Hallows, though never all at the same time.",
      "His favorite muggle sweet was the Lemon Sherbet (or Lemon Drop).",
      "Dumbledore could understand Mermish, Gobbledegook, and Parseltongue, though he couldn't speak the latter."
    ],
  },
  {
    id: "voldemort",
    name: "Lord Voldemort",
    universe: "Harry Potter",
    description: "The Dark Lord, heir of Slytherin, and the most dangerous dark wizard in history.",
    lore: "Born Tom Marvolo Riddle, **Voldemort** rose from an orphaned half-blood to become the most feared dark wizard of all time. Obsessed with blood purity and immortality, he split his soul into seven **Horcruxes**, ensuring that he could never truly die as long as they remained intact. He is the master of the Dark Arts, utilizing fear, manipulation, and the Unforgivable Curses to subjugate the wizarding world.\n\nWith his serpentine appearance and cold, calculating mind, Voldemort leads the **Death Eaters** with an iron fist. He represents the ultimate corruption of magic, seeking to eradicate 'mudbloods' and rule over all of humanity. His only weakness is his inability to understand the power of love, a flaw that would ultimately lead to his downfall through the hands of Harry Potter.",
    triviaInfo: "Origin: Born to Merope Gaunt (a descendant of Salazar Slytherin) and Tom Riddle Sr. He was raised in a muggle orphanage before being recruited to Hogwarts by Dumbledore. He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: He led two Wizarding Wars, claiming countless lives. His most iconic fights include his duel at the Ministry against Dumbledore and his final stand against Harry Potter during the Battle of Hogwarts.\n\nSpecial Abilities & Gear: He can fly without a broomstick and is a Parselmouth (talks to snakes). He wields a yew and phoenix feather wand (brother to Harry's) and, later, the Elder Wand.\n\nSecret Trivia: Voldemort's name is French for 'Flight of Death.' He feared only two things: Albus Dumbledore and death itself. He murdered his own father and grandparents to frame his uncle Morfin Gaunt.",
    previewUrl: "/data/hp/assets/voldemort-preview.webp",
    backgroundUrl: "/data/hp/assets/voldemort-background.webp",
    color: "#166534", // Slytherin Green
    powerScore: 740,
    gearBonus: 220, // Horcruxes / Nagini
    prepBonus: 180,
    gearDescription: "### Dark Art Artifacts\n- **Nagini**: A giant boa constrictor and Horcrux that acts as a deadly scout and physical attacker.\n- **The Horcrux Net**: Grants a 'Second Life' effect, allowing him to survive a fatal blow once per encounter (conceptual balance).",
    prepDescription: "### Terror Presence\nVoldemort uses Legilimency to probe the opponent's mind, dredging up their deepest fears to paralyze them with terror before the first curse is cast.",
    triviaPool: [
      "Voldemort's name is derived from the French phrase 'vol de mort', which translates to 'flight of death'.",
      "He was 71 years old during the final Battle of Hogwarts in 1998.",
      "Voldemort's greatest fear was his own death, which he viewed as a 'shameful human weakness'.",
      "He once held a high-level job as a shop assistant at Borgin and Burkes after leaving Hogwarts.",
      "According to J.K. Rowling, the 't' at the end of Voldemort is actually intended to be silent.",
      "He is the last living descendant of Salazar Slytherin through the Gaunt family bloodline."
    ],
  },
  {
    id: "snape",
    name: "Severus Snape",
    universe: "Harry Potter",
    description: "The Half-Blood Prince, a master of Potions and the Dark Arts with an impenetrable mind.",
    lore: "Severus Snape is one of the most enigmatic figures in the Harry Potter universe. A master of **Occlumency** and **Legilimency**, he served as a double agent for Albus Dumbledore within the Death Eaters. His life was defined by his unrequited love for Lily Potter, which drove him to protect Harry despite his outward hostility.\n\nAs the Potions Master and later the Defense Against the Dark Arts teacher, Snape's technical skill is second to none. He is the creator of several powerful spells, including *Sectumsempra*, and his mastery of potions allows him to brew cures and poisons that can change the course of any battle. His stoic, intimidating presence hides a man of immense bravery and tactical brilliance.",
    triviaInfo: "Origin: The son of Eileen Prince (a witch) and Tobias Snape (a muggle). He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: He successfully navigated the most dangerous duels in the series, often holding back or misdirecting his opponents. His 'battle' was one of decades-long deception, spying on the most dangerous dark wizard in history.\n\nSpecial Abilities & Gear: He is a master of non-verbal spellcasting. He created the Half-Blood Prince's potion techniques. He is one of the few wizards who can fly without a broom.\n\nSecret Trivia: Snape's Patronus is a duo, the same as Lily Potter's, a symbol of his lifelong devotion. He was the one who revealed the prophecy to Voldemort, a mistake he spent the rest of his life trying to rectify.",
    previewUrl: "/data/hp/assets/snape-preview.webp",
    backgroundUrl: "/data/hp/assets/snape-background.webp",
    color: "#0f172a", // Dark Slytherin
    powerScore: 500,
    gearBonus: 100, // Advanced Potions
    prepBonus: 250, // Occlumency/Planning
    gearDescription: "### The Prince's Brews\n- **Liquid Death & Healing**: A collection of high-potency vials that can either instantly incapacitate an enemy or restore his own vitality.\n- **Personalized Spellbook**: Contains forbidden charms like Sectumsempra, designed for lethal efficiency.",
    prepDescription: "### Occlumency Barrier\nSnape closes his mind to all outside influence, becoming immune to psychological attacks and predicting his opponent's moves through cold, analytical observation.",
    triviaPool: [
      "Severus Snape was the only Death Eater capable of producing a Patronus, a feat he achieved due to his love for Lily.",
      "The character was partially inspired by J.K. Rowling's real-life high school chemistry teacher.",
      "Alan Rickman was given a huge spoiler about Snape's true motivations long before the books revealed them.",
      "He was the first Slytherin Head of House to later serve as the Headmaster of Hogwarts.",
      "Snape's Patronus is a Doe, which is exactly the same as Lily Potter's.",
      "He is the inventor of several powerful spells, including Sectumsempra and Langlock."
    ],
  },
  {
    id: "hagrid",
    name: "Rubeus Hagrid",
    universe: "Harry Potter",
    description: "The Keeper of Keys and Grounds at Hogwarts, a half-giant with a heart as big as his stature.",
    lore: "**Hagrid** is a half-giant wizard who serves as the bedrock of the Hogwarts community. Despite being expelled in his third year (wrongfully accused of opening the Chamber of Secrets), he remained at the school as the gamekeeper. He has a legendary love for dangerous magical creatures, whom he sees as 'misunderstood'.\n\nHagrid's half-giant blood grants him immense physical strength and a natural resistance to most spells. He is loyal to a fault, particularly to Dumbledore and Harry. While his formal education was cut short, his practical knowledge of the Forbidden Forest and its inhabitants is unmatched.",
    triviaInfo: "Origin: The son of Mr. Hagrid (a wizard) and Fridwulfa (a giantess). He was born on December 6th. He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: He fought in the Battle of the Seven Potters and the Battle of Hogwarts, often using his sheer physical bulk to overpower Death Eaters. He famously carried Harry's 'body' back to the castle.\n\nSpecial Abilities & Gear: He has magical resistance similar to a giant. He uses a pink umbrella that secretly contains the shards of his broken oak wand. He often has a creature like Fang or Fluffy nearby.\n\nSecret Trivia: Hagrid is allergic to cats. He never married, but had a brief and complicated romance with the giantess Olympe Maxime. He was the one who first told Harry he was a wizard.",
    previewUrl: "/data/hp/assets/hagrid-preview.webp",
    backgroundUrl: "/data/hp/assets/hagrid-background.webp",
    color: "#422006", // Earthy Brown
    powerScore: 350,
    gearBonus: 150, // Magical Creatures / Umbrella
    prepBonus: 50,
    gearDescription: "### Beastmaster's Guard\n- **The Pink Umbrella**: A concealed wand that allows for basic but powerful charms.\n- **Creature Call**: Summons a loyal beast (like Aragog's children or a Hippogriff) to flank the opponent.",
    prepDescription: "### Giant's Resolve\nHagrid braces himself, leaning into his giant heritage to shrug off physical impacts and minor magical projectiles that would stagger a normal wizard.",
    triviaPool: [
      "Robbie Coltrane, the actor who played Hagrid, was the very first person cast in the film series.",
      "Hagrid was expelled in his third year for supposedly opening the Chamber of Secrets, which was a frame-up by Tom Riddle.",
      "His parents were a human father and a giantess mother named Fridwulfa.",
      "Hagrid's favorite pet, the three-headed dog Fluffy, was based on Cerberus from Greek mythology.",
      "His pink umbrella secretly contains the broken pieces of his original oak wand.",
      "According to J.K. Rowling, Hagrid was never able to produce a Patronus, as it's a very difficult spell."
    ],
  },
  {
    id: "siriusblack",
    name: "Sirius Black",
    universe: "Harry Potter",
    description: "The fugitive Animagus and Harry's godfather, known as Padfoot.",
    lore: "Sirius Black was the 'black sheep' of the noble and ancient House of Black, a family obsessed with blood purity. Choosing to join Gryffindor, he became best friends with James Potter and Remus Lupin, forming the **Marauders**. After being framed for the murder of his friends and twelve muggles, he spent twelve years in the hellish prison of **Azkaban**.\n\nA brilliant and rebellious wizard, Sirius is an unregistered **Animagus**, capable of transforming into a large black dog named Padfoot. Despite his years of suffering, his spirit remains fierce and protective of Harry. He is a reckless but incredibly skilled duelist with a deep understanding of tactical combat.",
    triviaInfo: "Origin: Born to Orion and Walburga Black. He first appeared (by name) in the first chapter of the series, but made his debut in 'Harry Potter and the Prisoner of Azkaban'.\n\nBattles: He fought in the first and second Wizarding Wars. His final duel was against his cousin Bellatrix Lestrange in the Department of Mysteries.\n\nSpecial Abilities & Gear: He can transform into a dog at will. He is a master of non-verbal magic and was one of the creators of the Marauder's Map.\n\nSecret Trivia: Sirius was the first person to escape Azkaban without outside help. He did so by transforming into his dog form, which the Dementors couldn't easily track or sense emotionally.",
    previewUrl: "/data/hp/assets/siriusblack-preview.webp",
    backgroundUrl: "/data/hp/assets/siriusblack-background.webp",
    color: "#1e293b", // Midnight Blue
    powerScore: 480,
    gearBonus: 50,
    prepBonus: 70,
    gearDescription: "### Marauder's Edge\n- **Family Heirloom Wand**: A high-resonance wand capable of aggressive, high-speed combat magic.\n- **The Marauder's Map**: (Conceptual) allows him to anticipate enemy movements through superior environmental awareness.",
    prepDescription: "### Animagus Ambush\nSirius shifts into his massive dog form (Padfoot), closing the distance with animalistic speed before shifting back for a point-blank magical strike.",
    triviaPool: [
      "Sirius Black was the first person to ever escape from Azkaban without any outside help.",
      "He was the one who gifted Harry both his first toy broom and his professional Firebolt.",
      "His Animagus form is a huge black dog, which is often mistaken for 'The Grim', an omen of death.",
      "Sirius' name is shared with the brightest star in the night sky, also known as the 'Dog Star'.",
      "He was only 22 years old when he was wrongfully imprisoned in Azkaban.",
      "Gary Oldman based the look of Sirius' tattoos on those worn by Russian prison gangs."
    ],
  },
  {
    id: "remuslupin",
    name: "Remus Lupin",
    universe: "Harry Potter",
    description: "The compassionate teacher and werewolf, known as Moony.",
    lore: "Remus Lupin is a wizard of great kindness and intelligence who carries the heavy burden of lycanthropy. Bitten as a child by Fenrir Greyback, his life was marked by isolation until he found friendship with James, Sirius, and Peter at Hogwarts. As a member of the **Marauders** and the **Order of the Phoenix**, he is a stalwart defender against the Dark Arts.\n\nLupin is widely considered one of the best Defense Against the Dark Arts teachers in Hogwarts history. His combat style is focused and educational, but when pushed, he is a formidable duelist. His tragic nature is contrasted by his unwavering moral compass and his dedication to the next generation of wizards.",
    triviaInfo: "Origin: The son of Lyall and Hope Lupin. He first appeared in 'Harry Potter and the Prisoner of Azkaban'.\n\nBattles: He was a key veteran of both Wizarding Wars. He fought in the Battle of the Department of Mysteries, the Battle of the Astronomy Tower, and the Battle of Hogwarts.\n\nSpecial Abilities & Gear: He is a werewolf. He is an expert in defensive charms and the Riddikulus charm. He was one of the four creators of the Marauder's Map.\n\nSecret Trivia: Lupin's Patronus is a wolf, but he prefers to produce a non-corporeal one because he finds the wolf form a painful reminder of his condition. His name 'Remus' refers to the Roman founder raised by a wolf.",
    previewUrl: "/data/hp/assets/remuslupin-preview.webp",
    backgroundUrl: "/data/hp/assets/remuslupin-background.webp",
    color: "#713f12", // Wolf Grey/Brown
    powerScore: 470,
    gearBonus: 60,
    prepBonus: 90,
    gearDescription: "### D.A.D.A. Mastery\n- **Wolfsbane Potion Vials**: (Conceptual) allows him to maintain coordination and intelligence even in high-stress combat.\n- **Silver-Reinforced Wand**: Specifically tuned for defensive and counter-curse magic.",
    prepDescription: "### Moony's Analysis\nLupin identifies the 'Boggart' (the primary fear/weakness) of his opponent, tailoring his spellcasting to exploit their psychological hesitation.",
    triviaPool: [
      "Lupin's name 'Remus' is from Roman myth (raised by a wolf), and 'Lupin' comes from the Latin word for 'wolfish'.",
      "His condition of lycanthropy was intended as a metaphor for the real-world stigma around HIV/AIDS.",
      "Lupin's Patronus is a wolf, but he prefers not to produce it, finding it a painful reminder of his 'furry little problem'.",
      "He was the first non-Slytherin or non-Gryffindor to teach Defense Against the Dark Arts in the series.",
      "Remus is the only member of the original Marauders who died of natural (albeit battle-related) causes, as the others were murdered.",
      "He was the one who taught Harry how to produce a Patronus Charm in his third year."
    ],
  },
  {
    id: "bellatrix",
    name: "Bellatrix Lestrange",
    universe: "Harry Potter",
    description: "Voldemort's most loyal and sadistic follower, a terrifying duelist.",
    lore: "**Bellatrix Lestrange** (née Black) is the embodiment of pure-blood fanaticism and clinical insanity. The most dangerous of the Death Eaters, she is known for her mastery of the **Cruciatus Curse** and her unyielding devotion to Lord Voldemort. After spending years in Azkaban, she emerged more unstable and lethal than ever.\n\nHer combat style is erratic, aggressive, and utterly merciless. She is a master of the Dark Arts and one of the most skilled duelists in the wizarding world, capable of taking on multiple opponents simultaneously. She takes immense pleasure in the suffering of others, making her a psychological nightmare to face on the battlefield.",
    triviaInfo: "Origin: The eldest daughter of Cygnus and Druella Black. She is the sister of Narcissa Malfoy and Andromeda Tonks. She first appeared in 'Harry Potter and the Goblet of Fire' (in a memory).\n\nBattles: She murdered Sirius Black and Dobby. She was the last Death Eater standing during the Battle of Hogwarts, fighting Hermione, Ginny, and Luna all at once before her final duel with Molly Weasley.\n\nSpecial Abilities & Gear: She is a master of Occlumency and the Unforgivable Curses. She wields a 12.75-inch walnut wand with a dragon heartstring core, described as 'unyielding'.\n\nSecret Trivia: Bellatrix was the only woman among the Death Eaters for a long period. Her name 'Bellatrix' is Latin for 'female warrior'. She was obsessed with Voldemort, viewing him as her master and idol.",
    previewUrl: "/data/hp/assets/bellatrixlestrange-preview.webp",
    backgroundUrl: "/data/hp/assets/bellatrixlestrange-background.webp",
    color: "#450a0a", // Blood Crimson/Black
    powerScore: 550,
    gearBonus: 80,
    prepBonus: 120,
    gearDescription: "### Death Eater Arsenal\n- **Walnut Death-Wand**: A stiff, powerful wand optimized for the Dark Arts and torture curses.\n- **Poisoned Daggers**: Concealed blades for when magical means are not enough or require a silent finish.",
    prepDescription: "### Cruciatus Focus\nBellatrix enters a state of manic euphoria, ignoring her own pain and focusing solely on the 'fun' of breaking her opponent's spirit.",
    triviaPool: [
      "Bellatrix is the elder sister of Narcissa Malfoy and Andromeda Tonks, making her Draco's aunt.",
      "Her name is Latin for 'female warrior' and she is the brightest star in the constellation Orion.",
      "Bellatrix was obsessed with Voldemort, viewing him as a romantic figure rather than just a master.",
      "She was a master of Occlumency and was the one who trained her nephew Draco Malfoy in the art.",
      "In the books, she is described as having had great beauty once, which was 'eaten away' by her time in Azkaban.",
      "Bellatrix was responsible for the deaths of Sirius Black, Dobby, and Nymphadora Tonks."
    ],
  },
  {
    id: "dracomalfoy",
    name: "Draco Malfoy",
    universe: "Harry Potter",
    description: "The Slytherin rival of Harry Potter, burdened by family expectations.",
    lore: "Draco Malfoy was raised in luxury and instilled with the belief that his pure-blood heritage made him superior. At Hogwarts, he served as Harry's primary rival, often using his family's influence to cause trouble. However, his life took a darker turn when he was drafted into the **Death Eaters** and tasked with the impossible mission of killing Albus Dumbledore.\n\nThough often portrayed as a bully, Draco is a talented wizard, particularly in Potions and Occlumency. His journey is one of fear and internal conflict, as he realizes he may not have the stomach for the true evil of Voldemort's regime. In combat, he uses high-quality gear and precise, cold spellcasting.",
    triviaInfo: "Origin: The only child of Lucius and Narcissa Malfoy. He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: He led the mission to infiltrate Hogwarts through the Vanishing Cabinet and participated in the Battle of Hogwarts, though his heart was rarely in the fight towards the end.\n\nSpecial Abilities & Gear: He is a skilled seeker and a master of Occlumency (trained by Bellatrix). He wields a hawthorn wand with a unicorn hair core.\n\nSecret Trivia: Draco was originally supposed to be named 'Draco Spungen'. J.K. Rowling has stated that Draco is an expert at Occlumency because he has spent his life repressing his true feelings and perfecting his mask of superiority.",
    previewUrl: "/data/hp/assets/draco-preview.webp",
    backgroundUrl: "/data/hp/assets/draco-background.webp",
    color: "#065f46", // Slytherin Emerald
    powerScore: 380,
    gearBonus: 120, // Family Money/Gear
    prepBonus: 100,
    gearDescription: "### Malfoy Inheritance\n- **Nimbus 2001**: A high-end racing broom provided by his father, granting superior speed and handling.\n- **Hand of Glory**: A dark artifact that gives light only to the holder, perfect for ambushes in darkness.",
    prepDescription: "### Pure-blood Arrogance\nDraco utilizes his superior social standing to demoralize his opponent, using mocking 'Hexes' that disrupt their concentration and timing.",
    triviaPool: [
      "Tom Felton initially auditioned for the roles of Harry Potter and Ron Weasley before being cast as Draco.",
      "Draco's name 'Malfoy' is French for 'mal foi', which translates to 'bad faith'.",
      "He was a member of the Slytherin Quidditch team and served as their Seeker for several years.",
      "Draco's hawthorn wand with a unicorn hair core was eventually won by Harry, who used it as his primary wand for a time.",
      "J.K. Rowling has expressed concern about the number of fans who find Draco attractive, as she views him as a flawed character.",
      "After the war, Draco married Astoria Greengrass and had a son named Scorpius."
    ],
  },
  {
    id: "neville",
    name: "Neville Longbottom",
    universe: "Harry Potter",
    description: "The clumsy boy who became a hero, a master of Herbology.",
    lore: "Neville Longbottom spent much of his youth in the shadow of his war-hero parents, who were tortured to insanity by Bellatrix Lestrange. Initially clumsy and forgetful, Neville's true strength emerged slowly. He became one of the leaders of **Dumbledore's Army** and eventually the hero who destroyed Voldemort's final Horcrux.\n\nNeville's specialty is **Herbology**, giving him a unique tactical advantage with magical plants. His transformation from a nervous student to a fierce warrior is a testament to the power of brave perseverance. He is a 'late bloomer' whose power is directly tied to his sense of purpose.",
    triviaInfo: "Origin: Born to Frank and Alice Longbottom. He was born just hours before Harry Potter. He first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: He fought in the Department of Mysteries and was the resistance leader at Hogwarts while Harry was away. During the final battle, he pulled the Sword of Gryffindor from the Sorting Hat and killed Nagini.\n\nSpecial Abilities & Gear: He is a master of magical plants. After his father's wand broke, he got a cherry wand with unicorn hair. He possesses the Mimbulus Mimbletonia.\n\nSecret Trivia: Neville could have been the 'Chosen One'. The prophecy referred to a boy born at the end of July to parents who had thrice defied Voldemort—a description that fit both Harry and Neville.",
    previewUrl: "/data/hp/assets/neville-preview.webp",
    backgroundUrl: "/data/hp/assets/neville-background.webp",
    color: "#854d0e", // Earthy Gold/Red
    powerScore: 400,
    gearBonus: 180, // Sword of Gryffindor / Plants
    prepBonus: 60,
    gearDescription: "### Defender's Gear\n- **The Sword of Gryffindor**: An indestructible silver blade that has absorbed Basilisk venom, capable of destroying Horcruxes and cutting magic.\n- **Mimbulus Mimbletonia**: A plant that can spray 'Stinksap,' heavily obscuring vision and distracting enemies.",
    prepDescription: "### Herbology Trap\nNeville secretly plants Venomous Tentacula seeds or Devil's Snare roots in the arena, which activate mid-battle to entangle his opponent.",
    triviaPool: [
      "Neville could have been the 'Chosen One' if Voldemort had chosen to attack him instead of Harry.",
      "His parents, Frank and Alice Longbottom, were famous Aurors who were tortured to insanity.",
      "Initially, Neville's grandmother thought he might be a Squib until he survived being dropped out of a window.",
      "The Sword of Gryffindor appeared to Neville in the Sorting Hat because he showed true bravery.",
      "Neville eventually became the Professor of Herbology at Hogwarts after many years as an Auror.",
      "According to J.K. Rowling, Neville's favorite plant is the Mimbulus Mimbletonia."
    ],
  },
  {
    id: "ginny",
    name: "Ginny Weasley",
    universe: "Harry Potter",
    description: "A fierce and talented duelist, known for her powerful Bat-Bogey Hex.",
    lore: "The youngest of the seven Weasley children and the only girl, Ginny grew up in a house filled with magic and chaos. After a traumatic first year involving Tom Riddle's diary, she developed a fierce independence and a sharp wit. She became an elite athlete (Quidditch Chaser and Seeker) and one of the most capable members of **Dumbledore's Army**.\n\nGinny is known for her 'Bat-Bogey Hex' and her aggressive, high-speed combat style. She doesn't hesitate to take the initiative and is surprisingly powerful for her age. Her blend of athletic reflexes and magical potency makes her a dangerous opponent in any arena.",
    triviaInfo: "Origin: The daughter of Arthur and Molly Weasley. She first appeared in 'Harry Potter and the Philosopher's Stone' as a young girl at Platform 9 3/4.\n\nBattles: She fought at the Department of Mysteries, the Astronomy Tower, and the Battle of Hogwarts. She was one of the central leaders of the Hogwarts resistance during the final year.\n\nSpecial Abilities & Gear: She is a master of the Bat-Bogey Hex. She is an exceptionally talented flyer. She wields a yew wand of unknown length.\n\nSecret Trivia: Ginny was the first girl born into the Weasley family for seven generations. She later became a professional Quidditch player for the Holyhead Harpies before becoming a senior Quidditch correspondent for the Daily Prophet.",
    previewUrl: "/data/hp/assets/ginnyweasley-preview.webp",
    backgroundUrl: "/data/hp/assets/ginnyweasley-background.webp",
    color: "#b91c1c", // Weasley Red
    powerScore: 420,
    gearBonus: 50,
    prepBonus: 70,
    gearDescription: "### Chaser's Agility\n- **Professional Grade Broom**: Provides elite-level evasion and speed for aerial-focused combat.\n- **Weasleys' Wizard Wheezes Gadgets**: (Conceptual) utilizes various prank-based distractions to confuse opponents.",
    prepDescription: "### Bat-Bogey Blitz\nGinny fires a rapid succession of Hexes designed to mask a singular, powerful Bat-Bogey Hex that physically blinds and disorients her target.",
    triviaPool: [
      "Ginny was the first girl born into the Weasley family for seven generations.",
      "She was a highly talented Quidditch player, serving as both a Chaser and a substitute Seeker.",
      "Her Bat-Bogey Hex was so powerful it earned her an invitation to Professor Slughorn's 'Slug Club'.",
      "Ginny was the one who named Dumbledore's Army when they were first meeting in the Hog's Head.",
      "After leaving Hogwarts, she played professional Quidditch for the Holyhead Harpies.",
      "Ginny later became the senior Quidditch correspondent for the Daily Prophet."
    ],
  },
  {
    id: "hedwig",
    name: "Hedwig",
    universe: "Harry Potter",
    description: "Harry's faithful snowy owl and messenger, a symbol of innocence.",
    lore: "**Hedwig** was a snowy owl given to Harry Potter for his eleventh birthday by Rubeus Hagrid. More than just a pet, she was Harry's first real connection to the wizarding world and his loyal companion during the lonely summers at the Dursleys.\n\nIn combat, Hedwig serves as a highly intelligent aerial scout and distraction. While not a primary fighter, her loyalty and intelligence allow her to harry opponents, intercept messages, and provide critical battlefield awareness. She represents the silent, steadfast support of a true friend.",
    triviaInfo: "Origin: Purchased at Eeylops Owl Emporium. She first appeared in 'Harry Potter and the Philosopher's Stone'.\n\nBattles: She participated in the Battle of the Seven Potters, where she tragically gave her life to protect Harry, an act that signaled the 'end of his childhood'.\n\nSpecial Abilities & Gear: Exceptional intelligence and navigation. She can find anyone by name alone, even if they are magically hidden.\n\nSecret Trivia: J.K. Rowling admitted she made a mistake by describing Hedwig as being active during the day, as snowy owls are diurnal, but most owls are nocturnal. In the films, Hedwig was played by several male owls, as they are whiter and smaller than females.",
    previewUrl: "/data/hp/assets/hedwig-preview.webp",
    backgroundUrl: "/data/hp/assets/hedwig-background.webp",
    color: "#f8fafc", // Snow White
    powerScore: 120,
    gearBonus: 20,
    prepBonus: 30,
    gearDescription: "### Familiar's Eye\n- **Razor-sharp Talons**: Basic physical defense capable of distracting human-sized opponents.\n- **Silent Flight**: Allows for stealthy approaches and message interception.",
    prepDescription: "### Distraction Swoop\nHedwig dive-bombs the opponent's face at the critical moment of their spell-casting, causing their aim to falter or their concentration to break.",
    triviaPool: [
      "J.K. Rowling admitted she made a mistake by describing Hedwig as being active during the day, as snowy owls are mostly nocturnal.",
      "The actors who played Hedwig in the films were mostly male snowy owls, as they are smaller and whiter than females.",
      "Hedwig was the very first birthday present Harry ever received, given to him by Hagrid.",
      "Her name 'Hedwig' was found by Harry in 'A History of Magic' while he was bored over the summer.",
      "In the books, Hedwig is described as having a very expressive personality, often giving Harry 'reproachful looks'.",
      "The death of Hedwig in the final book was written to symbolize Harry's loss of innocence."
    ],
  },
  {
    id: "dobby",
    name: "Dobby",
    universe: "Harry Potter",
    description: "A free House-elf, known for his eccentric loyalty and unique elf magic.",
    lore: "Dobby was formerly the house-elf of the Malfoy family, suffering years of abuse until he was freed by Harry Potter. Unlike most elves who are bound to serve, Dobby embraced his freedom, demanding pay and choosing his own loyalty. He is deeply devoted to Harry and his friends, often going to extreme (and occasionally dangerous) lengths to protect them.\n\nHouse-elf magic is distinct from wizard magic, allowing Dobby to **Apparate** and **Disapparate** within Hogwarts and other warded areas where wizards cannot. He can cast powerful charms without a wand and has a unique form of telekinesis. He is a 'Free Elf' who fights with surprising power and resourcefulness.",
    triviaInfo: "Origin: Formerly owned by Lucius Malfoy. He first appeared in 'Harry Potter and the Chamber of Secrets'.\n\nBattles: He famously incapacitated Lucius Malfoy when he tried to attack Harry. He led the rescue mission in Malfoy Manor, where he saved Harry and his friends before being killed by Bellatrix Lestrange.\n\nSpecial Abilities & Gear: Unlimited Apparition. Wandless magic. He often wears a mismatched collection of clothes, including 'socks' which represent his freedom.\n\nSecret Trivia: Dobby's last words were 'Harry Potter,' the same as his first words to Harry in the second book. He is the only character in the series other than Harry to have his name as the title of a chapter in every book he appears in.",
    previewUrl: "/data/hp/assets/dobby-preview.webp",
    backgroundUrl: "/data/hp/assets/dobby-background.webp",
    color: "#fbbf24", // Elf Gold
    powerScore: 400,
    gearBonus: 0,
    prepBonus: 150, // Elf Magic / Apparition
    gearDescription: "### The Free Elf's Will\n- **Household Chaos**: (Conceptual) utilizes teleported objects and environment manipulation to disrupt opponents.\n- **Socks of Freedom**: (Lore-based) provides a morale/speed boost through the joy of being free.",
    prepDescription: "### Instant Apparition\nDobby constantly teleports around the arena, becoming an impossible-to-hit target while delivering point-blank blasts of raw elven energy.",
    triviaPool: [
      "Dobby's first and last words in the entire series were 'Harry Potter'.",
      "He was a free elf for several years, eventually working in the Hogwarts kitchens for a wage.",
      "Dobby was known for wearing a mismatched collection of clothes, including several hats stacked on his head.",
      "House-elf magic is ancient and powerful, allowing Dobby to teleport in places where wizards are blocked.",
      "He had a deep and lasting friendship with Aberforth Dumbledore, who helped him during his missions.",
      "Dobby appears in every book of the series except for 'The Prisoner of Azkaban' and 'The Half-Blood Prince'."
    ],
  },
  {
    id: "willow",
    name: "The Whomping Willow",
    universe: "Harry Potter",
    description: "A violent, sentient tree rooted on the Hogwarts grounds, guarding a secret.",
    lore: "The **Whomping Willow** is a rare and aggressive species of magical plant. It was planted by Albus Dumbledore in 1971 to hide the entrance to a secret passage leading to the **Shrieking Shack**, allowing the young Remus Lupin to transform into a werewolf in safety without endangering other students.\n\nThe tree is highly territorial and will attack anything that comes within range of its sweeping branches. It has immense physical strength, capable of crushing cars and swatting birds out of the sky. It is a stationary guardian with a singular, violent purpose. The only way to pacify it is by pressing a specific knot on its trunk.",
    triviaInfo: "Origin: Planted in 1971 on the Hogwarts grounds. It first appeared in 'Harry Potter and the Chamber of Secrets'.\n\nBattles: It famously 'fought' Harry and Ron's flying Ford Anglia, nearly destroying the car. It also guarded the entrance against Sirius Black (in dog form) and Harry during the events of the third year.\n\nSpecial Abilities & Gear: Immense physical durability. Sentinent and reactionary limb movement. Rapid multi-target slapping.\n\nSecret Trivia: The Whomping Willow was once used by Hogwarts students to play a 'game' of seeing who could get close enough to touch the trunk without being hit. This stopped after a student named Davey Gudgeon nearly lost an eye.",
    previewUrl: "/data/hp/assets/whompingwillow-preview.webp",
    backgroundUrl: "/data/hp/assets/whompingwillow-background.webp",
    color: "#27272a", // Gnarled Dark Wood
    powerScore: 400,
    gearBonus: 0,
    prepBonus: 0,
    gearDescription: "### Ancient Roots\n- **Slamming Branches**: Massive, gnarled limbs that strike with enough force to shatter stone.\n- **Immobile Fortification**: Being rooted to the earth, it cannot be knocked back or moved by any conventional spell.",
    prepDescription: "### Reactive Thrasher\nThe Willow enters a state of heightened sensitivity, thrashing its branches in an unpredictable, recursive pattern that creates a 360-degree 'no-go' zone of physical destruction.",
    triviaPool: [
      "The Whomping Willow was planted by Dumbledore specifically to hide the entrance to the Shrieking Shack for Lupin.",
      "It is a sentient and highly aggressive tree that will attack anything that enters the range of its branches.",
      "The only way to freeze the Whomping Willow is to press a small knot at the base of its trunk.",
      "Students used to challenge each other to see who could touch its trunk, until several were severely injured.",
      "The tree has enough power to completely demolish a flying Ford Anglia and split a Firebolt broomstick in half.",
      "J.K. Rowling once described it as a 'rare and ancient magical plant' that requires expert care."
    ],
  },
];

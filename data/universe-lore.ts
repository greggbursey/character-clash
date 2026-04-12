export interface UniverseLore {
  name: string;
  emoji: string;
  blurb: string;
  history: string;
  lore: string;
  keyLocations: string[];
  active?: boolean;
}

export const universeLoreData: Record<string, UniverseLore> = {
  "DC": {
    name: "DC Universe",
    emoji: "🦸",
    blurb: "Home to gods amongst men. The DC Universe is defined by legacy, symbols of hope, and crisis events that shatter reality itself.",
    history: "The DC Universe began with the Big Bang, but its history is marked by 'Crisis' events that have reshaped reality multiple times. It is a multiverse where different Earths exist, though the 'Prime Earth' is the central focus of most legends. The age of heroes began with the arrival of Superman, inspiring a generation of mystery men and gods to step into the light.",
    lore: "Characterized by god-like power and moral absolutes, the DC lore centers on the concept of 'The Source' and the 'Emotional Spectrum.' Heroes are often seen as modern mythological figures—icons like the Trinity (Superman, Batman, Wonder Woman) who represent the pinnacle of truth, justice, and human determination.",
    keyLocations: ["Metropolis", "Gotham City", "Themyscira", "Oa", "Apokolips"],
    active: true
  },
  "Marvel": {
    name: "Marvel Universe",
    emoji: "💥",
    blurb: "The world outside your window. Marvel's universe is built on flawed heroes, mutants, and cosmic entities fighting for the fate of reality.",
    history: "Formed billions of years ago by the Celestials, the Marvel Universe is a place where science and magic are inextricably linked. Its modern history is defined by the 'Heroic Age,' which kicked off when the Fantastic Four embarked on their fateful space voyage, followed closely by the Avengers forming to fight foes no single hero could withstand.",
    lore: "Marvel lore emphasizes the 'human' element: heroes with everyday problems, marginalized groups like Mutants (X-Men) fighting for acceptance, and cosmic stakes managed by entities like Eternity and The Living Tribunal. The Power Cosmic, Gamma Radiation, and Magic are the primary drivers of superhuman ability.",
    keyLocations: ["New York City", "Wakanda", "Asgard", "Latveria", "The Negative Zone"],
    active: true
  },
  "Mortal Kombat": {
    name: "Mortal Kombat",
    emoji: "🐉",
    blurb: "A brutal multiverse of realms constantly at war. Elder Gods oversee the eternal tournament designed to prevent realms from merging by force.",
    history: "The One Being was the original entity of the MK universe, until the Elder Gods split it into the Six Realms: Earthrealm, Outworld, Netherrealm, Orderrealm, Chaosrealm, and Edenia. To prevent total conquest, the Mortal Kombat tournament was established—a realm must win ten consecutive tournaments to earn the right to invade another.",
    lore: "Soul magic, blood rituals, and elemental mastery define the combatants of Mortal Kombat. The lore is steeped in prophecy, betrayals, and the eternal struggle between those who wish to protect Earthrealm (like Raiden) and those who seek to merge all realms under a single dark rule (like Shao Kahn).",
    keyLocations: ["The pit", "Shang Tsung's Island", "The Netherrealm", "Outworld Colosseum", "The Sky Temple"],
    active: true
  },
  "Street Fighter": {
    name: "Street Fighter",
    emoji: "🥊",
    blurb: "A world defined by the pursuit of strength. Martial artists traverse the globe to test their limits against the strongest fighters alive.",
    history: "While it lacks the cosmic reboots of other universes, Street Fighter's history is a global chronicle of martial arts mastery. It traces the rise of organizations like Shadaloo and the Illuminati, and the various 'World Warrior' tournaments that brought together the greatest fighters from every continent to determine who truly is the strongest.",
    lore: "The lore revolves around spiritual energies like 'Satsui no Hado' (The Surge of Murderous Intent) and its counterpart 'Mu no Ken' (The Power of Nothingness). Characters harness these internal forces to perform superhuman feats, often while navigating the corrupting influence of power and the discipline of ancient fighting styles.",
    keyLocations: ["Suzaku Castle", "Metro City", "Thailand Temple", "Brazil Rainforest", "The Grid"],
    active: true
  },
  "TMNT": {
    name: "TMNT",
    emoji: "🐢",
    blurb: "Four mutant brothers trained in ninjutsu by their rat sensei fight crime from the shadows of New York City.",
    history: "The TMNT universe began in the sewers of NYC, where four turtles and a Japanese master were exposed to 'The Ooze.' Their history involves an ancient feud between the Hamato Clan and the Foot Clan, spanning generations and eventually expanding to include alien worlds (Dimension X) and time-traveling adventures.",
    lore: "Lore focuses on the concepts of family, ninjutsu honor, and the intersection of urban grit with sci-fi weirdness. The 'Utrom' aliens, the 'Technodrome,' and the 'Pantheon' of animal gods add layers of mysticism and high-tech conflict to the turtles' street-level lives.",
    keyLocations: ["The Sewers", "TCRI Building", "Dimension X", "April's Apartment", "Technodrome"],
    active: true
  },
  "Star Wars": {
    name: "Star Wars",
    emoji: "🌌",
    blurb: "A galaxy far, far away defined by the eternal struggle between the light and dark sides of the Force.",
    history: "The history of the galaxy is recorded in eras: the High Republic, the Fall of the Jedi, the Reign of the Empire, and the Rise of the First Order. For millennia, the Republic stood as a bastion of peace, until the Sith Lord Darth Sidious orchestrated its collapse, leading to a cycle of civil wars and the search for balance.",
    lore: "The Force is the central pillar of Star Wars lore—an energy field that binds the galaxy together. Whether interpreted through the Jedi Code or the Sith's rule of two, the Force grants its users telepathic and kinetic abilities, while fueling the eternal conflict between selfless service and selfish power.",
    keyLocations: ["Tatooine", "Coruscant", "Death Star", "Dagobah", "Endor"],
    active: true
  },
  "Godzilla": {
    name: "Godzilla / Monsterverse",
    emoji: "🦖",
    blurb: "The realm of titans. Colossal prehistoric beasts awaken from the depths of the Earth to restore balance to nature.",
    history: "Titans have existed since the dawn of time, ruling the Earth long before humanity's rise. They retreated into the Hollow Earth or went into hibernation as the world cooled. In 1954, the awakening of Godzilla marked the beginning of the 'Titan Age,' where humanity realized it was no longer the apex predator.",
    lore: "Titan lore is based on the idea of 'Biological Guardians'—monsters that feed on radiation and maintain the planet's ecosystem. Monarch, a secret organization, studies these 'Great Ancients,' unraveling the mysteries of the Hollow Earth and the ancient rivalries between Godzilla and other alphas like Kong and Ghidorah.",
    keyLocations: ["Hollow Earth", "Skull Island", "Tokyo", "Monster Island", "Antarctic Outpost"],
    active: true
  },
  "X-Men": {
    name: "X-Men",
    emoji: "🧬",
    blurb: "Genetic outcasts born with extraordinary powers fight for a world that fears and hates them.",
    history: "The X-Men universe (often a subset of Marvel but standalone in its focus) traces the emergence of 'Homo Superior.' The history centers on the conflicting visions of Charles Xavier and Magneto, following the horrific events of Genosha and the constant threat of mutant extinction at the hands of Sentinels or anti-mutant legislation.",
    lore: "Mutation is the core lore element, triggered by the 'X-Gene.' It serves as a powerful allegory for civil rights and prejudice. The lore involves complex sub-species like the Morlocks, cosmic entities like the Phoenix Force, and the island nation of Krakoa, where mutants finally sought to build their own future.",
    keyLocations: ["Xavier Institute", "Magneto's Asteroid M", "Genosha", "The Savage Land", "Krakoa"],
    active: true
  },
  "Mario": {
    name: "Mario / Mushroom Kingdom",
    emoji: "🍄",
    blurb: "A vibrant world of power-ups, pipes, and platforming where a plumber defends a kingdom from a turtle king.",
    history: "Starting with a simple conflict over a kidnapped princess, the Mushroom Kingdom's history has expanded to include numerous galaxies, time periods, and even parallel paper worlds. The kingdom has survived countless invasions from Bowser's Koopa Troop and and even intergalactic threats like the Shroobs.",
    lore: "The lore is surprisingly deep, involving the Power Stars, Shine Sprites, and the magical properties of Mushrooms and Fire Flowers. The kingdom is populated by diverse species like Toads, Yoshis, and Koopas, all living in a world where physical laws are often fluid and governed by 'wishes' and 'playfulness.'",
    keyLocations: ["Mushroom Kingdom", "Peach's Castle", "Bowser's Castle", "Rainbow Road", "Donkey Kong Island"],
    active: true
  },
  "Harry Potter": {
    name: "Harry Potter / Wizarding World",
    emoji: "🪄",
    blurb: "A hidden world of magic coexisting alongside the non-magical world, centered on the education of young witches and wizards.",
    history: "The Wizarding World has existed for centuries, hidden from 'Muggles' by the International Statute of Secrecy (1692). Its recent history was dominated by the two Wizarding Wars sparked by the dark wizard Lord Voldemort, whose quest for immortality and blood purity nearly destroyed both magical and non-magical societies.",
    lore: "Magic in this universe is an innate ability, refined through study, wands, and ancient spells. Lore includes the four founders of Hogwarts, the Three Deathly Hallows, and the complex laws governing magical creatures and hidden locations like Diagon Alley and Hogsmeade.",
    keyLocations: ["Hogwarts", "Diagon Alley", "Ministry of Magic", "The Burrow", "Forbidden Forest"],
    active: true
  },
  "Lord of the Rings": {
    name: "Lord of the Rings / Middle-earth",
    emoji: "🔥",
    blurb: "The high-fantasy foundation of modern myth. A world of ancient elves, sturdy dwarves, and the enduring spirit of Hobbits standing against the literal personification of evil.",
    history: "Created through the Music of the Ainur, Middle-earth has seen three great ages. From the awakening of the Elves and the theft of the Silmarils to the forging of the Rings of Power and the final defeat of Sauron, its history is a cycle of light and shadow, where even the smallest person can change the course of the future.",
    lore: "The lore of Middle-earth is deeply rooted in linguistics and mythology. It centers on the concept of 'Eestel' (hope) and the struggle against 'The Shadow.' Magic is inherent in the spirit of beings like the Istari and the Elves, often manifesting as craft, wisdom, or the preservation of the natural world rather than mere flashy spells.",
    keyLocations: ["The Shire", "Rivendell", "Moria", "Minas Tirith", "Mount Doom"],
    active: true
  },
  "Transformers": {
    name: "Transformers",
    emoji: "🤖",
    blurb: "A world of sentient, modular robotic organisms from the planet Cybertron, capable of changing their form to survive and protect.",
    history: "The Transformers' history spans millions of years, beginning with their creation by Primus. A brutal civil war between the Autobots and the Decepticons devastated their home planet, Cybertron, forcing many to seek refuge on Earth. This 'Great War' has spanned galaxies, defining the fate of countless worlds.",
    lore: "Transformers lore centers on the life-force known as a 'Spark' and the ancient artifacts like the Matrix of Leadership. Characters possess the unique ability to 'transform' their bodies into vehicles, weapons, or beasts. The eternal struggle between Optimus Prime's ideals of freedom and Megatron's 'Peace through Tyranny' drives their conflict.",
    keyLocations: ["Cybertron", "Iacon", "Kaon", "The Ark", "Mission City"],
    active: true
  },
  "Power Rangers": {
    name: "Power Rangers",
    emoji: "⚡️",
    blurb: "A team of teenagers with attitude granted extraordinary powers by the sage Zordon to defend Earth from intergalactic threats.",
    history: "The Power Rangers began when the sage Zordon, trapped in a time warp, sensed the return of the evil space witch Rita Repulsa. He recruited five 'teenagers with attitude' and provided them with power coins and prehistoric-themed giant robots known as Dinozords. This marked the beginning of a legacy that has seen countless teams across different generations and dimensions, all linked by the Morphin Grid.",
    lore: "The Power Rangers lore centers on the 'Morphin Grid,' a multidimensional energy field that fuels their transformations and weapons. It explores themes of teamwork, heroism, and the eternal struggle between the 'Light of Goodness' and the 'Emperors of Evil.' The giant robots known as Zords, which combine into the colossal Megazord, are iconic symbols of their combined strength.",
    keyLocations: ["Angel Grove", "The Command Center", "Moon Palace", "Desert Quarry", "Youth Center"],
    active: true
  },
  "Pokemon": {
    name: "Pokemon",
    emoji: "🔴",
    blurb: "A world of elemental creatures known as Pokemon, who coexist with humans in a bond of friendship and competitive spirit.",
    history: "The Pokemon universe began with the awakening of Arceus, the 'Original One,' who shaped the world and its regions. Over millennia, legendary creatures like Rayquaza and Mewtwo established their domains, while humanity developed the Poke Ball technology to foster a unique partnership with these pocket monsters. The modern era is defined by the quest to 'Catch 'Em All' and the prestige of the Pokemon League championships.",
    lore: "The core of Pokemon lore is the elemental affinity system, where creatures harness the power of Fire, Water, Electric, and other types to perform extraordinary feats. Lore also explores the mysteries of Mega Evolution—a temporary, powerful transformation triggered by a strong bond—and the presence of Mythical and Legendary beings that maintain the balance of nature. The world emphasizes growth, strategy, and the indomitable spirit of both trainer and Pokemon.",
    keyLocations: ["Pallet Town", "Indigo Plateau", "Mt. Silver", "Luminous City", "Spear Pillar"],
    active: true
  },
  "Dragon Ball Z": {
    name: "Dragon Ball Z",
    emoji: "🐉",
    blurb: "A high-octane universe where martial arts, alien warriors, and ancient dragons collide in battles that shatter planets.",
    history: "Spanning from the early days of Earth to the depths of space, the history of DBZ is marked by the Saiyan invasion, the tyranny of Frieza, and the awakening of ancient monsters like Majin Buu. It is a chronicle of constant evolution and the search for the legendary Dragon Balls, which can grant any wish to those who gather them.",
    lore: "Power is measured in 'Ki'—a spiritual energy that can be focused into devastating beams or used to augment physical strikes. The Saiyan race, known for their Zenkai boosts and golden transformations, stands at the center of the universe's greatest conflicts. From the pursuit of immortality to the struggle against cosmic gods, DBZ lore is built on the philosophy of exceeding one's limits through sheer will and training.",
    keyLocations: ["Planet Namek", "Kami's Lookout", "Hyperbolic Time Chamber", "World Martial Arts Tournament", "King Kai's Planet"],
    active: false
  },
  "Ancient Greek Monsters": {
    name: "Ancient Greek Monsters",
    emoji: "🏛️",
    blurb: "A world of myth and legend where gods and monsters duel for the fate of civilization.",
    history: "The history of the Greek Monsters is a chronicle of divine conflict and the untamed forces of nature. Many of the most terrifying beasts were born to Typhon and Echidna, designed to challenge the Olympian gods or serve as guardians of the boundaries between worlds. Their stories are woven into the very fabric of Greek mythology, representing the chaos that heroes must overcome to establish order.",
    lore: "Greek monster lore is defined by the intersection of beauty and horror, wisdom and brute force. From the petrifying gaze of Medusa to the reality-shaking strength of Typhon, these beings possess unique, often cursed abilities. They frequently serve as protectors of secret paths or as punishments sent by the gods, making them some of the most enduring symbols of the ancient world.",
    keyLocations: ["The Labyrinth", "Strait of Messina", "Mount Etna", "The Underworld Gates", "Lerna Swamps"],
    active: false
  },
  "How to Train Your Dragon": {
    name: "How to Train Your Dragon",
    emoji: "🐲",
    blurb: "A soaring adventure where the bond between man and dragon can change the world.",
    history: "The history of the Archipelago was once a saga of endless war between the Vikings of Berk and the dragons that raided their shores. This cycle of violence was broken by Hiccup Haddock III, who befriended a Night Fury and proved that dragons could be partners instead of enemies. Today, the world remembers the Dragon Riders of Berk as the pioneers of a new age of discovery and empathy.",
    lore: "Dragon lore is built on the diversity of species—from the swift Strike-class Night Furies to the massive, ice-breathing Tidal-class Alphas. The core of this universe is the 'Bond'—a deep, mutual trust that allows a rider and dragon to move as one. While raw power is common, the true strength of this universe lies in tactical innovation, species-specific abilities, and the indomitable spirit of those who dare to fly.",
    keyLocations: ["The Isle of Berk", "The Hidden World", "Dragon Island", "Drago's Sanctuary", "Itchy Armpit"],
    active: false
  }
};

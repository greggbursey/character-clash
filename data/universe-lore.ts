export interface UniverseLore {
  name: string;
  blurb: string;
  history: string;
  lore: string;
  keyLocations: string[];
}

export const universeLoreData: Record<string, UniverseLore> = {
  "DC": {
    name: "DC Universe",
    blurb: "Home to gods amongst men. The DC Universe is defined by legacy, symbols of hope, and crisis events that shatter reality itself.",
    history: "The DC Universe began with the Big Bang, but its history is marked by 'Crisis' events that have reshaped reality multiple times. It is a multiverse where different Earths exist, though the 'Prime Earth' is the central focus of most legends. The age of heroes began with the arrival of Superman, inspiring a generation of mystery men and gods to step into the light.",
    lore: "Characterized by god-like power and moral absolutes, the DC lore centers on the concept of 'The Source' and the 'Emotional Spectrum.' Heroes are often seen as modern mythological figures—icons like the Trinity (Superman, Batman, Wonder Woman) who represent the pinnacle of truth, justice, and human determination.",
    keyLocations: ["Metropolis", "Gotham City", "Themyscira", "Oa", "Apokolips"]
  },
  "Marvel": {
    name: "Marvel Universe",
    blurb: "The world outside your window. Marvel's universe is built on flawed heroes, mutants, and cosmic entities fighting for the fate of reality.",
    history: "Formed billions of years ago by the Celestials, the Marvel Universe is a place where science and magic are inextricably linked. Its modern history is defined by the 'Heroic Age,' which kicked off when the Fantastic Four embarked on their fateful space voyage, followed closely by the Avengers forming to fight foes no single hero could withstand.",
    lore: "Marvel lore emphasizes the 'human' element: heroes with everyday problems, marginalized groups like Mutants (X-Men) fighting for acceptance, and cosmic stakes managed by entities like Eternity and The Living Tribunal. The Power Cosmic, Gamma Radiation, and Magic are the primary drivers of superhuman ability.",
    keyLocations: ["New York City", "Wakanda", "Asgard", "Latveria", "The Negative Zone"]
  },
  "Mortal Kombat": {
    name: "Mortal Kombat",
    blurb: "A brutal multiverse of realms constantly at war. Elder Gods oversee the eternal tournament designed to prevent realms from merging by force.",
    history: "The One Being was the original entity of the MK universe, until the Elder Gods split it into the Six Realms: Earthrealm, Outworld, Netherrealm, Orderrealm, Chaosrealm, and Edenia. To prevent total conquest, the Mortal Kombat tournament was established—a realm must win ten consecutive tournaments to earn the right to invade another.",
    lore: "Soul magic, blood rituals, and elemental mastery define the combatants of Mortal Kombat. The lore is steeped in prophecy, betrayals, and the eternal struggle between those who wish to protect Earthrealm (like Raiden) and those who seek to merge all realms under a single dark rule (like Shao Kahn).",
    keyLocations: ["The pit", "Shang Tsung's Island", "The Netherrealm", "Outworld Colosseum", "The Sky Temple"]
  },
  "Street Fighter": {
    name: "Street Fighter",
    blurb: "A world defined by the pursuit of strength. Martial artists traverse the globe to test their limits against the strongest fighters alive.",
    history: "While it lacks the cosmic reboots of other universes, Street Fighter's history is a global chronicle of martial arts mastery. It traces the rise of organizations like Shadaloo and the Illuminati, and the various 'World Warrior' tournaments that brought together the greatest fighters from every continent to determine who truly is the strongest.",
    lore: "The lore revolves around spiritual energies like 'Satsui no Hado' (The Surge of Murderous Intent) and its counterpart 'Mu no Ken' (The Power of Nothingness). Characters harness these internal forces to perform superhuman feats, often while navigating the corrupting influence of power and the discipline of ancient fighting styles.",
    keyLocations: ["Suzaku Castle", "Metro City", "Thailand Temple", "Brazil Rainforest", "The Grid"]
  },
  "TMNT": {
    name: "TMNT",
    blurb: "Four mutant brothers trained in ninjutsu by their rat sensei fight crime from the shadows of New York City.",
    history: "The TMNT universe began in the sewers of NYC, where four turtles and a Japanese master were exposed to 'The Ooze.' Their history involves an ancient feud between the Hamato Clan and the Foot Clan, spanning generations and eventually expanding to include alien worlds (Dimension X) and time-traveling adventures.",
    lore: "Lore focuses on the concepts of family, ninjutsu honor, and the intersection of urban grit with sci-fi weirdness. The 'Utrom' aliens, the 'Technodrome,' and the 'Pantheon' of animal gods add layers of mysticism and high-tech conflict to the turtles' street-level lives.",
    keyLocations: ["The Sewers", "TCRI Building", "Dimension X", "April's Apartment", "Technodrome"]
  },
  "Star Wars": {
    name: "Star Wars",
    blurb: "A galaxy far, far away defined by the eternal struggle between the light and dark sides of the Force.",
    history: "The history of the galaxy is recorded in eras: the High Republic, the Fall of the Jedi, the Reign of the Empire, and the Rise of the First Order. For millennia, the Republic stood as a bastion of peace, until the Sith Lord Darth Sidious orchestrated its collapse, leading to a cycle of civil wars and the search for balance.",
    lore: "The Force is the central pillar of Star Wars lore—an energy field that binds the galaxy together. Whether interpreted through the Jedi Code or the Sith's rule of two, the Force grants its users telepathic and kinetic abilities, while fueling the eternal conflict between selfless service and selfish power.",
    keyLocations: ["Tatooine", "Coruscant", "Death Star", "Dagobah", "Endor"]
  },
  "Godzilla": {
    name: "Godzilla / Monsterverse",
    blurb: "The realm of titans. Colossal prehistoric beasts awaken from the depths of the Earth to restore balance to nature.",
    history: "Titans have existed since the dawn of time, ruling the Earth long before humanity's rise. They retreated into the Hollow Earth or went into hibernation as the world cooled. In 1954, the awakening of Godzilla marked the beginning of the 'Titan Age,' where humanity realized it was no longer the apex predator.",
    lore: "Titan lore is based on the idea of 'Biological Guardians'—monsters that feed on radiation and maintain the planet's ecosystem. Monarch, a secret organization, studies these 'Great Ancients,' unraveling the mysteries of the Hollow Earth and the ancient rivalries between Godzilla and other alphas like Kong and Ghidorah.",
    keyLocations: ["Hollow Earth", "Skull Island", "Tokyo", "Monster Island", "Antarctic Outpost"]
  },
  "X-Men": {
    name: "X-Men",
    blurb: "Genetic outcasts born with extraordinary powers fight for a world that fears and hates them.",
    history: "The X-Men universe (often a subset of Marvel but standalone in its focus) traces the emergence of 'Homo Superior.' The history centers on the conflicting visions of Charles Xavier and Magneto, following the horrific events of Genosha and the constant threat of mutant extinction at the hands of Sentinels or anti-mutant legislation.",
    lore: "Mutation is the core lore element, triggered by the 'X-Gene.' It serves as a powerful allegory for civil rights and prejudice. The lore involves complex sub-species like the Morlocks, cosmic entities like the Phoenix Force, and the island nation of Krakoa, where mutants finally sought to build their own future.",
    keyLocations: ["Xavier Institute", "Magneto's Asteroid M", "Genosha", "The Savage Land", "Krakoa"]
  },
  "Mario": {
    name: "Mario / Mushroom Kingdom",
    blurb: "A vibrant world of power-ups, pipes, and platforming where a plumber defends a kingdom from a turtle king.",
    history: "Starting with a simple conflict over a kidnapped princess, the Mushroom Kingdom's history has expanded to include numerous galaxies, time periods, and even parallel paper worlds. The kingdom has survived countless invasions from Bowser's Koopa Troop and and even intergalactic threats like the Shroobs.",
    lore: "The lore is surprisingly deep, involving the Power Stars, Shine Sprites, and the magical properties of Mushrooms and Fire Flowers. The kingdom is populated by diverse species like Toads, Yoshis, and Koopas, all living in a world where physical laws are often fluid and governed by 'wishes' and 'playfulness.'",
    keyLocations: ["Mushroom Kingdom", "Peach's Castle", "Bowser's Castle", "Rainbow Road", "Donkey Kong Island"]
  },
  "Harry Potter": {
    name: "Harry Potter / Wizarding World",
    blurb: "A hidden world of magic coexisting alongside the non-magical world, centered on the education of young witches and wizards.",
    history: "The Wizarding World has existed for centuries, hidden from 'Muggles' by the International Statute of Secrecy (1692). Its recent history was dominated by the two Wizarding Wars sparked by the dark wizard Lord Voldemort, whose quest for immortality and blood purity nearly destroyed both magical and non-magical societies.",
    lore: "Magic in this universe is an innate ability, refined through study, wands, and ancient spells. Lore includes the four founders of Hogwarts, the Three Deathly Hallows, and the complex laws governing magical creatures and hidden locations like Diagon Alley and Hogsmeade.",
    keyLocations: ["Hogwarts", "Diagon Alley", "Ministry of Magic", "The Burrow", "Forbidden Forest"]
  },
  "Lord of the Rings": {
    name: "Lord of the Rings / Middle-earth",
    blurb: "The high-fantasy foundation of modern myth. A world of ancient elves, sturdy dwarves, and the enduring spirit of Hobbits standing against the literal personification of evil.",
    history: "Created through the Music of the Ainur, Middle-earth has seen three great ages. From the awakening of the Elves and the theft of the Silmarils to the forging of the Rings of Power and the final defeat of Sauron, its history is a cycle of light and shadow, where even the smallest person can change the course of the future.",
    lore: "The lore of Middle-earth is deeply rooted in linguistics and mythology. It centers on the concept of 'Eestel' (hope) and the struggle against 'The Shadow.' Magic is inherent in the spirit of beings like the Istari and the Elves, often manifesting as craft, wisdom, or the preservation of the natural world rather than mere flashy spells.",
    keyLocations: ["The Shire", "Rivendell", "Moria", "Minas Tirith", "Mount Doom"]
  },
  "Transformers": {
    name: "Transformers",
    blurb: "A world of sentient, modular robotic organisms from the planet Cybertron, capable of changing their form to survive and protect.",
    history: "The Transformers' history spans millions of years, beginning with their creation by Primus. A brutal civil war between the Autobots and the Decepticons devastated their home planet, Cybertron, forcing many to seek refuge on Earth. This 'Great War' has spanned galaxies, defining the fate of countless worlds.",
    lore: "Transformers lore centers on the life-force known as a 'Spark' and the ancient artifacts like the Matrix of Leadership. Characters possess the unique ability to 'transform' their bodies into vehicles, weapons, or beasts. The eternal struggle between Optimus Prime's ideals of freedom and Megatron's 'Peace through Tyranny' drives their conflict.",
    keyLocations: ["Cybertron", "Iacon", "Kaon", "The Ark", "Mission City"]
  }
};

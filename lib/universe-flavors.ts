// Universe-specific combat flavor dictionaries for dynamic story generation

export interface UniverseFlavor {
  combatStyle: string[];
  weapons: string[];
  impacts: string[];
  environments: string[];
  verbs: string[];
  atmosphere: string[];
}

const defaultFlavor: UniverseFlavor = {
  combatStyle: ["raw power", "sheer force", "multiverse energy"],
  weapons: ["their signature weapon", "cosmic might", "raw energy"],
  impacts: ["shockwaves", "blinding light", "thunderous force"],
  environments: ["a fractured battlefield", "the edge of reality", "a war-torn arena"],
  verbs: ["strikes", "unleashes", "channels", "hurls"],
  atmosphere: ["the air itself trembles", "reality warps around them", "the ground cracks beneath the pressure"],
};

export const universeFlavorMap: Record<string, UniverseFlavor> = {
  "Harry Potter": {
    combatStyle: ["wand dueling", "spell-slinging", "arcane combat", "hexwork"],
    weapons: ["wands", "curses", "hexes", "enchanted blades", "dark charms"],
    impacts: ["sparks of light", "magical shockwaves", "bursts of silver flame", "crackling spell-fire"],
    environments: ["the Great Hall", "a moonlit courtyard", "the Forbidden Forest", "the ruins of Hogwarts"],
    verbs: ["casts", "conjures", "summons", "hexes", "transfigures"],
    atmosphere: ["the air crackles with arcane energy", "wand-light flickers in the darkness", "ancient magic hums through the stones"],
  },
  "Mario": {
    combatStyle: ["power-up brawling", "platforming fury", "Mushroom Kingdom chaos"],
    weapons: ["fire flowers", "koopa shells", "super stars", "bob-ombs", "power-ups"],
    impacts: ["explosive fireball bursts", "shell ricochets", "rainbow star trails", "coin-scattering impacts"],
    environments: ["Rainbow Road", "Bowser's Castle", "a floating cloud platform", "a lava-filled fortress"],
    verbs: ["stomps", "launches", "power-ups into", "fireballs", "ground-pounds"],
    atmosphere: ["question blocks shimmer overhead", "pipes rattle with hidden power", "the Mushroom Kingdom trembles"],
  },
  "Star Wars": {
    combatStyle: ["lightsaber combat", "Force warfare", "galactic dueling"],
    weapons: ["lightsabers", "the Force", "blasters", "Force lightning", "a kyber-crystal blade"],
    impacts: ["searing plasma clashes", "Force shockwaves", "blinding saber locks", "telekinetic blasts"],
    environments: ["a Star Destroyer bridge", "the Jedi Temple", "a volcanic hellscape", "the frozen tundra of Hoth"],
    verbs: ["slashes", "Force-pushes", "deflects", "channels the Force into", "ignites"],
    atmosphere: ["the hum of lightsabers fills the void", "the Force ripples between them", "a disturbance echoes through the galaxy"],
  },
  "Street Fighter": {
    combatStyle: ["martial arts", "ki-fueled striking", "hand-to-hand combat", "mixed martial arts"],
    weapons: ["fists", "ki blasts", "hadoukens", "shoryukens", "spinning kicks"],
    impacts: ["bone-crunching hits", "ki explosions", "sonic booms", "ground-shattering uppercuts"],
    environments: ["a neon-lit dojo", "a crowded street corner", "the World Warrior tournament ring"],
    verbs: ["strikes", "counters", "parries", "unleashes a combo on", "uppercuts"],
    atmosphere: ["ki energy radiates from their stance", "the crowd roars in anticipation", "fighting spirit ignites the arena"],
  },
  "Mortal Kombat": {
    combatStyle: ["brutal kombat", "realm-shaking violence", "fatality-level fighting"],
    weapons: ["soul magic", "cursed blades", "elemental fury", "spine-ripping force"],
    impacts: ["blood-soaked shockwaves", "bone-snapping impacts", "soul-rending blasts", "realm-tearing fractures"],
    environments: ["the Pit", "Outworld's Colosseum", "the Netherrealm", "Shang Tsung's island"],
    verbs: ["eviscerates", "impales", "shatters", "annihilates", "finishes"],
    atmosphere: ["the Elder Gods watch in silence", "blood stains the arena floor", "a voice booms: FIGHT"],
  },
  "TMNT": {
    combatStyle: ["ninjutsu", "sewer-born brawling", "ninja teamwork"],
    weapons: ["katanas", "sais", "bo staffs", "nunchucks", "smoke bombs"],
    impacts: ["steel-on-steel clangs", "ninja star ricochets", "shell-cracking blows"],
    environments: ["the rooftops of NYC", "the sewers", "the Technodrome", "a dark alleyway"],
    verbs: ["slashes", "shell-spins into", "ambushes", "ninja-vanishes past", "dropkicks"],
    atmosphere: ["shadows shift on the rooftops", "the sewers echo with battle cries", "cowabunga energy fills the air"],
  },
  "Marvel": {
    combatStyle: ["superhero warfare", "cosmic-powered combat", "Avengers-level destruction"],
    weapons: ["repulsor blasts", "vibranium shields", "cosmic energy", "gamma-powered fists"],
    impacts: ["city-leveling shockwaves", "cosmic detonations", "vibranium-ringing impacts"],
    environments: ["the streets of New York", "the Wakandan battlefield", "Avengers Tower", "deep space"],
    verbs: ["blasts", "smashes", "hurls", "charges", "assembles against"],
    atmosphere: ["the Avengers theme swells", "the skyline glows with superhero energy", "the multiverse holds its breath"],
  },
  "DC": {
    combatStyle: ["godlike combat", "heroic warfare", "justice-fueled brawling"],
    weapons: ["heat vision", "power rings", "Batarangs", "the Lasso of Truth", "Kryptonian might"],
    impacts: ["planet-shaking punches", "speed-force lightning", "emerald constructs shattering"],
    environments: ["the skies above Metropolis", "the dark alleys of Gotham", "Themyscira's shores", "the Watchtower"],
    verbs: ["smashes", "flies through", "outpaces", "constructs a weapon against", "overpowers"],
    atmosphere: ["hope burns like a beacon", "justice demands a reckoning", "darkness and light collide"],
  },
  "Dragon Ball Z": {
    combatStyle: ["ki-powered combat", "Saiyan warfare", "power-level-shattering brawling"],
    weapons: ["Kamehameha waves", "ki blasts", "Spirit Bombs", "Final Flashes", "destructo discs"],
    impacts: ["planet-cracking explosions", "power-level surges", "golden transformation shockwaves"],
    environments: ["a barren wasteland", "the World Tournament arena", "Planet Namek", "the Hyperbolic Time Chamber"],
    verbs: ["powers up against", "instant-transmissions behind", "fires a beam at", "ascends beyond"],
    atmosphere: ["power levels spike beyond all scanners", "the planet trembles under their aura", "hair turns gold as a new form awakens"],
  },
  "Pokemon": {
    combatStyle: ["type-advantage battling", "trainer-commanded combat", "elemental warfare"],
    weapons: ["elemental moves", "Thunderbolts", "Hydro Pumps", "Flamethrowers", "Hyper Beams"],
    impacts: ["super-effective hits", "critical-hit explosions", "type-matched devastation"],
    environments: ["a Pokemon League stadium", "a tall grass field", "the Elite Four chamber", "a volcanic island"],
    verbs: ["uses", "commands", "mega-evolves into", "unleashes", "counters with"],
    atmosphere: ["a Poke Ball clicks open", "the crowd at the League roars", "evolution energy surges through the air"],
  },
  "Lord of the Rings": {
    combatStyle: ["ancient warfare", "blade-and-sorcery combat", "fellowship-forged fighting"],
    weapons: ["elven blades", "ancient swords", "wizard staffs", "dwarven axes", "Morgul blades"],
    impacts: ["clashing steel echoes", "blinding white magic", "thunderous cavalry charges"],
    environments: ["the fields of Pelennor", "the depths of Moria", "the slopes of Mount Doom", "Helm's Deep"],
    verbs: ["charges", "smites", "defends", "rallies against", "cuts through"],
    atmosphere: ["horns of Rohan echo in the distance", "shadow and flame wrestle for dominion", "ancient songs of war fill the air"],
  },
  "Transformers": {
    combatStyle: ["cybernetic warfare", "vehicle-mode combat", "Energon-fueled brawling"],
    weapons: ["ion cannons", "Energon blades", "fusion cannons", "cyber-swords", "arm-mounted blasters"],
    impacts: ["metal-rending explosions", "Energon detonations", "transformation shockwaves"],
    environments: ["the ruins of Cybertron", "a highway overpass", "the Ark's bridge", "Mission City"],
    verbs: ["transforms and charges", "blasts", "deploys weaponry against", "shifts forms to ambush"],
    atmosphere: ["gears grind and metal shrieks", "Energon crackles through their Sparks", "the war for Cybertron rages on"],
  },
  "Godzilla": {
    combatStyle: ["kaiju warfare", "titan-scale destruction", "atomic-powered brawling"],
    weapons: ["atomic breath", "gravity beams", "massive claws", "tail sweeps", "thermonuclear pulses"],
    impacts: ["city-flattening stomps", "nuclear shockwaves", "tidal wave-inducing crashes"],
    environments: ["a decimated Tokyo skyline", "the Hollow Earth", "Skull Island", "a burning metropolis"],
    verbs: ["roars and charges", "breathes atomic fire at", "tail-whips", "body-slams"],
    atmosphere: ["sirens wail across the city", "the ground quakes under titanic feet", "the ocean boils with radioactive heat"],
  },
  "X-Men": {
    combatStyle: ["mutant warfare", "X-Gene-powered combat", "psychic-and-physical assault"],
    weapons: ["optic blasts", "adamantium claws", "psychic attacks", "magnetic force", "weather manipulation"],
    impacts: ["mutant-energy flares", "psychic shockwaves", "Cerebro-amplified blasts"],
    environments: ["the Danger Room", "Xavier's Institute grounds", "Genosha", "the Savage Land"],
    verbs: ["mutates and strikes", "psychically assaults", "unleashes their X-Gene on", "phases through"],
    atmosphere: ["the X-Gene hums with evolutionary fury", "Sentinels loom on the horizon", "mutation is both gift and curse today"],
  },
  "Power Rangers": {
    combatStyle: ["morphed combat", "Zord-powered warfare", "team formation fighting"],
    weapons: ["Power Morphers", "Blade Blasters", "Power Swords", "Megazord strikes"],
    impacts: ["morphing-grid surges", "color-coded explosions", "Megazord-level tremors"],
    environments: ["Angel Grove", "the Command Center", "a rocky quarry", "the Moon Palace steps"],
    verbs: ["morphs and strikes", "calls upon the Morphin Grid to", "summons a Zord against", "combines forces on"],
    atmosphere: ["it's morphin' time echoes across the battlefield", "the Morphin Grid crackles with energy", "five beams of color converge"],
  },
  "Ancient Greek Monsters": {
    combatStyle: ["mythological combat", "divine-beast warfare", "legendary beast clashing"],
    weapons: ["venomous fangs", "petrifying gazes", "divine fire", "cursed claws", "titan-forged strength"],
    impacts: ["earth-splitting roars", "petrifying shockwaves", "divine thunder-strikes"],
    environments: ["the Labyrinth", "Mount Olympus", "the gates of the Underworld", "the wine-dark sea"],
    verbs: ["lunges with mythic fury at", "unleashes a cursed gaze on", "tramples", "devours"],
    atmosphere: ["the gods watch from Olympus", "ancient prophecy unfolds", "the myths themselves come alive"],
  },
  "How to Train Your Dragon": {
    combatStyle: ["dragon-rider combat", "aerial dogfighting", "fire-breathing warfare"],
    weapons: ["plasma blasts", "fire breath", "tail strikes", "diving attacks", "sonic roars"],
    impacts: ["scorching fireballs", "wing-gust shockwaves", "crater-forming dive-bombs"],
    environments: ["the skies above Berk", "the Hidden World", "Dragon Island", "a stormy ocean"],
    verbs: ["dive-bombs", "breathes fire at", "barrel-rolls past", "swoops and strikes"],
    atmosphere: ["dragon roars split the clouds", "the bond between rider and dragon blazes bright", "wings beat like thunder"],
  },
  "Spongebob": {
    combatStyle: ["nautical nonsense combat", "undersea slapstick", "Bikini Bottom brawling"],
    weapons: ["spatulas", "jellyfish nets", "bubble attacks", "karate chops", "the Secret Formula"],
    impacts: ["bubble-popping shockwaves", "jellyfish-sting zaps", "Krabby-Patty-powered hits"],
    environments: ["the Krusty Krab", "Jellyfish Fields", "Bikini Bottom", "Rock Bottom"],
    verbs: ["karate-chops", "bubble-blasts", "jellyfish-stings", "spatula-flips"],
    atmosphere: ["nautical nonsense fills the water", "bubbles rise from the chaos", "the ocean floor shakes with absurdity"],
  },
};

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function getFlavor(universe: string): UniverseFlavor {
  return universeFlavorMap[universe] || defaultFlavor;
}

export function getBlendedFlavor(u1: string, u2: string) {
  const f1 = getFlavor(u1);
  const f2 = getFlavor(u2);
  return { f1, f2, pick };
}

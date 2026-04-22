import { Character } from "@/data/types";
import { getBlendedFlavor } from "./universe-flavors";

export interface StoryPanel {
  id: string;
  type: 'intro' | 'buildup' | 'clash' | 'climax' | 'resolution' | 'aftermath';
  text: string;
  focus: 1 | 2 | 'split';
  effect: 'pan' | 'zoom' | 'shake' | 'flash' | 'none';
  layout?: 'standard' | 'army';
  imageType1?: 'preview' | 'background';
  imageType2?: 'preview' | 'background';
  images1?: { url: string; name: string }[];
  images2?: { url: string; name: string }[];
}

const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function generateStory(
  mode: 'battle' | 'universe',
  name1: string,
  name2: string,
  winner: 1 | 2,
  p1: number,
  p2: number,
  withGear1: boolean,
  withPrep1: boolean,
  withGear2: boolean,
  withPrep2: boolean,
  charPool1: Character[] = [],
  charPool2: Character[] = [],
  universe1: string = '',
  universe2: string = ''
): StoryPanel[] {
  const panels: StoryPanel[] = [];
  const p1Wins = winner === 1;
  const winnerName = p1Wins ? name1 : name2;
  const loserName = p1Wins ? name2 : name1;
  
  const gap = Math.abs(p1 - p2);
  const isClose = gap < 300;
  const isDomination = gap > 1200;
  
  const winnerHadPrep = p1Wins ? withPrep1 : withPrep2;
  const winnerHadGear = p1Wins ? withGear1 : withGear2;

  // Universe flavors
  const u1 = universe1 || charPool1[0]?.universe || '';
  const u2 = universe2 || charPool2[0]?.universe || '';
  const { f1, f2, pick } = getBlendedFlavor(u1, u2);

  // Helper to slice character pools for rotation
  const getSlice = (pool: Character[], index: number, count: number) => {
    if (pool.length === 0) return [];
    const start = (index * count) % pool.length;
    let result = pool.slice(start, start + count);
    if (result.length < count && pool.length > count) {
      result = [...result, ...pool.slice(0, count - result.length)];
    }
    return result.map(c => ({ url: c.previewUrl, name: c.name }));
  };

  const getBackground = (pool: Character[], index: number) => {
    if (pool.length === 0) return "";
    return pool[index % pool.length].backgroundUrl;
  };

  // ═══════════════════════════════════════════════════════════
  // 1. INTRO TEMPLATES (12 variations)
  // ═══════════════════════════════════════════════════════════
  const introPool = [
    // Universe-flavored
    mode === 'universe'
      ? `The cosmic scales tilt as the realm of ${name1} collides with the forces of ${name2}. ${pick(f1.atmosphere)}.`
      : `${pick(f1.atmosphere)}. ${name1} and ${name2} have finally met on the field of honor.`,
    `A silence falls over the multiverse. Two titans, ${name1} and ${name2}, prepare for an inevitable confrontation. ${pick(f2.atmosphere)}.`,
    `History is written by the victors, and today, a new chapter begins as ${name1} faces ${name2}. ${pick(f1.atmosphere)}.`,
    `Across ${pick(f1.environments)}, a challenge rings out. ${name1} stands ready. From ${pick(f2.environments)}, ${name2} answers the call.`,
    `The ground beneath ${pick(f1.environments)} fractures as two worlds converge. ${name1} vs. ${name2}—there can be only one.`,
    `Legends speak of this moment. The unstoppable force of ${name1} meets the immovable object of ${name2}. ${pick(f2.atmosphere)}.`,
    `From the depths of ${pick(f1.environments)}, ${name1} emerges. Across the void, ${name2} waits in ${pick(f2.environments)}. The clash is inevitable.`,
    `A rift tears open between worlds. On one side: ${name1}, wielding ${pick(f1.weapons)}. On the other: ${name2}, armed with ${pick(f2.weapons)}.`,
    `Fate itself has engineered this confrontation. ${name1} and ${name2} lock eyes across ${pick(f1.environments)}, and neither flinches.`,
    `The multiverse trembles. ${pick(f1.atmosphere)}. ${pick(f2.atmosphere)}. Two legends are about to collide.`,
    `Thunder rolls across ${pick(f1.environments)} as ${name1} senses a disturbance. ${name2} has arrived—and they didn't come to talk.`,
    `Every story has a climax. For ${name1} and ${name2}, that moment is now. ${pick(f1.atmosphere)}.`,
  ];

  panels.push({
    id: 'intro',
    type: 'intro',
    text: pickRandom(introPool),
    focus: 'split',
    effect: 'pan',
    layout: mode === 'universe' ? 'army' : 'standard',
    imageType1: 'background',
    imageType2: 'background',
    images1: mode === 'universe' ? getSlice(charPool1, 0, 1).map(i => ({ ...i, url: getBackground(charPool1, 0) })) : [{ url: getBackground(charPool1, 0), name: name1 }],
    images2: mode === 'universe' ? getSlice(charPool2, 0, 1).map(i => ({ ...i, url: getBackground(charPool2, 0) })) : [{ url: getBackground(charPool2, 0), name: name2 }]
  });

  // ═══════════════════════════════════════════════════════════
  // 2. BUILDUP TEMPLATES (10+ variations)
  // ═══════════════════════════════════════════════════════════
  let buildupText = "";
  if (winnerHadPrep) {
    const winnerChar = p1Wins ? charPool1[0] : charPool2[0];
    const strippedPrep = winnerChar?.prepDescription?.replace(/###.*?\n/, '').trim().split('.')[0] || "They have calculated every variable.";
    buildupText = `${winnerName} is perfectly positioned. ${strippedPrep}.`;
  } else {
    const buildupPool = [
      `No words are needed. They study each other's stance, searching for the slightest opening in their ${pick(f1.combatStyle)} and ${pick(f2.combatStyle)}.`,
      `${name1} readies ${pick(f1.weapons)} while ${name2} grips ${pick(f2.weapons)}. The tension is unbearable.`,
      `Eyes locked, muscles coiled. ${name1} shifts into a ${pick(f1.combatStyle)} stance. ${name2} mirrors with ${pick(f2.combatStyle)}.`,
      `${pick(f1.atmosphere)}. ${name2} ${pick(f2.verbs)} a warning—but ${name1} doesn't even blink.`,
      `The ground between them cracks. Neither moves first. This is the calm before a storm of ${pick(f1.combatStyle)} and ${pick(f2.combatStyle)}.`,
      `${name1} circles slowly, ${pick(f1.weapons)} at the ready. ${name2} watches, waiting for the perfect moment to strike with ${pick(f2.weapons)}.`,
      `A bead of sweat forms as ${name1} recognizes the threat. ${name2}'s mastery of ${pick(f2.combatStyle)} is no joke.`,
      `${pick(f1.atmosphere)}. Both warriors size each other up. The first move will decide everything.`,
      `The arena shifts. ${pick(f2.atmosphere)}. ${name1} tightens their grip on ${pick(f1.weapons)}, while ${name2} ${pick(f2.verbs)} their own preparations.`,
      `There is a silence before every storm. ${name1} and ${name2} are the lightning—and the thunder is about to follow.`,
    ];
    buildupText = pickRandom(buildupPool);
  }
  
  panels.push({
    id: 'buildup',
    type: 'buildup',
    text: buildupText,
    focus: 'split',
    effect: 'zoom',
    layout: mode === 'universe' ? 'army' : 'standard',
    imageType1: 'preview',
    imageType2: 'preview',
    images1: getSlice(charPool1, 1, mode === 'universe' ? 4 : 1),
    images2: getSlice(charPool2, 1, mode === 'universe' ? 4 : 1)
  });

  // ═══════════════════════════════════════════════════════════
  // 3. CLASH TEMPLATES (12 variations)
  // ═══════════════════════════════════════════════════════════
  let clashText = "";
  if (winnerHadGear) {
    const winnerChar = p1Wins ? charPool1[0] : charPool2[0];
    const strippedGear = winnerChar?.gearDescription?.replace(/###.*?\n/, '').trim().split('\n')[0].replace('- ', '') || "their superior arsenal";
    clashText = `${winnerName} unleashes their secret weapon! Using ${strippedGear}, they smash through the opposition's guard!`;
  } else {
    const wF = p1Wins ? f1 : f2;
    const lF = p1Wins ? f2 : f1;
    const clashPool = [
      `They collide in a whirlwind of ${pick(f1.combatStyle)} and ${pick(f2.combatStyle)}! ${pick(f1.impacts)} meets ${pick(f2.impacts)}. Neither side is willing to give an inch!`,
      `${name1} ${pick(f1.verbs)} with devastating precision! ${name2} answers with ${pick(f2.weapons)}—${pick(f2.atmosphere)}!`,
      `The ground trembles as ${pick(f1.weapons)} connects with ${pick(f2.weapons)}. ${pick(f1.impacts)} erupts across the arena!`,
      `${pick(f1.impacts)} rips through the air as ${name1} presses the attack! ${name2} counters with ${pick(f2.combatStyle)}, refusing to yield!`,
      `A furious exchange! ${name1} ${pick(f1.verbs)} with ${pick(f1.weapons)}, but ${name2} ${pick(f2.verbs)} right back! ${pick(f2.impacts)} fills the sky!`,
      `${name1} charges with the fury of ${pick(f1.combatStyle)}! ${name2} digs in, answering with ${pick(f2.impacts)}. The clash sends shockwaves across ${pick(wF.environments)}!`,
      `This is no ordinary fight. ${pick(f1.weapons)} against ${pick(f2.weapons)}—the collision creates ${pick(f1.impacts)} and ${pick(f2.impacts)} in equal measure!`,
      `${name2} ${pick(f2.verbs)} a devastating counter! But ${name1} absorbs the blow and retaliates with ${pick(f1.weapons)}! The exchange is relentless!`,
      `Back and forth they trade blows. ${pick(f1.combatStyle)} against ${pick(f2.combatStyle)}, neither gaining a clear advantage. ${pick(lF.atmosphere)}!`,
      `${name1} ${pick(f1.verbs)} a barrage of ${pick(f1.weapons)}! ${name2} weaves through the onslaught, retaliating with ${pick(f2.impacts)}!`,
      `The arena shakes as ${pick(f1.impacts)} slams against ${pick(f2.impacts)}! ${name1} and ${name2} are locked in a stalemate of raw power!`,
      `Blow after blow, neither relents. ${pick(wF.atmosphere)}, and the combatants fight like their very existence depends on it—because it does.`,
    ];
    clashText = pickRandom(clashPool);
  }

  panels.push({
    id: 'clash',
    type: 'clash',
    text: clashText,
    focus: 'split',
    effect: 'shake',
    layout: mode === 'universe' ? 'army' : 'standard',
    imageType1: 'background',
    imageType2: 'background',
    images1: [{ url: getBackground(charPool1, 1), name: name1 }],
    images2: [{ url: getBackground(charPool2, 1), name: name2 }]
  });

  // ═══════════════════════════════════════════════════════════
  // 4. CLIMAX TEMPLATES (12 variations)
  // ═══════════════════════════════════════════════════════════
  const wF = p1Wins ? f1 : f2;

  let climaxText = "";
  if (isDomination) {
    const dominationPool = [
      `Absolute dominance! ${winnerName} ${pick(wF.verbs)} a final, crushing blow that echoes throughout the realm. ${pick(wF.impacts)} consumes everything in sight.`,
      `It's over. ${winnerName} ${pick(wF.verbs)} with overwhelming ${pick(wF.combatStyle)}, leaving ${loserName} with no answer. Total obliteration.`,
      `Not even close. ${winnerName} channels ${pick(wF.weapons)} into a single, devastating strike. ${loserName} never stood a chance. ${pick(wF.atmosphere)}.`,
      `The gap in power is undeniable. ${winnerName} ${pick(wF.verbs)} through ${loserName}'s defenses like they were made of paper. ${pick(wF.impacts)} seals the victory.`,
    ];
    climaxText = pickRandom(dominationPool);
  } else if (isClose) {
    const closePool = [
      `A razor-thin margin! In a final, desperate lunge, ${winnerName} ${pick(wF.verbs)} the winning strike with ${pick(wF.weapons)}!`,
      `It could have gone either way! ${winnerName} finds the tiniest opening and ${pick(wF.verbs)} through it. ${pick(wF.impacts)} seals the narrowest of victories!`,
      `Down to the wire! Both fighters are spent, but ${winnerName} digs deep, channeling one last burst of ${pick(wF.combatStyle)} for the win!`,
      `${loserName} falters for just a fraction of a second—and that's all ${winnerName} needs. A precise strike with ${pick(wF.weapons)} ends this epic clash!`,
    ];
    climaxText = pickRandom(closePool);
  } else {
    const standardPool = [
      `${winnerName} finds the opening! A lightning-fast strike with ${pick(wF.weapons)} seals the fate of ${loserName} once and for all.`,
      `The tide turns decisively! ${winnerName} ${pick(wF.verbs)} a masterful combination, breaking through ${loserName}'s guard with ${pick(wF.impacts)}!`,
      `${winnerName} reads ${loserName}'s next move perfectly. A counter-strike with ${pick(wF.weapons)} lands clean—${pick(wF.atmosphere)}!`,
      `Experience and skill triumph! ${winnerName}'s superior ${pick(wF.combatStyle)} overwhelms ${loserName}'s defenses. ${pick(wF.impacts)} marks the decisive moment!`,
    ];
    climaxText = pickRandom(standardPool);
  }

  panels.push({
    id: 'climax',
    type: 'climax',
    text: climaxText,
    focus: winner,
    effect: 'flash',
    layout: mode === 'universe' ? 'army' : 'standard',
    imageType1: 'preview',
    imageType2: 'preview',
    images1: p1Wins ? getSlice(charPool1, 2, mode === 'universe' ? 4 : 1) : getSlice(charPool1, 3, mode === 'universe' ? 4 : 1),
    images2: !p1Wins ? getSlice(charPool2, 2, mode === 'universe' ? 4 : 1) : getSlice(charPool2, 3, mode === 'universe' ? 4 : 1)
  });

  // ═══════════════════════════════════════════════════════════
  // 5. AFTERMATH TEMPLATES (10 variations)
  // ═══════════════════════════════════════════════════════════
  const aftermathOptions = [
    `${winnerName} emerges from the smoke, weary but triumphant. ${pick(wF.atmosphere)}. Their name will be whispered in awe for generations to come.`,
    `Victory belongs to ${winnerName}! The cosmic scales have been reset, and a new champion is crowned in ${pick(wF.environments)}.`,
    `${loserName} falls to one knee. Even in defeat, they fought with honor. But today, ${winnerName} proved that ${pick(wF.combatStyle)} reigns supreme.`,
    `The dust settles over ${pick(wF.environments)}. ${winnerName} stands alone, battered but unbroken. This is what legends are made of.`,
    `Silence returns. ${winnerName} lowers ${pick(wF.weapons)} and looks out over the battlefield. ${pick(wF.atmosphere)}. A new era begins.`,
    `From the ashes of this epic clash, ${winnerName} rises. ${loserName} gave everything, but ${pick(wF.combatStyle)} and sheer will carried the day.`,
    `The multiverse watches in stunned silence as ${winnerName} claims total victory. ${pick(wF.impacts)} echoes one final time, then fades to nothing.`,
    `As ${pick(wF.atmosphere)}, ${winnerName} raises a fist to the sky. Today, they are the undisputed champion. Today, they are a legend.`,
    `${winnerName} catches their breath and looks back at the fallen ${loserName}. A worthy opponent—but there can only be one victor.`,
    `The arena crumbles as ${winnerName} walks away from the wreckage. No one will forget this day. No one will forget this name.`,
  ];

  panels.push({
    id: 'aftermath',
    type: 'aftermath',
    text: pickRandom(aftermathOptions),
    focus: winner,
    effect: 'pan',
    layout: 'standard',
    imageType1: 'preview',
    imageType2: 'preview',
    images1: p1Wins ? getSlice(charPool1, 0, 1) : getSlice(charPool1, 4, 1),
    images2: !p1Wins ? getSlice(charPool2, 0, 1) : getSlice(charPool2, 4, 1)
  });

  return panels;
}

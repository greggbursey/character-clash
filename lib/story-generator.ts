import { Character } from "@/data/types";

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
  charPool2: Character[] = []
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

  // 1. INTRO - Use Backgrounds
  const introPool = [
    mode === 'universe' 
      ? `The cosmic scales tilt as the realm of ${name1} collides with the forces of ${name2}.`
      : `The air crackles with anticipation. ${name1} and ${name2} have finally met on the field of honor.`,
    `A silence falls over the multiverse. Two titans, ${name1} and ${name2}, prepare for an inevitable confrontation.`,
    `History is written by the victors, and today, a new chapter begins as ${name1} faces ${name2}.`
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

  // 2. BUILDUP - Use Previews (Army for Universe)
  let buildupText = "";
  if (winnerHadPrep) {
    const winnerChar = p1Wins ? charPool1[0] : charPool2[0];
    const strippedPrep = winnerChar?.prepDescription?.replace(/###.*?\n/, '').trim().split('.')[0] || "They have calculated every variable.";
    buildupText = `${winnerName} is perfectly positioned. ${strippedPrep}.`;
  } else {
    buildupText = "No words are needed. They circle each other like predators, looking for the slightest mistake.";
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

  // 3. CLASH - Backgrounds + Shake
  let clashText = "";
  if (winnerHadGear) {
    const winnerChar = p1Wins ? charPool1[0] : charPool2[0];
    const strippedGear = winnerChar?.gearDescription?.replace(/###.*?\n/, '').trim().split('\n')[0].replace('- ', '') || "their superior arsenal";
    clashText = `${winnerName} unleashes their secret weapon! Using ${strippedGear}, they smash through the opposition's guard.`;
  } else {
    clashText = "They collide in a whirlwind of motion! Steel strikes steel, and power meets power. Neither side is willing to give an inch!";
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

  // 4. CLIMAX - Focused Previews (Different set for Universe)
  let climaxText = "";
  if (isDomination) {
    climaxText = `Absolute dominance! ${winnerName} delivers a final, crushing blow that echoes throughout the entire realm.`;
  } else if (isClose) {
    climaxText = `A razor-thin margin! In a final, desperate lunge, ${winnerName} manages to land the winning strike!`;
  } else {
    climaxText = `${winnerName} finds the opening! A lightning-fast strike seals the fate of ${loserName} once and for all.`;
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

  // 5. AFTERMATH
  const aftermathOptions = [
    `${winnerName} emerges from the smoke, weary but triumphant. Their name will be whispered in awe for generations to come.`,
    `Victory belongs to ${winnerName}! The cosmic scales have been reset, and a new champion claimed.`
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


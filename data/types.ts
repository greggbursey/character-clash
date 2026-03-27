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
  gearBonus?: number;
  prepBonus?: number;
  gearDescription?: string;
  prepDescription?: string;
  triviaInfo: string;
  imagePosition?: string;
};

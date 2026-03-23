import { Character } from "./types";

import { tmntCharacters } from "./tmnt/tmnt-characters";
import { marvelCharacters } from "./marvel/marvel-characters";
import { xmenCharacters } from "./xmen/xmen-characters";
import { dcCharacters } from "./dc/dc-characters";
import { mkCharacters } from "./mortal-kombat/mk-characters";
import { sfCharacters } from "./street-fighter/sf-characters";
import { godzillaCharacters } from "./godzilla/godzilla-characters";
import { swCharacters } from "./star-wars/sw-characters";

export const characters: Character[] = [
  ...tmntCharacters,
  ...marvelCharacters,
  ...xmenCharacters,
  ...dcCharacters,
  ...mkCharacters,
  ...sfCharacters,
  ...godzillaCharacters,
  ...swCharacters,
];

import { Character } from "./types";

import { tmntCharacters } from "./tmnt/tmnt-characters";
import { marvelCharacters } from "./marvel/marvel-characters";
import { xmenCharacters } from "./xmen/xmen-characters";
import { dcCharacters } from "./dc/dc-characters";
import { mkCharacters } from "./mortal-kombat/mk-characters";
import { sfCharacters } from "./street-fighter/sf-characters";
import { godzillaCharacters } from "./godzilla/godzilla-characters";
import { swCharacters } from "./star-wars/sw-characters";
import { marioCharacters } from "./mario/mario-characters";
import { hpCharacters } from "./hp/hp-characters";
import { lotrCharacters } from "./lotr/lotr-characters";
import { transformersCharacters } from "./transformers/transformers-characters";
import { powerRangersCharacters } from "./power-rangers/power-rangers-characters";
import { pokemonCharacters } from "./pokemon/pokemon-characters";
import { dbzCharacters } from "./dbz/dbz-characters";
import { greekCharacters } from "./greek-monsters/greek-characters";
import { httydCharacters } from "./httyd/httyd-characters";

export const characters: Character[] = [
  ...tmntCharacters,
  ...marvelCharacters,
  ...xmenCharacters,
  ...dcCharacters,
  ...mkCharacters,
  ...sfCharacters,
  ...godzillaCharacters,
  ...swCharacters,
  ...marioCharacters,
  ...hpCharacters,
  ...lotrCharacters,
  ...transformersCharacters,
  ...powerRangersCharacters,
  ...pokemonCharacters,
  ...dbzCharacters,
  ...greekCharacters,
  ...httydCharacters,
];

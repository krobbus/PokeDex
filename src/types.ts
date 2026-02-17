export interface IntroProps {
  onComplete: () => void;
};

export interface PokemonProps {
  id: number;
  name: string;
  image: string;
  shinyImage:string;
  isShiny?: boolean;
  types: string[];
  hp: number;
};

export interface ExtendedPokemonProps extends PokemonProps {
  abilities: string[];
  description: string;
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
  evolutionUrl: string;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: ExtendedPokemonProps | null;
  onSelectNewPokemon: (name: string) => void;
};

export const PokemonTypeColors: Record<string, string> = {
  grass: '#78C850',
  fire: '#ff8888',
  water: '#7397ea',
  bug: '#A8B820',
  normal: '#c09e62',
  poison: '#56ba51',
  electric: '#d6b840',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#ff8888',
  psychic: '#d27893',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#fa3333',
  dark: '#9b9b9b',
  steel: '#B8B8D0',
  flying: '#A890F0'
};

interface TypeRelation {
  strengths: string[];
  weaknesses: string[];
}

export const PokemonTypeChart: Record<string, TypeRelation> = {
  bug: { strengths: ['grass', 'dark', 'psychic'], weaknesses: ['fire', 'flying', 'rock'] },
  dark: { strengths: ['ghost', 'psychic'], weaknesses: ['bug', 'fairy', 'fighting'] },
  dragon: { strengths: ['dragon'], weaknesses: ['dragon', 'fairy', 'ice'] },
  electric: { strengths: ['flying', 'water'], weaknesses: ['ground'] },
  fairy: { strengths: ['fighting', 'dark', 'dragon'], weaknesses: ['poison', 'steel'] },
  fighting: { strengths: ['dark', 'ice', 'normal', 'rock', 'steel'], weaknesses: ['fairy', 'flying', 'psychic'] },
  fire: { strengths: ['bug', 'grass', 'ice', 'steel'], weaknesses: ['ground', 'rock', 'water'] },
  flying: { strengths: ['bug', 'fighting', 'grass'], weaknesses: ['electric', 'ice', 'rock'] },
  ghost: { strengths: ['ghost', 'psychic'], weaknesses: ['dark', 'ghost'] },
  grass: { strengths: ['ground', 'rock', 'water'], weaknesses: ['bug', 'fire', 'flying', 'ice', 'poison'] },
  ground: { strengths: ['electric', 'fire', 'poison', 'rock', 'steel'], weaknesses: ['grass', 'ice', 'water'] },
  ice: { strengths: ['dragon', 'flying', 'grass', 'ground'], weaknesses: ['fighting', 'fire', 'rock', 'steel'] },
  normal: { strengths: [], weaknesses: ['fighting'] },
  poison: { strengths: ['fairy', 'grass'], weaknesses: ['ground', 'psychic'] },
  psychic: { strengths: ['fighting', 'poison'], weaknesses: ['bug', 'dark', 'ghost'] },
  rock: { strengths: ['bug', 'fire', 'flying', 'ice'], weaknesses: ['fighting', 'grass', 'ground', 'steel', 'water'] },
  steel: { strengths: ['fairy', 'ice', 'rock'], weaknesses: ['fighting', 'fire', 'ground'] },
  water: { strengths: ['fire', 'ground', 'rock'], weaknesses: ['electric', 'grass'] }
};

export const calculateEffectiveness = (types: string[]): Record<string, number> => {
  const multipliers: Record<string, number> = {};

  Object.keys(PokemonTypeChart).forEach(type => {
    multipliers[type] = 1;
  });

  if (!types || !Array.isArray(types)) {
    return multipliers;
  }

  types.forEach((typeName) => {
    const typeLower = typeName.toLowerCase();
    const data = PokemonTypeChart[typeLower];

    if (data) {
      data.weaknesses.forEach(w => {
        if (multipliers[w] !== undefined) multipliers[w] *= 2;
      });
      
      data.strengths.forEach(s => {
        if (multipliers[s] !== undefined) multipliers[s] *= 0.5;
      });
    }
  });

  return multipliers;
};

export const ver = (id: number): string => {
  if (id <= 151) return "1.0 (KANTO)";
  if (id <= 251) return "2.0 (JOHTO)";
  if (id <= 386) return "3.0 (HOENN)";
  if (id <= 493) return "4.0 (SINNOH)";
  if (id <= 649) return "5.0 (UNOVA)";
  if (id <= 721) return "6.0 (KALOS)";
  if (id <= 809) return "7.0 (ALOLA)";
  if (id <= 898) return "8.0 (GALAR)";
  if (id <= 1025) return "9.0 (PALDEA)";
  return "ULTRA (SPECIAL)";
};
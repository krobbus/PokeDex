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
  stats: string[];
  height: number;
  weight: number;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: ExtendedPokemonProps | null;
};

export interface UrlProps {
  evolutionUrl: string;
  openModal: (pokemon: any) => void;
}

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
  dragon: '#160505',
  dark: '#5f5f5f',
  steel: '#B8B8D0',
  flying: '#A890F0',
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
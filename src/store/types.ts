export interface BreedState {
  breeds: Breed[];
  currentBreed: Breed;
  isDog: boolean;
}

export interface UtilState {
  mobile: string;
  sort: string;
  currentPage: number;
}

export interface Breed {
  name: string;
  bredFor: string;
  height: string;
  weight: string;
  id: any;
  lifeSpan: string;
  traits: Array<string>;
  pic: string;
  wiki: string;
  description: string;
  origin: string;
  bg: string;
}

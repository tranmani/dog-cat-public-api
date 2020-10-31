export interface DogState {
  dogs: Dog[];
  currentDog: Dog;
  currentPage: number;
  isDog: boolean;
}

export interface UtilState {
  mobile: string;
  sort: string;
}

export interface Dog {
  name: string;
  bredFor: string;
  height: string;
  weight: string;
  id: number;
  lifeSpan: string;
  traits: Array<string>;
  dogPic: string;
  countryCode: string;
  bg: string;
}

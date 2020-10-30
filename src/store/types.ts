export interface DogState {
  displayDogs: Dog[]
  dogs: Dog[]
  currentDog: Dog
  currentPage: number
  isDog: boolean
}

export interface UtilState {
  mobile: string
}

export interface Dog {
  name: string;
  bredFor: string;
  height: string;
  weight: string;
  id: number;
  lifeSpan: string;
  characteristics: Array<string>;
  dogPic: string
  countryCode: string
  bg: string
}
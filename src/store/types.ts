export interface State {
  displayDogs: Dog[]
  dogs: Dog[]
  currentDog: Dog
  currentPage: number
  isDog: boolean
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
}
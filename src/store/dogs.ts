import { GetterTree, MutationTree } from "vuex";
import { DogState, Dog } from "./types";
import { utils } from "./utils";
/* eslint-disable */

type DogGetter = GetterTree<DogState, any>;

const state: DogState = {
  dogs: [],
  currentPage: 0,
  isDog: true,
  currentDog: {
    name: "",
    bredFor: "",
    height: "",
    weight: "",
    id: 0,
    lifeSpan: "",
    traits: [],
    dogPic: "",
    countryCode: "",
    bg: "",
  },
};

const getters: DogGetter = {
  dogs(state: DogState): Array<Dog> {
    switch (utils.state.sort) {
      case "nameDesc":
        return state.dogs.sort((a, b) => b.name.localeCompare(a.name));
      case "weightDesc":
        return state.dogs.sort((a, b) => parseInt(b.weight.split(" ")[0]) - parseInt(a.weight.split(" ")[0]));
      case "weightAsc":
        return state.dogs.sort((a, b) => parseInt(a.weight.split(" ")[0]) - parseInt(b.weight.split(" ")[0]));
      case "heightDesc":
        return state.dogs.sort((a, b) => parseInt(b.height.split(" ")[0]) - parseInt(a.height.split(" ")[0]));
      case "heightAsc":
        return state.dogs.sort((a, b) => parseInt(a.height.split(" ")[0]) - parseInt(b.height.split(" ")[0]));
      case "lifeSpanDesc":
        return state.dogs.sort((a, b) => parseInt(b.lifeSpan.split(" ")[0]) - parseInt(a.lifeSpan.split(" ")[0]));
      case "LifeSpanAsc":
        return state.dogs.sort((a, b) => parseInt(a.lifeSpan.split(" ")[0]) - parseInt(b.lifeSpan.split(" ")[0]));
      default:
        return state.dogs.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  currentDog(state: DogState): Dog {
    return state.currentDog;
  },
  currentPage(state: DogState): number {
    return state.currentPage;
  },
  isDog(state: DogState): boolean {
    return state.isDog;
  },
};

const mutations: MutationTree<DogState> = {
  addDog(state, newDog: Dog): void {
    state.dogs.push(newDog);
  },
  addDogPic(state, payload: { dogPic: string; id: number }): void {
    const index = state.dogs.findIndex((obj) => obj.id == payload.id);
    state.dogs[index].dogPic = payload.dogPic;
  },
  emptyDogs(state): void {
    state.dogs.splice(0, state.dogs.length);
  },
  addCurrentDog(state, newDog: Dog): void {
    Object.assign(state.currentDog, newDog);
  },
  emptyCurrentDog(state): void {
    const emptyDog = {};
    Object.assign(state.currentDog, emptyDog);
  },
  nextPage(state): void {
    state.currentPage += 10;
  },
  previousPage(state): void {
    state.currentPage -= 10;
    if (state.currentPage < 0) state.currentPage = 0;
  },
  resetPage(state): void {
    state.currentPage = 0;
  },
  updateIsDog(state): void {
    state.isDog = !state.isDog;
  },
};

export const dogs = {
  state,
  getters,
  mutations,
};

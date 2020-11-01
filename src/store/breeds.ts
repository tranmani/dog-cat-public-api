import { GetterTree, MutationTree } from "vuex";
import { BreedState, Breed } from "./types";
import { utils } from "./utils";
/* eslint-disable */

type BreedGetter = GetterTree<BreedState, any>;

const randomBoolean = Math.random() >= 0.5;

const state: BreedState = {
  breeds: [],
  isDog: randomBoolean,
  currentBreed: {
    name: "",
    bredFor: "",
    height: "",
    weight: "",
    id: 0,
    lifeSpan: "",
    traits: [],
    pic: "",
    wiki: "",
    description: "",
    origin: "",
    bg: "",
  },
};

const getters: BreedGetter = {
  breeds(state: BreedState): Array<Breed> {
    switch (utils.state.sort) {
      case "nameDesc":
        return state.breeds.sort((a, b) => b.name.localeCompare(a.name));
      case "weightDesc":
        return state.breeds.sort((a, b) => parseInt(b.weight.split(" ")[0]) - parseInt(a.weight.split(" ")[0]));
      case "weightAsc":
        return state.breeds.sort((a, b) => parseInt(a.weight.split(" ")[0]) - parseInt(b.weight.split(" ")[0]));
      case "heightDesc":
        return state.breeds.sort((a, b) => parseInt(b.height.split(" ")[0]) - parseInt(a.height.split(" ")[0]));
      case "heightAsc":
        return state.breeds.sort((a, b) => parseInt(a.height.split(" ")[0]) - parseInt(b.height.split(" ")[0]));
      case "lifeSpanDesc":
        return state.breeds.sort((a, b) => parseInt(b.lifeSpan.split(" ")[0]) - parseInt(a.lifeSpan.split(" ")[0]));
      case "LifeSpanAsc":
        return state.breeds.sort((a, b) => parseInt(a.lifeSpan.split(" ")[0]) - parseInt(b.lifeSpan.split(" ")[0]));
      default:
        return state.breeds.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  currentBreed(state: BreedState): Breed {
    return state.currentBreed;
  },
  isDog(state: BreedState): boolean {
    return state.isDog;
  },
};

const mutations: MutationTree<BreedState> = {
  addBreed(state, newBreed: Breed): void {
    state.breeds.push(newBreed);
  },
  addBreedPic(state, payload: { pic: string; id: number }): void {
    const index = state.breeds.findIndex((obj: Breed) => obj.id == payload.id);
    state.breeds[index].pic = payload.pic;
  },
  emptyBreeds(state): void {
    state.breeds = [];
  },
  addCurrentBreed(state, newBreed: Breed): void {
    Object.assign(state.currentBreed, newBreed);
  },
  emptyCurrentBreed(state): void {
    const emptyBreed = {};
    Object.assign(state.currentBreed, emptyBreed);
  },
  updateIsDog(state): void {
    state.isDog = !state.isDog;
  },
  updateToDog(state): void {
    state.isDog = true;
  },
  updateToCat(state): void {
    state.isDog = false;
  },
};

export const breeds = {
  state,
  getters,
  mutations,
};

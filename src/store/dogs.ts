import { GetterTree, MutationTree } from 'vuex'
import { State, Dog } from './types'
/* eslint-disable */

type DogGetter = GetterTree<State, any>

const state: State = {
  displayDogs: [],
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
    characteristics: [],
    dogPic: "",
    countryCode: "",
  }
}

const getters: DogGetter = {
  displayDogs(state: State) {
    return state.displayDogs
  },
  dogs(state: State) {
    return state.dogs.sort(function (a, b) {
      return a.id - b.id;
    })
  },
  currentDog(state: State) {
    return state.currentDog
  },
  currentPage(state: State) {
    return state.currentPage
  },
  isDog(state: State) {
    return state.isDog
  }
}

const mutations: MutationTree<State> = {
  copyDisplayDogs(state): void {
    state.displayDogs = []
    state.displayDogs = [...state.dogs.slice(state.currentPage, state.currentPage + 10)]
  },
  addDog(state, newDog: Dog): void {
    state.dogs.push(newDog)
  },
  addDogPic(state, payload: { dogPic: string, id: number }): void {
    const index = state.dogs.findIndex((obj => obj.id == payload.id))
    state.dogs[index].dogPic = payload.dogPic
  },
  emptyDogs(state): void {
    state.dogs.splice(0, state.dogs.length)
  },
  addCurrentDog(state, newDog: Dog): void {
    Object.assign(state.currentDog, newDog)
  },
  emptyCurrentDog(state): void {
    const emptyDog = {}
    Object.assign(state.currentDog, emptyDog)
  },
  nextPage(state): void {
    state.currentPage += 10
  },
  previousPage(state): void {
    state.currentPage -= 10
    if (state.currentPage < 0) state.currentPage = 0
  },
  updateIsDog(state): void {
    state.isDog = !state.isDog
  }
}

export const dogs = {
  state,
  getters,
  mutations
}
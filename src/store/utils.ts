import { GetterTree, MutationTree } from "vuex";
import { UtilState } from "./types";
/* eslint-disable */

type UtilGetter = GetterTree<UtilState, any>;

const state: UtilState = {
  mobile: "md",
  sort: "default",
  currentPage: 0,
};

const getters: UtilGetter = {
  mobile(state: UtilState) {
    return state.mobile;
  },
  sort(state: UtilState) {
    return state.sort;
  },
  currentPage(state: UtilState): number {
    return state.currentPage;
  },
};

const mutations: MutationTree<UtilState> = {
  updateMobile(state, payload): void {
    state.mobile = payload;
  },
  updateSort(state, payload): void {
    state.sort = payload;
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
};

export const utils = {
  state,
  getters,
  mutations,
};

import { GetterTree, MutationTree } from "vuex";
import { UtilState } from "./types";
/* eslint-disable */

type UtilGetter = GetterTree<UtilState, any>;

const state: UtilState = {
  mobile: "md",
  sort: "default",
};

const getters: UtilGetter = {
  mobile(state: UtilState) {
    return state.mobile;
  },
  sort(state: UtilState) {
    return state.sort;
  },
};

const mutations: MutationTree<UtilState> = {
  updateMobile(state, payload): void {
    state.mobile = payload;
  },
  updateSort(state, payload): void {
    state.sort = payload;
  },
};

export const utils = {
  state,
  getters,
  mutations,
};

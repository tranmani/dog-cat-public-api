import { GetterTree, MutationTree } from 'vuex'
import { UtilState } from './types'
/* eslint-disable */

type UtilGetter = GetterTree<UtilState, any>

const state: UtilState = {
  mobile: "md"
}

const getters: UtilGetter = {
  mobile(state: UtilState) {
    return state.mobile
  }
}

const mutations: MutationTree<UtilState> = {
  updateMobile(state, payload): void {
    state.mobile = payload
  }
}

export const utils = {
  state,
  getters,
  mutations
}
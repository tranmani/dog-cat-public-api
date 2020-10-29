
import Vue from 'vue'
import Vuex from 'vuex'

import { dogs } from './dogs'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    dogs
  }
})
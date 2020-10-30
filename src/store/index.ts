
import Vue from 'vue'
import Vuex from 'vuex'

import { dogs } from './dogs'
import { utils } from './utils'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    dogs,
    utils
  }
})
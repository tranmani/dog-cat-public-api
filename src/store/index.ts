import Vue from "vue";
import Vuex from "vuex";

import { breeds } from "./breeds";
import { utils } from "./utils";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    breeds,
    utils,
  },
});

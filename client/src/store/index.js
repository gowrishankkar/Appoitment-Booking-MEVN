import Vue from 'vue'
import Vuex from 'vuex'

import events from './modules/events';
import slots from './modules/slots';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules: {
    events,
    slots,
  },
})
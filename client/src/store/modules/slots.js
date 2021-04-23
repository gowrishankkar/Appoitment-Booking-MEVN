import Vue from "vue";
import VueCookies from "vue-cookies";
import axios from "../../utils/axios";

Vue.use(VueCookies);

export default {
  state() {
    return {
      message: "Vuex is working",

    };
  },
  getters: {},
  mutations: {
   
  },
  actions: {
    async getSlots({ commit }, payload) {
      try {
        const { data } = await axios.get(`slots?date=${payload.date}&timezone=${payload.timezone}`);
        return data;
      } catch (err) {
        return err;
      }

      // commit('refreshLearnerProfilePic', data.user);
    },
  },
  

};

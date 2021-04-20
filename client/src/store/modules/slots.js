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
    async getSlots({ commit }) {
      try {
        const { data } = await axios.get(`slots/`);
        return data;
      } catch (err) {
        console.log("err", err);
        return err;
      }

      // commit('refreshLearnerProfilePic', data.user);
    },
  },
  

};

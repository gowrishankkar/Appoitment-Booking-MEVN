import Vue from "vue";
import VueCookies from "vue-cookies";
import axios from "../../utils/axios";

Vue.use(VueCookies);

export default {
  state() {
    return {
      message: "Vuex is working",
      token: "",
      error: null,
      sucessMessage: null,
      reviewMessage: null,
    };
  },
  getters: {},
  mutations: {
   
  },
  actions: {
    async getAllEvents({ commit }) {
      console.log("called api");
      try {
        const { data } = await axios.get(`events/`);

        return data;
      } catch (err) {
        console.log("err", err);
        return err;
      }

      // commit('refreshLearnerProfilePic', data.user);
    },
    async createEvent({ commit }, payload) {
        console.log("called post api");
        try {
          const { data } = await axios.post(`events/`, payload);
    
          return data;
        } catch (err) {
          console.log("err", err);
          return err;
        }
    
        // commit('refreshLearnerProfilePic', data.user);
      },
  },
  

};

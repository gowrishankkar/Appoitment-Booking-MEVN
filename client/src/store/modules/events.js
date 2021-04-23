import Vue from "vue";
import VueCookies from "vue-cookies";
import axios from "../../utils/axios";

Vue.use(VueCookies);

export default {
  state() {},
  getters: {},
  mutations: {},
  actions: {
    async getAllEvents({ commit }) {
      try {
        const { data } = await axios.get(`events/`);
        return data;
      } catch (err) {
        return err;
      }
    },
    async createEvent({ commit }, payload) {
      try {
        const response = await axios.post(`events/`, payload);
        return response;
      } catch (err) {
        return err.response;
      }
    },
    async getEventsInRange({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `events/range?startDate=${payload.startDate}&endDate=${payload.endDate}`,
          payload
        );

        return data;
      } catch (err) {
        return err;
      }
    },
  },
};

import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify"
import router from "./router";
import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

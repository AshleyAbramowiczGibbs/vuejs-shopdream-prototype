import Vue from "vue";
import Vue2Filters from "vue2-filters";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import env from "./src/.env";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://intense-earth-34277.herokuapp.com/";

Vue.config.productionTip = false;
// .env.config();
Vue.use(Vue2Filters);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

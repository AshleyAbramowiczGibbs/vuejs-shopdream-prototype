import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Admin from "./views/admin.vue";
import StylesShow from "./views/StylesShow.vue";
// import OnlineShopping from ".views/OnlineShopping.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/admin", name: "admin", component: Admin },
    { path: "/styles/:id", name: "StylesShow", component: StylesShow }
    // { path: "/OnlineShopping", name: "OnlineShopping", component: OnlineShopping }
  ]
});

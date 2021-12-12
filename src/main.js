import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import router from "./router"
import i18n from "./i18n"
import { store }  from './store' 
import Axios from "axios"

Vue.config.productionTip = false
Axios.defaults.baseURL = process.env.VUE_APP_API_REST

new Vue({
  i18n,
  router,
  vuetify,
  render: h => h(App),
  store,
}).$mount("#app")

import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueRouter from 'vue-router'
import Routes from '@/routes'
// import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
// import { ValidationObserver } from 'vee-validate';
import OtpInput from "@bachdgvn/vue-otp-input";
import { createPinia, PiniaVuePlugin } from 'pinia'
import './validation/validation.js';
import { ValidationObserver, ValidationProvider } from "vee-validate";

Vue.config.productionTip = false


Vue.use(Buefy)
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)




Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component("v-otp-input", OtpInput);


const router = new VueRouter({
  routes: Routes
});
const pinia = createPinia()

new Vue({
  render: h => h(App),
  router: router,
  pinia,
}).$mount('#app')

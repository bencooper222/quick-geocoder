import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import VueLeaflet from 'vueleaflet'



Vue.use(Vuex);

const store = new Vuex.Store({});

Vue.use(VueLeaflet.plugin,store);

var vue = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})


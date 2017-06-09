import Vue from 'vue'
import App from './App.vue'
import Vue2Leaflet from 'vue2-leaflet'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards);
Vue.component('icon', Icon)

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-popup', Vue2Leaflet.Popup);


var vue = new Vue({
  el: '#app',
  render: h => h(App)
})


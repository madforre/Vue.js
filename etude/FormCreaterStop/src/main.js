import Vue from 'vue'
import App from './App.vue'

/* Vue Signature */
import VueSignature from "vue-signature"
Vue.use(VueSignature)

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMarker } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import { faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { faBold } from '@fortawesome/free-solid-svg-icons'
import { faUnderline } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faMarker)
library.add(faTrashAlt)
library.add(faAlignLeft)
library.add(faAlignCenter)
library.add(faAlignRight)
library.add(faBold)
library.add(faUnderline)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

/* Event Bus */
export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App),
})
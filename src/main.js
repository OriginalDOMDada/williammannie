// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueSVGIcon from 'vue-svgicon'
import VueTyperPlugin from 'vue-typer'
import Vue2TouchEvents from 'vue2-touch-events'
import VTooltip from 'v-tooltip'
import * as resources from './resources'
import resource from './plugins/resource'
import deviceQueries from './plugins/device-queries'

Vue.config.productionTip = false

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.use(VueSVGIcon)
Vue.use(VueTyperPlugin)
Vue.use(Vue2TouchEvents)
Vue.use(VTooltip)
Vue.use(deviceQueries, {
  phone: 'max-width: 567px',
  tablet: 'min-width: 568px',
  mobile: 'max-width: 1024px',
  laptop: 'min-width: 1025px',
  desktop: 'min-width: 1280px',
  monitor: 'min-width: 1448px'
})
Vue.use(resource, {
  resources,
  endpoint: '/static/api'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

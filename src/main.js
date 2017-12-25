// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueSVGIcon from 'vue-svgicon'
import VueTyperPlugin from 'vue-typer'

Vue.config.productionTip = false

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.use(VueSVGIcon)
Vue.use(VueTyperPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

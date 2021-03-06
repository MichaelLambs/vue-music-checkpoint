// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router/router'

/* eslint-disable no-new */
// this.$ LOOKS AT THIS OBJECT
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})

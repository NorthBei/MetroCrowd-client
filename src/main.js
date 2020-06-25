import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
// import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import vueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(vueAwesomeCountdown, 'countdown')

Vue.use(vueAnalytics, {
  id: process.env.VUE_APP_GA_ID,
  debug: {
    enabled: process.env.NODE_ENV === 'development', // enables you to see events fired from analytics
    trace: process.env.NODE_ENV === 'development',
    sendHitTask: process.env.NODE_ENV === 'production' // doesn't send actual data when in develop mode or stage mode
  }
})

new Vue({
  // router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

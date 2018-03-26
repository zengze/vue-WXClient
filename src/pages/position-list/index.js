import Vue from 'vue'

//import 'mint-ui/lib/style.css'
//import MintUI from 'mint-ui'

//import '@/assets/postcss/reboot.css'
//import '@/assets/postcss/main.css'
//import '@/assets/postcss/cover.css'
//import '@/assets/fonts/iconfont.css'

import App from './app'

//Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})


import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import store from './store/index'
import 'mavon-editor/dist/css/index.css';
import mavonEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
import Message from './components/message/index.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(mavonEditor)  //让Vue使用mavonEditor

Vue.prototype.$message = Message

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  mavonEditor,
  components: { App },
  template: '<App/>'
})

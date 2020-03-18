import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons' // 使用阿里图表


//vue使用 cookie
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
Vue.use(VueCookie)

//按需使用element。注意路径
import '@/element-ui' // api: https://github.com/ElemeFE/element
import '@/element-ui-theme'
// import ElementUI from 'element-ui';  //全部加载的用法
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import '@/assets/sass/index.scss';

//使用vuex  状态管理
import Vuex from 'vuex'
Vue.use(Vuex)

//使用 弹幕插件
import {
    vueBaberrage,
    MESSAGE_TYPE
} from 'vue-baberrage'
Vue.use(vueBaberrage)


//使用axios 请求数据
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//使用裁图软件
import VueCropper from 'vue-cropper'
Vue.use(VueCropper);

// 使用datav
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

//全局常量 绑定到 vue身上 使用 this 大点调用
import global from '@/utils/global.js'
// console.log(global)
Vue.prototype.GLOBAL = global;
// 组件中使用： this.GLOBAL.i;

import {
    isAuth
} from '@/utils' //权限方法
Vue.prototype.isAuth = isAuth



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

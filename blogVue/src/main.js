import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
import VueRouter from "vue-router";

 Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter)
// axios全局配置
// axios.defaults.headers.common['Authorization']='Token
// axios.defaults.headers.post['Contene-type]='applocation/urlencode'请求头设置
// axios.defaults.headers.get['Accepts]='application/json'
axios.defaults.baseURL='https://wd7632472960qbifiu.wilddogio.com'//全局配置的基本网页，其他地址都以其为根地址

//创建路由
const Router =new VueRouter({
	routes:router,
	mode:'history'
})

new Vue({
  router:Router,
  store,
  render: h => h(App)
}).$mount("#app");

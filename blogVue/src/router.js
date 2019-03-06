import  addBlog from './components/addBlog.vue'//局部注册组件
import  showBlogs from './components/showBlogs.vue'
import  singleBlog from './components/singleBlog.vue'

export default [
    // {
    // 组件格式
    //   path: "/",
    //   // name: "home",name属性可省略
    //   component: Home
    // },
    {
      path: "/add",
      component:addBlog
    },
    {
      path: "/show",
      component: showBlogs
    },
    {path:"/blog/:id",component:singleBlog}
  ]

<template>
  <div id="app">
  <BlogHeader></BlogHeader>
  <router-view></router-view>r<!-- router.js文件配置了相关页面 实现内容跳转-->
  </div>
</template>

<script>
  import  addBlog from './components/addBlog.vue'//局部注册组件
  import  showBlogs from './components/showBlogs.vue'
  import BlogHeader from './components/BlogHeader.vue'
  import singleBlog from './components/singleBlog.vue'
  import axios from 'axios'
  import VueRouter from 'vue-router'

export default {
  name: 'App',
  components: {
     showBlogs,
     addBlog,
     BlogHeader,
     singleBlog
  },
  data(){
    return{
    }
  }

}
</script>

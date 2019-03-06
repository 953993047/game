<template>
  <div id="singleBlog">
      <h1>{{blogs.title}}</h1>
      <h5>作者：{{blogs.author}}</h5>
      <h5 v-for="category in blogs.categories">分类：{{category}}</h5>
      <p>{{blogs.content}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default{
    name:'singleBlog',
    data() {
      return {
          id:this.$route.params.id,
          // id:2,
          blogs:{}
        }
    },
    created(){
      axios.get('https://wd7632472960qbifiu.wilddogio.com/posts/'+this.id+'.json')
      .then((res)=>{
         this.blogs=res.data;
        // console.log(res.data);
      })
    }
  }
</script>

<style scoped>
  #singleBlog{
    border:solid 1px #C0C0C0FF;
    border-radius: 10px;
    padding: 20px;
    max-width: 960px;
    margin: 20px auto;
    background-color: #eee;
  }
</style>
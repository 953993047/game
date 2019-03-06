<template>
  <div id="showBlogs">
    <h2 style="margin:20px auto">博客总览</h2>
    <span>搜索：</span><input type="text" v-model="search">
    <div class="blog" v-for="blog in filtedBlogs">
       <router-link v-bind:to="'blog/'+blog.id">
          <h4>{{blog.title|capitalize}}</h4>
       </router-link>
        <p>{{blog.content|omit}}</p>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
export default{
    name:'showBlogs',
    data() {
      return {
        blogs:[],
        search:""
      }
    },
    filters: {
      capitalize: function (value) {
        return value.toUpperCase();
      },
      omit:function(value){
        return value.slice(0,100)+"...";
      }
    },
    computed:{
      filtedBlogs:function(){
          return this.blogs.filter((blogs)=>{
          return blogs.title.match(this.search);
        })
      }
    },
    // 或者是
    // data:{

    // }
    // methods:{
      created(){
        axios.get('/posts.json')
        .then((res)=>{
          return res.data;
        })
        .then((res)=>{
              var blogsArray=[];
                 for(let key in res){
                  res[key].id=key;
                  blogsArray.push(res[key]);
                 }
               this.blogs=blogsArray;
        })
    }
  }
</script>

<style scoped>
  #showBlogs{
    max-width: 800px;
    margin: 20px auto;
    background-color: #3862a7;;
    padding: 20px;
    border-radius:10px;
  }
  .blog{
    border:solid 1px #C0C0C0FF;
    border-radius: 10px;
    padding: 20px;
    /*max-width: 600px;*/
    margin: 20px auto;
    background-color: #eee;
  }
</style>
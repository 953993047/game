<template>
	<div id="addBlog">
		<h2>写博客</h2>
		<form  v-if="!submitted">
			<label >主题</label>
			<input type="text" v-model="blog.title">
			<label >作者</label>
			<input type="text" v-model="blog.author">
			<label >内容</label>
			<textarea v-model="blog.content" cols="30" rows="10"></textarea>
			<div id="checkboxes">
				<label >分类</label>
				<label>vue </label><input  type="checkbox" value="vue" v-model="blog.categories"/>
				<label>jQuery </label><input  type="checkbox" value="jQuery" v-model="blog.categories"  />
				<label>css </label><input  type="checkbox" value="css" v-model="blog.categories" />
				<label>js</label><input  type="checkbox" value="js" v-model="blog.categories" />
			</div>
			<button v-on:click.prevent="getd">提交</button>
		</form>
		<p v-if="submitted">博客添加成功</p>
		<hr>
		<div id="preview">
			<h3>博客预览</h3>
			<p>主题:{{blog.title}}</p>
			<p>内容：{{blog.content}}</p>
			<p>作者：{{blog.author}}</p>
			<span>分类:</span>
			<span id="cat" v-for="category in blog.categories">{{category}}</span>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
export default{
    name:'addBlog',
    data() {
      return {
      	blog:{
	      	title:"",
	      	ontent:"",
	      	author:"",
	      	categories:[],
	     },
      	submitted:false,
      }
    },
    // 或者是
    // data:{
    // }
    methods:{
	    getd:function(){
	      //相当于 axios.post('https://wd7632472960qbifiu.wilddogio.com/posts.json',this.blog)
	      axios.post('/posts.json',this.blog)
	      .then((res)=>{
	     	   	this.submitted=true;
	       })
		}
	}
}
</script>
<style scoped>
	#addBlog *{
		box-sizing: border-box;
	}
  	#addBlog {
  		/*width: 300px;*/
	  	margin:20px auto;
		max-width: 600px;
		padding: 20px;
	}
	input[type="text"],textarea{
		width: 100%;
		padding: 8px;
	}
	label{
		display: block;
		margin: 20px 0 10px;
	}
	input[type="checkbox"]{
		display:inline;
	}
	#checkboxes>label{
		display: inline;
		padding:0 10px;
	}
	button{
		width: 60px;
		height: 30px;
		margin:10px 50%;
		border-radius: 10px;
		cursor: pointer;
		background-color:  #3862a7;;
		color: white;
		position: relative;
		left: -30px;
	}
	#cat{
		padding: 10px;
	}
	#preview{
		border:  1px solid #C0C0C0FF ;
		border-radius: 10px;
		padding: 30px;
	}
</style>
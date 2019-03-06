<template>
	<nav>
		<ul>
			<li>
				<router-link to="/add">写博客</router-link>
				<router-link to="/show">博客</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default{
		name:"BlogHeader"
	}
</script>

<style scoped>
	ul{
		list-style: none;
		text-align: center;
		margin: 0;
	}
	a{
		color: white;
		text-decoration: none;
		border-radius: 5px;
		padding: 12px;
	}
	nav{
		background-color: #3862a7;
		padding: 30px 0;
		margin-bottom: 40px;
	}
	.router-link-active{
		background:rgba(255,255,255,0.5);
	}
</style>
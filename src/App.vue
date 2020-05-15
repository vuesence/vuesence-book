<template>
	<div id="app" class="app">
		<VuesenceBook
			:article-lazy-load="true"
			articlePath="/pages/"
			header-title="Vuesence Book"
		/>
	</div>
	
</template>

<script>
import VuesenceBook from "./components/VuesenceBook";

export default {
	name: "app",
	components: { VuesenceBook },
};
</script>

<style>	
	/* @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');	 */
	@import './css/default.css';
	/* @import './css/vuepress-style.css';	 */
	/* @import './css/google-style.css'; */
</style>

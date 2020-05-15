<template>
	<div id="app" class="app">
		<VuesenceBook
			:article-lazy-load="true"
			articlePath="/pages/"
			header-title="Vuesence Book Title"
		>
		</VuesenceBook>
	</div>
	
</template>

<script>
import VuesenceBook from "@vuesence/book";

export default {
	name: "app",
	components: { VuesenceBook },
};
</script>

<style>
	@import '~@vuesence/book/src/css/default.css';
	@import '~@vuesence/book/src/css/vuepress-style.css';
	/* @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');	 */
	/* @import './css/default.css'; */
	/* @import './vuepress-style.css';	 */
	/* @import './google-style.css'; */	
</style>

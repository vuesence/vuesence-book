<template>
	<div id="app" class="app">
		<VuesenceBook ref="v" :options='{
			// loads articles on request
			"lazyLoad" : true,
			// dont use basic CSS
			"useBasicCSS": true,
			// show header. if false then sidebar openning in the mobile view
			// should be done programmatically
			"showHeader": true,
			// hide header in the desktop view
			"hideHeaderInDesktopView": false,
			// hide the first root header (usually H1, coincides with article title )
			"hideRootInArticleNavigation": false,
			// header title
			"headerTitle": "Vuesence.Book",
		}'>
		</VuesenceBook>
	</div>
	
</template>

<script>
import VuesenceBook from "./components/VuesenceBook";

export default {
	name: "app",
	components: { VuesenceBook },
	// mounted() {
	// 	setInterval(() => {
	// 		console.log("1");						
	// 		this.$refs.v.toggleSidebar();
	// 	}, 3000);
	// }
};
</script>

<style>
body {
	margin: 0;
}
</style>

<style>
    /* @import './custom1.css'; */
</style>

<template>
	<div id="app" class="app">
		<VuesenceBook ref="v" :options='{
			// loads articles on request
			"articleLazyLoad" : true,
			// path to articles (relative URL)
			"articlePath" : "/pages/", 
			// show header. if false then sidebar opening in the mobile view
			// should be done programmatically
			"showHeader": true,
			// hide header in the desktop view
			"hideHeaderInDesktopView": false,
			// hide the first root header (usually H1, coincides with article title )
			"hideRootInArticleNavigation": false,
			// header title
			"headerTitle": "Vuesence.Book",
			// whether VuesenceBook should use own Router - only if the containing app does not use any			
			"useRouter": true,
		}'>
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
	/* @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');	 */
	/* @import './css/default.css'; */
	/* @import './vuepress-style.css';	 */
	/* @import './google-style.css'; */	
</style>

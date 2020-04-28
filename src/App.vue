<template>
	<div id="app" class="app">
		<VuesenceBook ref="v" :options='{
			"lazyLoad" : true,
			"useBasicCSS": true,
			"showHeader": true,
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

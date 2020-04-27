<template>
	<div id="app" class="app">
		<VuesenceBook :options='{
			"lazyLoad" : true,
			"useBasicCSS": true,
		}'>
		</VuesenceBook>
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
body {
	margin: 0;
}
</style>

<style>
    /* @import './custom1.css'; */
</style>

<template>
	<div id="app" class="app">
		<VuesenceBook></VuesenceBook>
	</div>
	
</template>

<script>
import VuesenceBook from "./VuesenceBook";

export default {
	name: "app",
	components: { VuesenceBook },
};
</script>

<style>
body {
	margin: 0;
}

/* .app {
	display: grid;
	align-items: flex-start;
	grid-template-columns: 200px auto;
	grid-gap: 20px;
	padding: 10px;
}

.main-navigation {
	position: sticky;
	top: 10px;
} */

.content {
}
</style>

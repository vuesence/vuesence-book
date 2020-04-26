<template>
	<div id="app" class="app">
		<VuesenceBook></VuesenceBook>
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
    @import './custom.css';
</style>

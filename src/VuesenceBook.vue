<template>
	<div id="vb" class="vb">
		<aside class="main-navigation">
			<BookNavigation />
		</aside>
		<main class="content">
			<router-view />
		</main>
	</div>
</template>

<script>
import BookNavigation from "./components/navigation/BookNavigation";

export default {
	name: "app",
	components: { BookNavigation },
	created() {
		this.$store.dispatch("loadConfig");
	},
};
</script>

<style>
body {
	margin: 0;
}

.vb {
	display: grid;
	align-items: flex-start;
	grid-template-columns: 200px auto;
	grid-gap: 20px;
	padding: 10px;
}

.main-navigation {
	position: sticky;
	top: 10px;
}

.content {
}
</style>

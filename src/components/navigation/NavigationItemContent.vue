<template>
    <ul class="nav">
        <NavigationItem
            v-for="(item, index) in tree"
            :key="index"
            :item="item"
            :level="level"
        />
    </ul>
</template>

<script>
    export default {
        name: "NavigationItemContent",
        components: {NavigationItem: () => import('./NavigationItem')},
        props: {
            tree: Array,
            level: {
                type: Number,
                default: () => 1
            }
        },
    }
</script>

<style>
    .nav {
        padding: 0;
        margin: 0;
        list-style: none;
    }
</style>
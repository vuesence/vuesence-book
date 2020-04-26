<template>
    <ul class="nav">
        <NavItem
            v-for="(item, index) in tree"
            :key="index"
            :item="item"
            :level="level"
        />
    </ul>
</template>

<script>
    export default {
        name: "ArticleNavigation",
        components: {NavItem: () => import('./NavItem')},
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
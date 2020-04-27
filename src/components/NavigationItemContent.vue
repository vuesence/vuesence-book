<template>
    <ul class='vsb-nav-list' :class="`nav-level--${level}`">
        <NavigationItem
            v-for="(item, index) in tree"
            :key="index"
            :item="item"
            :level="level"
            :articleNav="articleNav"
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
            },
            articleNav: {
                type: Boolean,
                default: false
            },
        },
    }
</script>
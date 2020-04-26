<template>
    <NavigationItemContent
        :tree="navigationTree"
    />
</template>

<script>
    import {mapState} from "vuex";
    import NavigationItemContent from "./NavigationItemContent";

    export default {
        name: "BookNavigation",
        components: {NavigationItemContent},
        computed: {
            ...mapState({
                navigationTree: state => state.config
            })
        }
    }
</script>

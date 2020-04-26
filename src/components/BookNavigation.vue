<template>
    <NavigationItemContent
        :tree="config"
    />
</template>

<script>
    // import {mapState} from "vuex";
    import NavigationItemContent from "./NavigationItemContent";

    export default {
        name: "BookNavigation",
        components: {NavigationItemContent},
        props: ['config'],
        // computed: {
        //     ...mapState({
        //         navigationTree: state => state.config
        //     })
        // }
    }
</script>

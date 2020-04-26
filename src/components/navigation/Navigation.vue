<template>
    <ArticleNavigation
        :tree="navigationTree"
    />
</template>

<script>
    import {mapState} from "vuex";
    import ArticleNavigation from "./ArticleNavigation";

    export default {
        name: "Navigation",
        components: {ArticleNavigation},
        computed: {
            ...mapState({
                navigationTree: state => state.config
            })
        }
    }
</script>

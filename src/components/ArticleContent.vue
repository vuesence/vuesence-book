<template>
    <div class='vsb-article-content' ref="page" v-html="content"/>
</template>

<script>
    export default {
        name: "ArticleContent",
        props: ['articles'],
        computed: {
            content() {
                return this.articles[this.$route.params.id]
            }
        },
        watch: {
            '$route.hash': {
                deep: true,
                async handler() {
                    if(!this.$route.hash) {
                        return;
                    }
                    const item = this.$refs.page.querySelector(this.$route.hash)

                    window.scrollTo({
                        top: item.offsetTop - 10
                    })
                }
            }
        }
    }
</script>

<template>
    <div ref="page" v-html="content"/>
</template>

<script>
    export default {
        name: "ArticleContent",
        props: ['records'],
        computed: {
            content() {
                console.log(this.$route.params.id);
                
                return this.records[this.$route.params.id]
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

<template>
    <div class='vsb-article-content' ref="vsbArticleContent" v-html="articleContent"/>
</template>

<script>
import {loadArticle} from "../vsb-utils";

export default {
    name: "ArticleContent",
    props: ['articles', 'article', 'options'],
    data() {
        return {
            articleContent: ''
        }
    },
    methods: {
        updateArticle() {
            // const article = this.articles[this.$route.params.id];

            if(!this.$route.path || !this.article) {
                return;
            }

            if (this.options.lazyLoad && this.article.url && !this.article.content) {                        
                loadArticle(this.article.url, (data) => {
                    // this.article.content = data;
                    this.$set(this.article, 'content', data)
                    this.articleContent = data;
                });
            } else if (this.article.content) {
                this.articleContent = this.article.content;
            }
        }
    },
    mounted() {
        this.updateArticle();
    },
    watch: {
        article: function() {
            this.updateArticle();
        }
    }
}
</script>

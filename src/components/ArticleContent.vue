<template>
    <div class='vsb-article-content' ref="vsbArticleContent" v-html="articleContent"/>
</template>

<script>
import {loadArticle} from "../vsb-utils";

export default {
    name: "ArticleContent",
    props: ['article', 'options'],
    data() {
        return {
            articleContent: ''
        }
    },
    methods: {
        updateArticleContent() {
            if(!this.article) {
                return;
            }

            if (this.options.articlesLazyLoad && this.article.url && !this.article.content) {                        
                loadArticle(this.article.url, (data) => {
                    this.$set(this.article, 'content', data);
                    this.articleContent = this.article.content;
                });
            } else if (this.article.content) {
                this.articleContent = this.article.content;
            }
        }
    },
    watch: {
        article: function() {
            this.updateArticleContent();
        }
    }
}
</script>

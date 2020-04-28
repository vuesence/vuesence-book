<template>
    <main class="vsb-article-container">
        <div ref='articleContentWrapper' class="vsb-article-content-wrapper">
            <ArticleContent :article="article" :options="options" />            
        </div>
        <aside class="vsb-article-navigation">
            <NavigationItemContent :tree="articleNavTree" :articleNav="true" />
        </aside>
    </main>
</template>

<script>
    import NavigationItemContent from "./NavigationItemContent";
    import ArticleContent from "./ArticleContent";
    import {VsbEventBus} from "../vsb-utils";
    // import VuesenceBook from "../VuesenceBook";

    export default {
        name: "ArticleContainer",
        components: {NavigationItemContent, ArticleContent},
        props: ['articles', 'options'],
        data() {
            return {
                article: {},
                articleNavList: {},
                articleNavTree: []
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            window.addEventListener('resize', this.handleScroll)

            this.article = this.articles[this.$route.params.id];
            this.calculateHeadings();

            VsbEventBus.$on("scrollTo", (item) => {
                window.scrollTo(0, item.offsetTop - 70);
            })

        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
            window.removeEventListener('resize', this.handleScroll)
        },
        methods: {
            handleScroll() {
                const offsets = 
                    this.articleNavList
                    .map((item) => item.el.getBoundingClientRect().top)
                    .map((item, index) => item > 0  ? index : null)
                    .filter(item => item !== null)

                if(offsets.length > 0) {

                    if (this.articleNavList[offsets[0]].el.getBoundingClientRect().top < 100) {
                        Object.values(this.articleNavList).forEach((item) => {
                            item.isActive = false
                        })
                        this.articleNavList[offsets[0]].isActive = true;
                    } else if (offsets.length == 1) {
                        Object.values(this.articleNavList).forEach((item) => {
                            item.isActive = false
                        })
                        this.articleNavList[offsets[0]].isActive = true;
                    }
                }
            },
            async calculateHeadings() {
                await this.$nextTick();

                this.articleNavTree = []
                this.articleNavList = []

                const headings = Array.from(this.$refs.articleContentWrapper.querySelectorAll('h1,h2,h3,h4,h5,h6'))

                const buildItem = (items, index) => {
                    const domItem = headings[index]
                    const level = + domItem.tagName.match(/H(\d)/)[1]

                    const item = {
                        to: {hash: domItem.id},
                        title: domItem.innerHTML,
                        el: domItem,
                        sections: [],
                        offsetTop: domItem.offsetTop,
                        isActive: false,
                    }

                    for(let i = index + 1; i < headings.length; i++) {
                        const headingLevel = +headings[i].tagName.match(/H(\d)/)[1]
                        if(headingLevel === level) {
                            break;
                        }
                        if(headingLevel === level + 1) {
                            buildItem(item.sections, i)
                        }
                    }
                    
                    items.push(item)
                    this.articleNavList[index] = item
                }

                const DOMHeadings = Array.from(
                    this.$refs.articleContentWrapper.querySelectorAll('h1,h2,h3,h4,h5,h6')
                ).map(heading => +heading.tagName.substr(1, 1))

                const min = Math.min(...DOMHeadings)

                headings.forEach((heading, index) => {
                    if(heading.tagName.toLowerCase() === `h${min}`) {
                        buildItem(this.articleNavTree, index)
                    }
                })

                await this.$nextTick
                this.handleScroll()
            }
        },
        watch: {
            article: {
                async handler() {
                    // console.log("watcher article");
                    this.calculateHeadings();
                }
            },            
            articles: {
                deep: true,
                async handler() {
                    // console.log("watcher articles");                    
                    this.article = this.articles[this.$route.params.id];                    
                    this.calculateHeadings();                    
                }
            },
            '$route.path': function() {
                this.article = this.articles[this.$route.params.id];
            },
        }
    }
</script>
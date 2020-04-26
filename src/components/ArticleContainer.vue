<template>
    <section class="vsb-article-container">
        <main ref='articleContent' class="vsb-article-content-wrapper">
            <ArticleContent :articles="articles" />            
        </main>
        <aside class="vsb-article-navigation">
            <NavigationItemContent :tree="articleNavTree" :articleNav="true" />
        </aside>
    </section>
</template>

<script>
    import NavigationItemContent from "./NavigationItemContent";
    import ArticleContent from "./ArticleContent";
    import VsbEventBus from "../vsb-event-bus";
    // import VuesenceBook from "../VuesenceBook";

    export default {
        name: "ArticleContainer",
        components: {NavigationItemContent, ArticleContent},
        props: ['articles'],
        data() {
            return {
                articleNavList: {},
                articleNavTree: []
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            window.addEventListener('resize', this.handleScroll)

            VsbEventBus.$on("scrollTo", (item) => {
                console.log(item.topOffset);
                // this.$el.scrollTop =item.topOffset;
                window.scrollTo(0, item.topOffset);
            })
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
            window.removeEventListener('resize', this.handleScroll)
        },
        methods: {
            handleScroll() {
                const offsets = Array
                    .from(
                        this.$refs.articleContent.querySelectorAll('h1,h2,h3,h4,h5,h6')
                    )
                    .map((item) => item.getBoundingClientRect().top)
                    .map((item, index) => item > 0  ? index : null)
                    .filter(item => item !== null)

                if(offsets.length > 0) {
                    Object.values(this.articleNavList).forEach((item) => {
                        item.isActive = false
                    })
                    this.articleNavList[offsets[0]].isActive = true;
                }
            },
            async calculateHeadings() {
                await this.$nextTick()

                this.articleNavTree = []
                this.articleNavList = {}

                const headings = Array.from(this.$refs.articleContent.querySelectorAll('h1,h2,h3,h4,h5,h6'))

                const buildItem = (items, index) => {
                    const domItem = headings[index]
                    const level = + domItem.tagName.match(/H(\d)/)[1]

                    const item = {
                        to: {hash: domItem.id},
                        title: domItem.innerHTML,
                        sections: [],
                        topOffset: domItem.offsetTop,
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
                    this.$refs.articleContent.querySelectorAll('h1,h2,h3,h4,h5,h6')
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
            content: {
                async handler() {
                    this.calculateHeadings();
                }
            },
        },
        computed: {
            content() {
                return this.articles[this.$route.params.id]
            }
        }
    }
</script>

<style>
    .vsb-article-container {
        display: grid;
        align-items: flex-start;
        grid-template-columns: auto 200px;
        grid-gap: 20px;
    }

    /* .content {
    } */

    .vsb-article-navigation {
        position: sticky;
        top: 10px;
    }
</style>
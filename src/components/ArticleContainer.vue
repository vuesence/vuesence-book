<template>
    <div class="page">
        <main ref="page" class="content">
            <!-- <router-view/> -->
            <ArticleContent />
            
        </main>
        <aside class="article-navigation">
            <NavigationItemContent :tree="pageTree"/>
        </aside>
    </div>
</template>

<script>
    import NavigationItemContent from "./NavigationItemContent";
    import ArticleContent from "./ArticleContent";
    // import VuesenceBook from "../VuesenceBook";

    export default {
        name: "ArticleContainer",
        components: {NavigationItemContent, ArticleContent},
        data() {
            return {
                list: {},
                pageTree: []
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            window.addEventListener('resize', this.handleScroll)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
            window.removeEventListener('resize', this.handleScroll)
        },
        methods: {
            handleScroll() {
                const offsets = Array
                    .from(
                        this.$refs.page.querySelectorAll('h1,h2,h3,h4,h5,h6')
                    )
                    .map((item) => item.getBoundingClientRect().top)
                    .map((item, index) => item > 0  ? index : null)
                    .filter(item => item !== null)

                if(offsets.length > 0) {
                    Object.values(this.list).forEach((item) => {
                        item.isActive = false
                    })
                    this.list[offsets[0]].isActive = true;
                }
            },
            async calculateHeadings() {
                await this.$nextTick()

                const root = []
                const list = {}

                const headings = Array.from(this.$refs.page.querySelectorAll('h1,h2,h3,h4,h5,h6'))

                const buildItem = (items, index) => {
                    const domItem = headings[index]
                    const level = +domItem.tagName.match(/H(\d)/)[1]

                    const item = {
                        to: {hash: domItem.id},
                        title: domItem.innerHTML,
                        sections: [],
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
                    list[index] = item
                }

                const DOMHeadings = Array.from(
                    this.$refs.page.querySelectorAll('h1,h2,h3,h4,h5,h6')
                ).map(heading => +heading.tagName.substr(1, 1))

                const min = Math.min(...DOMHeadings)

                headings.forEach((heading, index) => {
                    if(heading.tagName.toLowerCase() === `h${min}`) {
                        buildItem(root, index)
                    }
                })

                this.pageTree = root
                this.list = list

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
                return this.$store.state.records[this.$route.params.id]
                // return VuesenceBook.records[this.$route.params.id]
            }
        }
    }
</script>

<style>
    .page {
        display: grid;
        align-items: flex-start;
        grid-template-columns: auto 200px;
        grid-gap: 20px;
    }

    .content {
    }

    .article-navigation {
        position: sticky;
        top: 10px;
    }
</style>
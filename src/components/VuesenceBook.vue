<template>
	<div ref="vsb" class="vsb">
		<header class="vsb-header">
			<div class="vsb-sidebar-button nav-icon" @click="toggleSidebar">
				<!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon">
					<path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path>
				</svg> -->
				<!-- <div id="nav-icon">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>   -->
				<!-- <div class="nav-icon"> -->
					<div></div>
				<!-- </div> -->
			</div>
			<div class="vsb-header-title"></div>
		</header>
		<section data-component="vuesence-book" class="vsb-container">

			<aside class="vsb-sidebar">			
				<NavigationItemContent
					:tree='config.data'
					:level=0
				/>
			</aside>

			<main ref='articleContentWrapper' class="vsb-article-content-wrapper">
				<ArticleContent :article="article" :options="options" />            
			</main>

			<aside class="vsb-article-navigation">
				<NavigationItemContent 
					:tree="articleNavTree" 
					:articleNav="true" 
				/>
			</aside>

		</section>
	</div>
</template>

<script>
import NavigationItemContent from "./NavigationItemContent";
import {loadArticle} from "../vsb-utils";
import ArticleContent from "./ArticleContent";
import {VsbEventBus} from "../vsb-utils";

export default {
	name: "VuesenceBook",
	// components: { NavigationItemContent, ArticleContainer },
	components: { NavigationItemContent, ArticleContent },
	props: ['options'],
	data() {
		return {
			config: [],
			articles: {},
			article: {},
			articleNavList: {},
			articleNavTree: []
		}
	},
	created() {

		if (this.options.useDefaultCSS) {
			require('../default.css');
		}
		const xhr = new XMLHttpRequest()
		xhr.open('GET', 'config.json', true)
		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				this.config = JSON.parse(xhr.responseText);

				const articles = {};

				if (!this.$route.params.id){
					this.$route.params.id = this.config.startArticle;					
				}

				const getRecords = (record) => {
					
					if(record.content || record.url) {
						articles[record.id] = {};
						if(record.content) {
							articles[record.id].content = record.content
						} else {
							if (record.url) {
								if (!this.options.articlesLazyLoad) {
									loadArticle(record.url, (data) => {
											articles[record.id].content = data;
									});
								}
								articles[record.id].url = record.url;
							}
						}
					}

					if(record.sections) {
						record.sections.forEach(rec => {
							getRecords(rec)
						})
					}
				}

				this.config.data.forEach(record => {
					getRecords(record)
				})

				this.articles = articles;
			}
		}
		xhr.send();
	},


	mounted() {
		if (!this.options.showHeader) {
			// this.$refs.vsb.querySelector("header").style.display = "none";
			// this.$refs.vsb.style.setProperty('--header-height', '0');
			this.$refs.vsb.style.setProperty('--header-display', 'none');
		}
		if (this.options.hideHeaderInDesktopView || !this.options.showHeader) {
			// this.$refs.vsb.querySelector("header").style.display = "none";
			this.$refs.vsb.style.setProperty('--header-desktop-height', '0');
			this.$refs.vsb.style.setProperty('--header-desktop-display', 'none');
		}
		if (this.options.hideRootInArticleNavigation) {
			// this.$refs.vsb.style.setProperty('--article-navigation-root', 'none');
		}

		this.$refs.vsb.querySelector(".vsb-header-title").textContent = this.options.headerTitle;
		
		window.addEventListener('scroll', this.handleScroll)
		window.addEventListener('resize', this.handleScroll)

		this.$refs.vsb.addEventListener('click', (event) => {
			if (event.target.closest(".vsb-article-content-wrapper")) {
				this.closeSidebar();
			}
		});

		this.article = this.articles[this.$route.params.id];
		this.calculateHeadings();

		VsbEventBus.$on("scrollTo", (item) => {
			this.$refs.vsb.classList.remove("sidebar-open");
			window.scrollTo(0, item.offsetTop - 70);
		})

	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll)
		window.removeEventListener('resize', this.handleScroll)
	},
	methods: {
		toggleSidebar() {
			this.$refs.vsb.classList.toggle("sidebar-open");
		},
		openSidebar() {
			this.$refs.vsb.classList.add("sidebar-open");
		},
		closeSidebar() {
			this.$refs.vsb.classList.remove("sidebar-open");
		},

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


};
</script>
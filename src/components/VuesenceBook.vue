<template>
	<div ref="vsb" class="vsb">
		<header class="vsb-header">
			<div class="vsb-sidebar-button nav-icon" @click="toggleSidebar">
				<div></div>
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
import {loadArticle, VsbEventBus} from "../vsb-utils";
import ArticleContent from "./ArticleContent";

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
								articles[record.id].item = record;
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

				if (this.options.useRouter 
					&& this.$route.params.id 
					&& Object.prototype.hasOwnProperty.call(this.articles, this.$route.params.id)
				) {
					this.article = this.articles[this.$route.params.id];					
				} else {
					this.article = this.articles[this.config.startArticle];					
				}
			}
		}
		xhr.send();
	},


	mounted() {
		if (!this.options.showHeader) {
			this.$refs.vsb.style.setProperty('--header-display', 'none');
		}
		if (this.options.hideHeaderInDesktopView || !this.options.showHeader) {
			this.$refs.vsb.style.setProperty('--header-desktop-height', '0');
			this.$refs.vsb.style.setProperty('--header-desktop-display', 'none');
		}
		if (this.options.hideRootInArticleNavigation) {
			this.$refs.vsb.style.setProperty('--article-navigation-root', 'none');
		}

		this.$refs.vsb.querySelector(".vsb-header-title").textContent = this.options.headerTitle;
		
		window.addEventListener('scroll', this.trackScroll)
		window.addEventListener('resize', this.trackScroll)

		this.$refs.vsb.addEventListener('click', (event) => {
			if (event.target.closest(".vsb-article-content-wrapper")) {
				this.closeSidebar();
			}
		});

		// this.article = this.articles[this.$route.params.id];
		// this.calculateHeadings();

		VsbEventBus.$on("scrollTo", (item) => {
			this.$refs.vsb.classList.remove("sidebar-open");
			window.scrollTo(0, item.offsetTop - 70);
		})

		VsbEventBus.$on("navigateTo", (item) => {
			this.$refs.vsb.classList.remove("sidebar-open");
			this.article = this.articles[item.id];
			if (this.options.useRouter) {
				this.$router.push(item.id);
			}
		})

	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.trackScroll)
		window.removeEventListener('resize', this.trackScroll)
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

		trackScroll() {
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
		calculateHeadings() {
			this.$nextTick().then(() => {
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
				});
					
				this.$nextTick().then(() => {
					this.trackScroll()
				});	
				
			});

		}
	},
	watch: {
		article: {
			handler() {
				// console.log("watcher article");
				this.calculateHeadings();
			}
		},            
		// articles: {
		// 	deep: true,
		// 	async handler() {
		// 		// console.log("watcher articles");                    
		// 		this.article = this.articles[this.$route.params.id];                    
		// 		this.calculateHeadings();                    
		// 	}
		// },
		// '$route.path': function() {
		// 	this.article = this.articles[this.$route.params.id];
		// },
	}


};
</script>

<style>
html {
	scroll-behavior: smooth;
}
body {
	color: #24292e;
	margin: 0;
	font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

ol,
p,
ul {
	line-height: 1.3;
}

.vsb {
	--header-height: 3em;
	--header-desktop-height: 3em;
	--header-display: "initial";
	--header-desktop-display: "initial";
	--article-navigation-root: "initial";
}

.vsb-header {
	padding: 0.7em 1.5em;
	padding-left: 4em;
	line-height: 2.4em;
	height: var(--header-height);
	display: var(--header-display);
	display: var(--header-desktop-display);
	box-sizing: border-box;
	border-bottom: 1px solid #eaecef;
	position: fixed;
	background-color: white;
	top: 0;
	left: 0;
	z-index: 20;
	right: 0;
}
.vsb-sidebar-button {
	cursor: pointer;
	display: none;
	/* width: 1.25em; */
	/* height: 1.25em; */
	position: absolute;
	/* padding: .6em; */
	top: 0.5em;
	left: 1em;
}

.vsb-sidebar-button .icon {
	display: block;
	width: 1.25em;
	height: 1.25em;
}

.vsb-header-title {
	margin: auto;
	display: inline-block;
	font-weight: bold;
	font-size: 1.2em;
}

.vsb-sidebar {
	/* position: sticky;
    top: 10px; */
	background-color: #fff;
	width: 18em;
	position: fixed;
	z-index: 10;
	margin: 0;
	top: var(--header-height);
	top: var(--header-desktop-height);
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	border-right: 1px solid #eaecef;
	overflow-y: auto;
	padding: 1em;
}

/* .vsb-article-container {
    padding-left: 18em;
    display: flex;
    padding-top: 4em;
} */

.vsb-container {
	/* display: grid; */
	/* padding-left: 18em; */
	display: flex;
	padding-top: var(--header-desktop-height);
	/* align-items: flex-start; */
	/* grid-template-columns: auto 200px; */
	/* grid-gap: 20px; */
}

.vsb-article-content-wrapper {
	flex-grow: 1;
	padding: 0 1em;
	padding-left: 20em;
}

.vsb-article-navigation {
	position: sticky;
	top: var(--header-height);
	top: var(--header-desktop-height);
	min-width: 14em;
	display: block;
	max-height: calc(100vh - 4em);
}

.vsb-article-navigation .vsb-nav-item--1 > .vsb-nav-title > a {
	display: var(--article-navigation-root);
}

@media (max-width: 719px) {
	.vsb-header {
		padding-left: 4em;
		height: var(--header-height);
		display: var(--header-display);
	}
	.vsb-sidebar {
		top: 0;
		padding-top: 5em;
		transform: translateX(-100%);
		transition: transform 0.2s ease;
	}
	.sidebar-open .vsb-sidebar {
		transform: translateX(0);
	}

	.vsb-article-content-wrapper {
		padding: 0.5em 2em;
	}
	.vsb-article-navigation {
		display: none;
	}
	.vsb-sidebar-button {
		display: block;
	}
}

.vsb-nav-list {
	padding: 0;
	margin: 0;
	list-style: none;
}

.vsb-nav-section {
	padding-left: 14px;
}

.vsb-nav-title {
	display: grid;
	grid-template-columns: auto auto;
	/* grid-gap: 6px; */
	cursor: pointer;
}

.vsb-nav-toggle {
	/* height: 20px; */
	/* width: 20px; */
	display: flex;
	align-items: center;
	justify-content: flex-end;
	cursor: pointer;
	/* background: #efefef; */
}

.vsb-nav-item {
	margin-top: 10px;
}

.vsb-nav-link--active {
	/* font-weight: bold; */
}

.vsb-sidebar .router-link-active {
	font-weight: bold;
}

.vsb .vsb-main-nav {
}

.vsb .vsb-article-container {
}
.vsb .vsb-article-nav {
}

.vsb .vsb-nav-list {
}

.vsb .vsb-nav-item {
	margin-top: 5px;
}

.vsb .vsb-article-content {
}

.vsb-article-navigation .vsb-nav-toggle {
	display: none;
}

.vsb-sidebar .vsb-nav-item--0 > .vsb-nav-title {
	color: #393939;
	font-size: 1.2em;
	font-weight: bold;
	line-height: 2em;
	margin-bottom: 8px;
	margin-top: 0;
}

:not(.vsb-nav-item--0) > .vsb-nav-title a {
	border: none;
	color: #717171;
	/* display: block; */
	font-size: 1em;
	padding: 4px 0;
	transition: color 0.3s;
	text-decoration: none;
}

.vsb-sidebar :not(.vsb-nav-item--0) > .vsb-nav-title a.router-link-active,
.vsb-sidebar :not(.vsb-nav-item--0) > .vsb-nav-title a:hover,
.vsb-sidebar :not(.vsb-nav-item--0) > .vsb-nav-title a:focus,
:not(.vsb-nav-item--0) > a:hover,
:not(.vsb-nav-item--0) > a.vsb-nav-link--active {
	color: #d63540;
}

.vsb-nav-toggle .arrow {
	float: right;
	margin-right: 8px;
	margin-top: -4px;
	transform: rotate(90deg);
	transition: transform 0.2s linear;
}
.vsb-nav-toggle.vsb-nav-toggle--active .arrow {
	transform: rotate(180deg);
}

.vsb-article-navigation .vsb-nav-list.nav-level--1 {
	border-left: 1px solid #e0e0e0;
	padding: 10px 0 20px 15px;
}

.vsb-article-content {
	font-size: 1.1em;
}


/* nav icon */
.nav-icon {
	width: 24px;
}
.nav-icon:after,
.nav-icon:before,
.nav-icon div {
	background-color: #44494e;
	border-radius: 3px;
	content: "";
	display: block;
	height: 4px;
	margin: 5.2px 0;
	transition: all 0.2s ease-in-out;
}
.sidebar-open .nav-icon:before {
	transform: translateY(9px) rotate(135deg);
}
.sidebar-open .nav-icon:after {
	transform: translateY(-9px) rotate(-135deg);
}
.sidebar-open .nav-icon div {
	transform: scale(0);
}

</style>
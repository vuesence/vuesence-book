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
				<ArticleContent :article="article" article-lazy-load="this.articleLazyLoad" />            
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
import ArticleContent from "./ArticleContent";
import {loadArticle, VsbEventBus, setArticlePath} from "../utils";

export default {
	name: "VuesenceBook",
	components: { NavigationItemContent, ArticleContent },
	props: {
		// loads articles on request
		articleLazyLoad: {
			type: Boolean,
			default: false
		},
		// path to articles (relative URL)
		articlePath: {
			type: String,
			default: "/pages/"
		}, 
		// show header. if false then sidebar opening in the mobile view
		// should be done programmatically
		showHeader: {
			type: Boolean,
			default: true
		},
		// hide header in the desktop view
		hideHeaderInDesktopView: {
			type: Boolean,
			default: false
		},
		// hide the first root header (usually H1, coincides with article title )
		hideRootInArticleNavigation: {
			type: Boolean,
			default: false
		},
		// header title
		headerTitle: {
			// type: String,
			// default: "Vuesence.Book"
		},
		// whether VuesenceBook should use own Router - only if the containing app does not use any			
		useRouter: {
			type: Boolean,
			default: true
		}
	},
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
		
		if (this.articlePath) {	
			setArticlePath(this.articlePath);
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
								if (!this.articleLazyLoad) {
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

				if (this.useRouter 
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
		
		if (!this.showHeader) {
			this.$refs.vsb.style.setProperty('--header-display', 'none');
		}
		if (this.hideHeaderInDesktopView || !this.showHeader) {
			this.$refs.vsb.style.setProperty('--header-desktop-height', '0');
			this.$refs.vsb.style.setProperty('--header-desktop-display', 'none');
		}
		if (this.hideRootInArticleNavigation) {
			this.$refs.vsb.style.setProperty('--article-navigation-root', 'none');
		}

		this.$refs.vsb.querySelector(".vsb-header-title").textContent = this.headerTitle;
		
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
			if (this.useRouter) {
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
				this.calculateHeadings();
			}
		},            
	}


};
</script>
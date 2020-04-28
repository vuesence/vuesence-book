<template>
	<div>
		<header class="vsb-header">
			<div class="vsb-sidebar-button">
				<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon">
					<path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path>
				</svg>
			</div>
			<div class="vsb-header-title">
				Vuesence Book
			</div>
		</header>
		<section data-component="vuesence-book" class="vsb">
			<aside class="vsb-sidebar">			
				<NavigationItemContent
					:tree='config.data'
					:level=0
				/>
			</aside>
			<ArticleContainer :articles="articles" :options="options"/>		
		</section>
	</div>
</template>

<script>
// import BookNavigation from "./BookNavigation";
import NavigationItemContent from "./NavigationItemContent";
import ArticleContainer from "./ArticleContainer";
import {loadArticle} from "../vsb-utils";

export default {
	name: "VuesenceBook",
	components: { NavigationItemContent, ArticleContainer },
	props: ['options'],
	data() {
		return {
			config: [],
			articles: {},
		}
	},
	created() {

		// if (this.options.useBasicCSS) {
		// 	require('../custom.css');
		// }
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
								if (!this.options.lazyLoad) {
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
	}
};
</script>
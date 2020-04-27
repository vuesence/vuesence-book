<template>
	<section data-component="vuesence-book" class="vsb">
		<aside class="vsb-main-navigation">			
			<NavigationItemContent
				:tree='config.data'
				:level=0
			/>
		</aside>
		<ArticleContainer :articles="articles" :options="options"/>		
	</section>
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

		if (this.options.useBasicCSS) {
			require('../custom.css');
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
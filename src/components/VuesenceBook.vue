<template>
	<section data-component="vuesence-book" class="vsb">
		<aside class="vsb-main-navigation">
			<BookNavigation :config="config" />
		</aside>
		<ArticleContainer :articles="articles" :options="options"/>		
	</section>
</template>

<script>
import BookNavigation from "./BookNavigation";
import ArticleContainer from "./ArticleContainer";
import {loadArticle} from "../vsb-utils";

export default {
	name: "VuesenceBook",
	components: { BookNavigation, ArticleContainer },
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
				const tree = Array.from(JSON.parse(xhr.responseText).tree)

				this.config =  tree;

				const articles = {};

				const getRecords = (record) => {
					
					if(record.content || record.url) {
						articles[record.id] = {};
						if(record.content) {
							articles[record.id].content = record.content
						} else {
							if (record.url) {
								// return article.url;
								if (!this.options.lazyLoad) {

									// fetch(record.url)
									// 	.then((response) => response.text())
									// 	.then((data) => {
									// 		articles[record.id].content = data;
									// 	});
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

				tree.forEach(record => {
					getRecords(record)
				})

				this.articles = articles;
			}
		}
		xhr.send();
	}
};
</script>

<style>
/* body {
	margin: 0;
} */

/* >>> .nav-title {
	font-size: 2em;;
} */

/* .vsb {
	display: grid;
	align-items: flex-start;
	grid-template-columns: 200px auto;
	grid-gap: 20px;
	padding: 10px;
}

.vsb-main-navigation {
	position: sticky;
	top: 10px;
} */

/* .content {
} */
</style>
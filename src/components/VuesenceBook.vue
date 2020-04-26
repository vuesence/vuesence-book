<template>
	<section class="vuesence-book">
		<aside class="main-navigation">
			<BookNavigation :config="config" />
		</aside>
		<main class="content">
			<ArticleContainer :articles="articles" />
		</main>
	</section>
</template>

<script>
import BookNavigation from "./BookNavigation";
import ArticleContainer from "./ArticleContainer";

export default {
	name: "VuesenceBook",
	components: { BookNavigation, ArticleContainer },
	data() {
		return {
			config: [],
			articles: {},
		}
	},
	created() {
		// this.$store.dispatch("loadConfig");
		{
            const xhr = new XMLHttpRequest()
            xhr.open('GET', 'config.json', true)
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    const tree = Array.from(JSON.parse(xhr.responseText).tree)

                    this.config =  tree;

                    const articles = {};

                    const getRecords = (record) => {
                        if(record.content) {
                            articles[record.id] = record.content
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
	},

};
</script>

<style scoped>
/* body {
	margin: 0;
} */

/* >>> .nav-title {
	font-size: 2em;;
} */

.vuesence-book {
	display: grid;
	align-items: flex-start;
	grid-template-columns: 200px auto;
	grid-gap: 20px;
	padding: 10px;
}

.main-navigation {
	position: sticky;
	top: 10px;
}

.content {
}
</style>

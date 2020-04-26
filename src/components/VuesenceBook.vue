<template>
	<section class="vuesence-book">
		<aside class="main-navigation">
			<BookNavigation :config="config" />
		</aside>
		<main class="content">
			<ArticleContainer :records="records" />
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
			records: {},
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

                    const records = {};

                    const getRecords = (record) => {
                        if(record.content) {
                            records[record.id] = record.content
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

                    this.records = records;
                }
            }

            xhr.send();
        }
	},

};
</script>

<style>
/* body {
	margin: 0;
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

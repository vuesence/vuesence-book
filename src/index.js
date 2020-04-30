//index.js
import VuesenceBook from "./components/VuesenceBook.vue";

export default {
	install(Vue, options) {
		// Let's register our component globally
		// https://vuejs.org/v2/guide/components-registration.html
		Vue.component("VuesenceBook", VuesenceBook);
	},
};

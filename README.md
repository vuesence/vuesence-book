# vuesence-book

Vue.js based help/documentation system

![Node.js CI](https://github.com/altrusl/vuesence-book/workflows/Node.js%20CI/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/altrusl/vuesence-book/badge.svg)](https://snyk.io/test/github/altrusl/vuesence-book)
[![Dependencies](https://david-dm.org/altrusl/vuesence-book.svg)](https://david-dm.org/altrusl/vuesence-book.svg)

```vue

<template>
	<div id="app" class="app">
		<VuesenceBook ref="v" :options='{
			// loads articles on request
			"articleLazyLoad" : true,
			// dont use basic CSS
			"useDefaultCSS": true,
			// show header. if false then sidebar opening in the mobile view
			// should be done programmatically
			"showHeader": true,
			// hide header in the desktop view
			"hideHeaderInDesktopView": false,
			// hide the first root header (usually H1, coincides with article title )
			"hideRootInArticleNavigation": false,
			// header title
			"headerTitle": "Vuesence.Book",
			// whether VuesenceBook should use own Router - only if the containing app does not use any			
			"useRouter": true,
		}'>
		</VuesenceBook>
	</div>
	
</template>

```


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/)

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install @vuesence/book
```


## License

@vuesence/book is freely distributable under the terms of the [MIT license](LICENSE).

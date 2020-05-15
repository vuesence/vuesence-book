# vuesence-book

Vue.js based help/documentation system

![Node.js CI](https://github.com/altrusl/vuesence-book/workflows/Node.js%20CI/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/altrusl/vuesence-book/badge.svg)](https://snyk.io/test/github/altrusl/vuesence-book)
[![Dependencies](https://david-dm.org/altrusl/vuesence-book.svg)](https://david-dm.org/altrusl/vuesence-book.svg)

## Node.js usage example

```xhtml

<div id="app" class="app">
	<VuesenceBook
		header-title="My Book"
	/>
</div>

```

## Browser usage example

```html

<!DOCTYPE html>
<html lang="en">

	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<title>vuesence-book demo</title>

		<script src="https://unpkg.com/vue"></script>
		<script src="./vsb.umd.min.js"></script>

		<link rel="stylesheet" href="css/default.css">
		<!-- <link rel="stylesheet" href="css/vuepress-style.css"> -->
		<!-- <link rel="stylesheet" href="css/google-style.css"> -->
	</head>

	<body>
		<div id="app" class="app">
			<vuesence-book
				header-title="My Book"
			/>
		</div>
	</body>

	<script>
		new Vue({ el: '#app' })
	</script>

</html>

```

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/)

Installation is done using the `npm install` command:

```bash
$ npm install @vuesence/book
```

### Props

-   __articleLazyLoad__ - loads articles on request. If `false` than loads all articles at component creation time. Default: `false`
-   __articlePath__ - path to articles (relative URL). Default: "/pages/"
-   __headerTitle__ - header title. Default: "Vuesence.Book"
-   __showHeader__ - whether to show header. If `false` then sidebar opening in the mobile view should be done programmatically. Default: `true`
-   __hideHeaderInDesktopView__ - hide header in the desktop view. Useful when you want to show the header with 'hamburger' button only in the mobile view to allow usage of menu sidebar. Default: `false`
-	__hideRootInArticleNavigation__ - hide the first root header (usually H1 and coincides with article title) Default: `false`
-	__useRouter__ - whether VuesenceBook should use own Router - only if the containing app does not use any. Default: `true`

All props are optional



wrapper.js is used for building UMD and CommonJS bundles using `vue-cli-service` tool
UMD for NPM

examples
/nodejs - example how to use vuesence-book in the Node.js project
/browser - how to run in

## License

@vuesence/book is freely distributable under the terms of the [MIT license](LICENSE).

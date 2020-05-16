## Vue.js based documentation system web component

![Node.js CI](https://github.com/altrusl/vuesence-book/workflows/Node.js%20CI/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/altrusl/vuesence-book/badge.svg)](https://snyk.io/test/github/altrusl/vuesence-book)
[![Dependencies](https://david-dm.org/altrusl/vuesence-book.svg)](https://david-dm.org/altrusl/vuesence-book.svg)


## Features

- Simple, lite, fast
- Very suitable for embedding help/documentation content into the website
- Easily and highly customizable with CSS
- Easy to use content management. No need to regenerate the website each time content is changed
- Focus on performance - not large articles can be preloaded
- Small size of the package
- In general no dependencies (optional `marked` or other MD library for markdown support and `vue-router` for routing)

![VB-preview](https://altrusl.github.io/vuesence-book/images/vb-preview.jpg)

### Detailed documentation

<a href="https://altrusl.github.io/vuesence-book/" target="_blank">https://altrusl.github.io/vuesence-book/</a>

### Playground

Try it on <a href="https://codesandbox.io/s/vuesence-book-0rfh5" target="_blank">codesandbox.io</a> (Node.js version, might be slightly out of date)

# Overview

Vuesence Book is a Vue component that can be used for help or documentation systems.

Its layout is similar to layouts of [Docusaurus ](https://v2.docusaurus.io/docs/introduction) or [Google doc system](https://developers.google.com/web/ilt/pwa). 

But unlike many other documentation systems Vuesence Book is not a *static site generator*. You can change the content without regenerating the entire website.

## Layout

Vuesence Book layout contains two navigation columns - left one as the main table of content (TOC), and right one as a TOC of current article, which is generated automatically from H1-H6 tags. Both TOCs have unlimited nesting levels.

Vuesence book is responsive and can be styled with custom CSS.

## Content

There is a `config.json` configuration file that defines the content tree (TOC in the left column). It also contains links to articles in HTML or Markdown formats or the content of the article itself in an HTML format

Self-explaining example of the `config.json` and articles of this documentation can be found here - 
<a href="https://github.com/altrusl/vuesence-book/tree/master/docs" target="_blank">https://github.com/altrusl/vuesence-book/tree/master/docs</a>

## Usage

Vuesence Book can be used as a Vue component in the Vue.js project or directly in a browser



## Node.js usage example

```vue
<template>
  <div id="app" class="app">
    <VuesenceBook header-title="My Book" :use-router="false"/>
  </div>
</template>

<script>
import VuesenceBook from "@vuesence/book";

export default {
  name: "App",
  components: {
    VuesenceBook
  }
};
</script>

<style>
    @import './css/default.css';
    /* @import './css/vuepress-style.css'; */
    /* @import './css/google-style.css'; */
</style>
```

## Browser usage example

The Vuesence Book can be run as a standalone web component in the browser. Vue.js and vuesence-book.umd.min.js must be loaded. Vue-router must be disabled.

```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<title>vuesence-book demo</title>

		<script src="https://unpkg.com/vue"></script>
		<script src="./vuesence-book.umd.min.js"></script>

        <link rel="stylesheet" href="css/default.css">        
		<!-- You can plug in any custom CSS here to style the Vuesence Book-->
		<!-- <link rel="stylesheet" href="css/vuepress-style.css"> -->
		<!-- <link rel="stylesheet" href="css/google-style.css"> -->
	</head>

	<body>
		<div id="app" class="app">
			<vuesence-book
				header-title="My Book"
				:use-router="false"
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
-   __articlePath__ - path to articles (relative URL). Default: "pages/"
-   __headerTitle__ - header title. Default: "Vuesence.Book"
-   __showHeader__ - whether to show header. If `false` then sidebar opening in the mobile view should be done programmatically. Default: `true`
-   __hideHeaderInDesktopView__ - hide header in the desktop view. Useful when you want to show the header with 'hamburger' button only in the mobile view to allow usage of menu sidebar. Default: `false`
-	__hideRootInArticleNavigation__ - hide the first root header (usually H1 and coincides with article title) Default: `false`
-	__useRouter__ - whether VuesenceBook should use own Router - only if the containing Node.js app does not use any. Must be set to `false` for stand-alone browser usage. Default: `true`

All props are optional


## License

@vuesence/book is freely distributable under the terms of the [MIT license](LICENSE).

# Vuesence Book

Minimalistic Vue.js based documentation system component

![Node.js CI](https://github.com/altrusl/vuesence-book/workflows/Node.js%20CI/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/altrusl/vuesence-book/badge.svg)](https://snyk.io/test/github/altrusl/vuesence-book)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=altrusl/vuesence-book)](https://dependabot.com)
<!-- [![Dependencies](https://david-dm.org/altrusl/vuesence-book.svg)](https://david-dm.org/altrusl/vuesence-book.svg) -->

![VB-preview](https://altrusl.github.io/vuesence-book/images/vb-preview.gif)

# How to use

**Vuesence Book** can be used as a Vue component in a Vue.js project or stand-alone in a browser

## Node.js usage example

```bash
npm install @vuesence/book --save
```

```html
<template>
  <div id="app" class="app">
    <vuesence-book 
      header-title="My Book" 
      :use-router="false"
    />
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

The **Vuesence Book** can be run as a stand-alone web component in the browser. `Vue` and `@vuesence/book` packages should be loaded as scripts. Vue-router must be disabled.

```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<title>Vuesence Book demo</title>

		<script src="https://unpkg.com/vue"></script>
		<script src="https://unpkg.com/@vuesence/book"></script>

        <link rel="stylesheet" href="https://unpkg.com/@vuesence/book/src/css/default.css">      
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
# Features

- Simple, responsive, lightweight, fast
- Easily and fully customizable with CSS
- Very suitable for embedding help/documentation content into the website
- Easy to use content management
- Focus on performance - articles can be preloaded
- Unlimited nesting levels for TOC tree menu
- In general no dependencies (optional `marked` or other MD library for markdown support and `vue-router` for routing)


# Documentation

Detailed documentation can be found here - <a href="https://altrusl.github.io/vuesence-book/" target="_blank">https://altrusl.github.io/vuesence-book/</a>

## Playground

Try it on <a href="https://codesandbox.io/s/vuesence-book-0rfh5" target="_blank">codesandbox.io</a> (Node.js version)

> ! The version on `codesandbox.io` might be slightly out of date

![sbio](https://altrusl.github.io/vuesence-book/images/csbio.jpg)

## Content management

Unlike many other documentation systems **Vuesence Book** is not a *static site generator*. You can change the content without rebuilding the entire website.

`vbcfg.json` configuration file defines the content tree (TOC in the left column). It also contains links to articles in HTML or Markdown formats or the content of the article itself in an HTML format

```
└── vb
    ├── pages
    │   ├── intro.md
    │   ├── desc.md
    │   └── rich-content.html
    ├── vbcfg.json
    └── index.html
```

Self-explaining example of the `vbcfg.json` and articles of the documentation can be found here - 
<a href="https://github.com/altrusl/vuesence-book/tree/master/docs" target="_blank">https://github.com/altrusl/vuesence-book/tree/master/docs</a>

## Troubleshooting

Any bugs, issues, feature and pull requests are welcome

Please use GitHub's issue reporter or send me an <a href="mailto:ruslan.makarov@gmail.com">email</a>


## Areas for improvements / involvement
- More convenient fenced code block highlighting
- CSS layout improvement (responsiveness)
- Themes
- Top nav bar
- Footer for stand-alone version
- CEO issue

## Change Log

- 0.4.0 first release
- 0.4.2 small fixes on menu

## License

**@vuesence/book** package is freely distributable under the terms of the [MIT license](LICENSE).


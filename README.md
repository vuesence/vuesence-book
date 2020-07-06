# Vuesence Book

Minimalistic Vue.js based documentation system component

![Node.js CI](https://github.com/altrusl/vuesence-book/workflows/Node.js%20CI/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/altrusl/vuesence-book/badge.svg)](https://snyk.io/test/github/altrusl/vuesence-book)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=altrusl/vuesence-book)](https://dependabot.com)
<!-- [![Dependencies](https://david-dm.org/altrusl/vuesence-book.svg)](https://david-dm.org/altrusl/vuesence-book.svg) -->

![VB-preview](https://altrusl.github.io/vuesence-book/images/vb-preview.gif)

<a href="https://twitter.com/vuesence/status/1280075614897176577?s=20">
<img src="" />
<div class="" style="width:'50px'"><svg viewBox="0 0 24 24" class=""><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg></span></div>
 Twit it!
</a>


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

- <a href="https://github.com/altrusl/vuesence-sliding-header" target="_blank">Sliding Header</a> - Vue.js component representing sliding header (or two different headers)
- <a href="https://github.com/altrusl/vuesence-cloud-sync-button" target="_blank">Cloud Sync Button</a> - a button with cloud synchronization animation

## Contribution

Contribution is always welcome and recommended. Here is how:

- Fork the repository
- Clone to your machine
- Make your changes
- Create a pull request

## Areas for improvements / involvement
- More convenient fenced code block highlighting
- Full-text search
- CSS layout improvement (responsiveness)
- Themes
- Top nav bar
- Footer for stand-alone version
- CEO issue

## Change Log

- 0.4.2 small fixes on menu
- 0.4.50 release

## License

**@vuesence/book** package is freely distributable under the terms of the [MIT license](LICENSE).


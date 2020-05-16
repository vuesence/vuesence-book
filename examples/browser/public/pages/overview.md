# Overview

Vuesence Book is a Vue component that can be used for help or documentation systems.

Its layout is similar to layouts of [Docusaurus ](https://v2.docusaurus.io/docs/introduction) or [Google doc system](https://developers.google.com/web/ilt/pwa). 

![docusaurus](images/docusaurus.jpg)


But unlike many other documentation systems Vuesence Book is not a *static site generator*. You can change the content without regenerating the entire website.

## Layout

Vuesence Book layout contains two navigation columns - left one as the main table of content (TOC), and right one as a TOC of current article, which is generated automatically from H1-H6 tags. Both TOCs have unlimited nesting levels.

Vuesence book is responsive and can be styled with custom CSS.

## Content

There is a `vbcfg.json` configuration file that defines the content tree (TOC in the left column). It also contains links to articles in HTML or Markdown formats or the content of the article itself in an HTML format

Self-explaining example of the `vbcfg.json` and articles of this documentation can be found here - 
<a href="https://github.com/altrusl/vuesence-book/tree/master/docs" target="_blank">https://github.com/altrusl/vuesence-book/tree/master/docs</a>

## Usage

Vuesence Book can be used as a Vue component in the Vue.js project or directly in a browser
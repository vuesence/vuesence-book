
## Content management

Unlike many other documentation systems **Vuesence Book** is not a *static site generator*. You can change the content without rebuilding the entire website.

`vbcfg.json` configuration file defines the content tree (TOC in the left column). It also contains links to articles in HTML or Markdown formats or the content of the article itself in an HTML format

```
└── vb
    ├── pages
   	│	├── intro.md
   	│	├── desc.md
   	│	└── rich-content.html
	├── vbcfg.json
	└── index.html
```

Self-explaining example of the `vbcfg.json` and articles of the documentation can be found here - 
<a href="https://github.com/altrusl/vuesence-book/tree/master/docs" target="_blank">https://github.com/altrusl/vuesence-book/tree/master/docs</a>


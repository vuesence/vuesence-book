# Props

Properties for VuesenceBook component:

-   __article-lazy-load__ - loads articles on request. If `false` than loads all articles at component creation time. Default: `false`
-   __article-path__ - path to articles (relative URL). Default: "pages/"
-   __header-title__ - header title. Default: "Vuesence.Book"
-   __show-header__ - whether to show header. If `false` then sidebar opening in the mobile view should be done programmatically. Default: `true`
-   __hide-header-in-desktop-view__ - hide header in the desktop view. Useful when you want to show the header with 'hamburger' button only in the mobile view to allow usage of menu sidebar. Default: `false`
-	__hide-root-in-article-navigation__ - hide the first root header (usually H1 and coincides with article title) Default: `false`
-	__use-router__ - whether VuesenceBook should use own Router - only if the containing Node.js app does not use any. Must be set to `false` for stand-alone browser usage. Default: `true`

All props are optional
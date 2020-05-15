# Props

Properties for VuesenceBook component:

-   __articleLazyLoad__ - loads articles on request. If `false` than loads all articles at component creation time. Default: `false`
-   __articlePath__ - path to articles (relative URL). Default: "pages/"
-   __headerTitle__ - header title. Default: "Vuesence.Book"
-   __showHeader__ - whether to show header. If `false` then sidebar opening in the mobile view should be done programmatically. Default: `true`
-   __hideHeaderInDesktopView__ - hide header in the desktop view. Useful when you want to show the header with 'hamburger' button only in the mobile view to allow usage of menu sidebar. Default: `false`
-	__hideRootInArticleNavigation__ - hide the first root header (usually H1 and coincides with article title) Default: `false`
-	__useRouter__ - whether VuesenceBook should use own Router - only if the containing Node.js app does not use any. Must be set to `false` for stand-alone browser usage. Default: `true`

All props are optional
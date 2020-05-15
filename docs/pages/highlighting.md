# Highlighting

It is possible optionally to use `highlight.js` (or some other) library for highlighting fenced code blocks

In order to do that you need to install `highlight.js`

```bash
$ npm install highlight.js
```

And make small changes in the __util.js__ file

```javascript
// utils.js

import hljs from 'highlight.js';
marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
});
```

But make sure you optioned `hightlight.js` to use only the necessary programming languages, because the size of the module can increase dramatically
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

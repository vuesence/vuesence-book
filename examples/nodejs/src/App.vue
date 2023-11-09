<template>
  <div id="app">
    <vuesence-book 
      header-title="Documentation tiitle" 
      :use-router="false"
    />
  </div>
</template>

<script>
import VuesenceBook from "@vuesence/book";

export default {
  name: 'App',
  components: {
    VuesenceBook
  }
}
</script>

<style>
    @import './css/default.css';
    /* @import './css/vuepress-style.css'; */
    /* @import './css/google-style.css'; */
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

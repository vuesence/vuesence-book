<template>
  <div id="app" class="app">
    <aside class="navigation">
      <Navigation/>
    </aside>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navigation from "./components/navigation/Navigation";

export default {
  name: 'app',
  components: {Navigation},
  created() {
    this.$store.dispatch('loadConfig')
  }
}
</script>

<style>
  body {
    margin: 0;
  }

  .app {
    display: grid;
    align-items: flex-start;
    grid-template-columns: 200px auto;
    grid-gap: 20px;
    padding: 10px;
  }

  .navigation {
    position: sticky;
    top: 10px;
  }

  .content {
  }
</style>
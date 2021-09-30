<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <!-- <router-view /> -->

  <AppNavigation />
  <RouterView />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import AppFooter from "./components/AppFooter.vue";
import AppNavigation from "./components/AppNavigation.vue";

export default defineComponent({
  name: "App",
  components: {
    AppNavigation,
    AppFooter,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-container {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow-y: scroll;
}
</style>

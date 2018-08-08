<template>
  <div>
    <app-header></app-header>
    <h2> Home Page </h2>
    <div>
      <router-link to="/posts" target="_self"> Posts </router-link>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/header.vue";

export default {
  components: {
    AppHeader
  },
  mounted() {
    const prerender = require("../../utils/prerender.js");
    if (prerender.hasAccess()) {
      prerender.done();
    }
  }
};
</script>

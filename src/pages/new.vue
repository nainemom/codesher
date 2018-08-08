<template>
  <div>
    <app-header></app-header>
    <h2>Post Creator App</h2>
  </div>
</template>

<script>
import AppHeader from "../components/header.vue";

export default {
  components: {
    AppHeader
  },
  data() {},
  mounted() {
    const prerender = require("../../utils/prerender.js");
    if (prerender.hasAccess()) {
      prerender.done();
    }
  }
};
</script>

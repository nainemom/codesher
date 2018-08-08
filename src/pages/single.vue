<template>
  <div>
    <app-header></app-header>
    <h2>Single</h2>
    <div> {{post}} </div>
    <div>
      <h3>
        <router-link :to="'/posts/'+post.name" target="_self"> {{post.data.title}} </router-link>
      </h3>
      <h4 v-for="author in post.data.authors" :key="'author' + author">
        <router-link :to="'/authors/' + author" target="_self"> {{author}} </router-link>
      </h4>
      <p> {{post.data.content}} </p>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/header.vue";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    const prerender = require("../../utils/prerender.js");
    if (prerender.hasAccess()) {
      this.post = prerender.getPostByName(this.$route.params.post);
      prerender.done();
    }
  }
};
</script>

<template>
  <div>
    <h2>List</h2>
    {{posts}}
    <br>
    {{pagination}}
    <div v-for="post in posts" :key="'post' + post.name">
      <h3>
        <router-link :to="'/posts/'+post.name" target="_self"> {{post.data.title}} </router-link>
      </h3>
      <h4 v-for="author in post.data.authors" :key="'author' + author">
        <router-link :to="'/authors/' + author" target="_self"> {{author}} </router-link>
      </h4>
      <p> {{post.data.content}} </p>
    </div>
    <div>
      <router-link v-if="pagination.prevPage" :to="pagination.prevPage" target="_self"> Prev Page </router-link>
      <router-link v-if="pagination.nextPage" :to="pagination.nextPage" target="_self"> Next Page </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
      pagination: {}
    };
  },
  created() {
    const prerender = require("../../utils/prerender.js");
    if (prerender.hasAccess()) {
      const data = prerender.getPostsByCategory(
        this.$route.params.categoryName,
        this.$route.params.categoryValue,
        this.$route.params.page
      );
      this.posts = data.result;
      this.pagination = data.pagination;
      prerender.done();
    }
  }
};
</script>

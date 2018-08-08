<template>
  <div>
    <AppHeader></AppHeader>
    <AppContent>
      <AppNewPost></AppNewPost>
      <AppListPost v-for="post in posts" :key="'post' + post.name" :post="post"></AppListPost>
    </AppContent>
    <!-- <div>
      <router-link v-if="pagination.prevPage" :to="pagination.prevPage" target="_self"> Prev Page </router-link>
      <router-link v-if="pagination.nextPage" :to="pagination.nextPage" target="_self"> Next Page </router-link>
    </div> -->
  </div>
</template>
<script>
import AppHeader from "../components/header.vue";
import AppContent from "../components/content.vue";
import AppListPost from "../components/list-post.vue";
import AppNewPost from "../components/new-post.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppListPost,
    AppNewPost
  },
  data() {
    return {
      posts: [],
      pagination: {}
    };
  },
  mounted() {
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
<style lang="scss" scoped>
</style>

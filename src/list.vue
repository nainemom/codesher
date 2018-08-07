<template>
  <div> Salam Home Page <br> {{posts}} </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      nextPage: null,
      prevPage: null,
      page: 1
    };
  },
  created() {
    if (window.__PRERENDER_INJECTED) {
      const perPage = window.__PRERENDER_INJECTED.config.perPage;
      const page = this.$route.params.page || 1;

      let allRoutes = window.__PRERENDER_INJECTED.routes;
      if (this.$route.params.author) {
        allRoutes = allRoutes.filter(
          post =>
            typeof post.data.authors === "object" &&
            post.data.authors.indexOf(this.$route.params.author) > -1
        );
      }
      if (this.$route.params.tag) {
        // allRoutes = allRoutes.filter(
        //   post => post.data.tags.indexOf(this.$route.params.tag) > -1
        // );
      }

      this.posts = allRoutes;
      document.dispatchEvent(new Event("render-done"));
    }
  }
};
</script>
